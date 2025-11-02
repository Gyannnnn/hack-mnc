import React from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { getCompanyDetails } from "@/app/actions/company/company";
import { Progress } from "./ui/progress";

export default async function CompanyDetailsCard({userId,companyId}:{userId:string, companyId: string}) {
  try {
    const res = await getCompanyDetails({userId,companyId})
    const companyData = res?.data
    return (
    <div className="flex max-sm:flex-col gap-2">
      <Card className="w-1/3 h-40 flex flex-row items-center justify-around relative">
        <Image
          height={200}
          width={200}
          src={companyData?.company.logo as string}
          alt={`${companyData?.company.name} logo`}
        ></Image>
        <Card className="h-30 w-30 flex items-center justify-center text-white font-bold text-2xl rounded-full border border-primary">
          <h1>41/{companyData?.totalNumberOfQuestions}</h1>
        </Card>
        <Badge className="absolute top-2 left-2">{companyData?.company.name}</Badge>
      </Card>
      <Card className="w-2/3 h-40 px-4">
        <div className="flex gap-2 justify-around items-center">
          <h1 className="text-green-400 font-bold">EASY</h1>{" "}
          <Progress value={20} /> <h1>{companyData?.userProgressData.easySolved}/{companyData?.easy}</h1>
        </div>
        <div className="flex gap-2 justify-around items-center">
          <h1 className="text-yellow-400 font-bold">MEDIUM</h1>{" "}
          <Progress value={50} /> <h1>{companyData?.userProgressData.mediumSolved}/{companyData?.medium}</h1>
        </div>
        <div className="flex gap-2 justify-around items-center">
          <h1 className="text-red-400 font-bold">HARD</h1>{" "}
          <Progress value={10} /> <h1>{companyData?.userProgressData.mediumSolved}{companyData?.hard}</h1>
        </div>
      </Card>
    </div>
  );
  } catch (error) {
    <h1>Something went wrong</h1>
  }
}
