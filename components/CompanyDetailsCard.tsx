"use client";
import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { getCompanyDetails } from "@/app/actions/company/company";
import { Progress } from "./ui/progress";
import { companyCardDetails } from "@/types/type";
import { useUserProgressStore } from "@/app/store/store";
import { Skeleton } from "./ui/skeleton";

// export default async function CompanyDetailsCard({userId,companyId}:{userId:string, companyId: string}) {
//   try {
//     const res = await getCompanyDetails({userId,companyId})
//     const companyData = res?.data
//     return (
//     <div className="flex max-sm:flex-col gap-2">
//       <Card className="w-1/3 h-40 flex flex-row items-center justify-around relative">
//         <Image
//           height={200}
//           width={200}
//           src={companyData?.company.logo as string}
//           alt={`${companyData?.company.name} logo`}
//         ></Image>
//         <Card className="h-30 w-30 flex items-center justify-center text-white font-bold text-2xl rounded-full border border-primary">
//           <h1>41/{companyData?.totalNumberOfQuestions}</h1>
//         </Card>
//         <Badge className="absolute top-2 left-2">{companyData?.company.name}</Badge>
//       </Card>
//       <Card className="w-2/3 h-40 px-4">
//         <div className="flex gap-2 justify-around items-center">
//           <h1 className="text-green-400 font-bold">EASY</h1>{" "}
//           <Progress value={20} /> <h1>{companyData?.userProgressData.easySolved}/{companyData?.easy}</h1>
//         </div>
//         <div className="flex gap-2 justify-around items-center">
//           <h1 className="text-yellow-400 font-bold">MEDIUM</h1>{" "}
//           <Progress value={50} /> <h1>{companyData?.userProgressData.mediumSolved}/{companyData?.medium}</h1>
//         </div>
//         <div className="flex gap-2 justify-around items-center">
//           <h1 className="text-red-400 font-bold">HARD</h1>{" "}
//           <Progress value={10} /> <h1>{companyData?.userProgressData.mediumSolved}{companyData?.hard}</h1>
//         </div>
//       </Card>
//     </div>
//   );
//   } catch (error) {
//     <h1>Something went wrong</h1>
//   }
// }

export default function CompanyDetailsCard({
  userId,
  companyId,
}: {
  userId: string;
  companyId: string;
}) {
  const [companyData, setCompanyData] = useState<companyCardDetails | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log(error)

  const {
    easyCompanySolved,
    mediumCompanySolved,
    hardCompanySolved,
    initializeCompanyProgress,
  } = useUserProgressStore();

  useEffect(() => {
  const fetchCompanyDetails = async () => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      const res = await getCompanyDetails({ companyId, userId });
      
      if (res?.data) {
        setCompanyData(res as companyCardDetails);
        initializeCompanyProgress(
          res.data.userProgressData.easySolved || 0,
          res.data.userProgressData.mediumSolved || 0,
          res.data.userProgressData.hardSolved || 0
        );
      }
    } catch (error) {
      console.error("Error fetching company details:", error);
      setError("Failed to fetch company details.");
    } finally {
      setLoading(false);
    }
  };

  // Only fetch if we have valid IDs
  if (companyId && userId) {
    fetchCompanyDetails();
  }
}, [companyId, userId, initializeCompanyProgress]); // Add initializeCompanyProgress if it's defined outside


  useEffect(() => {
    console.log("Company progress in CompanyDetailsCard updated:", {
      easyCompanySolved,
      mediumCompanySolved,
      hardCompanySolved
    });
  }, [easyCompanySolved, mediumCompanySolved, hardCompanySolved]);


  const easy = companyData?.data.easy as number;
  const medium = companyData?.data.medium as number;
  const hard = companyData?.data.hard as number;

  const easyPercentage = easy > 0 ? (easyCompanySolved / easy) * 100 : 0;
  const mediumPercentage =
    medium > 0 ? (mediumCompanySolved / medium) * 100 : 0;
  const hardPercentage = hard > 0 ? (hardCompanySolved / hard) * 100 : 0;

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <Card className="md:col-span-1 h-40 p-4 flex items-center relative">
          <Skeleton className="absolute top-2 left-2 h-6 w-28 rounded-full" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </Card>
        <Card className="md:col-span-2 h-40 px-4 py-3 flex flex-col justify-center gap-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-3 flex-1" />
            <Skeleton className="h-4 w-10" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-3 flex-1" />
            <Skeleton className="h-4 w-10" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-3 flex-1" />
            <Skeleton className="h-4 w-10" />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      <Card className="md:col-span-1 h-40 p-4 flex items-center justify-between relative">
        <Badge className="absolute top-2 left-2">
          {companyData?.data.company.name}
        </Badge>
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full overflow-hidden border border-border">
            <Image
              height={64}
              width={64}
              src={companyData?.data.company.logo as string}
              alt={`${companyData?.data.company.name} logo`}
            />
          </div>
          <div className="space-y-1 text-sm text-muted-foreground">
            <div>Total questions</div>
            <div className="text-foreground font-medium">
              {companyData?.data.totalNumberOfQuestions}
            </div>
          </div>
        </div>
        <div className="h-14 w-14 flex items-center justify-center text-foreground font-bold text-base rounded-full border border-primary">
          {easyCompanySolved + mediumCompanySolved + hardCompanySolved}
        </div>
      </Card>

      <Card className="md:col-span-2 h-40 px-4 py-3 flex flex-col justify-center gap-4">
        <div className="flex gap-2 justify-between items-center">
          <h1 className="text-green-500 font-semibold w-20">EASY</h1>
          <Progress value={easyPercentage} className="flex-1" />
          <h1 className="w-18 text-right">
            {easyCompanySolved}/{easy}
          </h1>
        </div>
        <div className="flex gap-2 justify-between items-center">
          <h1 className="text-yellow-500 font-semibold w-20">MEDIUM</h1>
          <Progress value={mediumPercentage} className="flex-1" />
          <h1 className="w-18 text-right">
            {mediumCompanySolved}/{medium}
          </h1>
        </div>
        <div className="flex gap-2 justify-between items-center">
          <h1 className="text-red-500 font-semibold w-20">HARD</h1>
          <Progress value={hardPercentage} className="flex-1" />
          <h1 className="w-18 text-right">
            {hardCompanySolved}/{hard}
          </h1>
        </div>
      </Card>
    </div>
  );
}
