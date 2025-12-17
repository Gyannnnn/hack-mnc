"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { getCompanyDetails } from "@/app/actions/company/company";
import { Progress } from "./ui/progress";
import { companyCardDetails } from "@/types/type";
import { useUserProgressStore } from "@/app/store/store";
import { Skeleton } from "./ui/skeleton";

export default function CompanyDetailsCard({
  userId,
  companyName,
}: {
  userId: string;
  companyName: string;
}) {
  const [companyData, setCompanyData] = useState<companyCardDetails | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  console.log(error);

  const { easyCompanySolved, mediumCompanySolved, hardCompanySolved } =
    useUserProgressStore();
  const initializeCompanyProgress = useUserProgressStore(
    (state) => state.initializeCompanyProgress
  );

  // Memoize the fetch function
  const fetchCompanyDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getCompanyDetails({ companyName, userId });
      if (res?.data) {
        setCompanyData(res as companyCardDetails);
        initializeCompanyProgress(
          res.data.userProgressData.easySolved || 0,
          res.data.userProgressData.mediumSolved || 0,
          res.data.userProgressData.hardSolved || 0
        );
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch company details.");
    } finally {
      setLoading(false);
    }
  }, [companyName, userId, initializeCompanyProgress]);

  useEffect(() => {
    if (companyName) {
      fetchCompanyDetails();
    }
  }, [companyName, userId, fetchCompanyDetails]); // Use the memoized function

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getCompanyDetails({ companyName, userId });

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

    if (companyName && userId) {
      fetchData();
    }
  }, [initializeCompanyProgress, companyName, userId]); // Remove initializeCompanyProgress

  

 

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
      <Card className="md:col-span-1 h-40 p-6 flex flex-col justify-between relative overflow-hidden group hover:shadow-lg transition-all duration-300">
        <Badge className="absolute top-2 left-2">
          {companyData?.data.company.name}
        </Badge>

        <div className="flex items-center h-full w-full justify-between  gap-4">
          <div className="flex justify-center items-center gap-4">
            <div className="relative">
              <Image
                height={110}
                width={110}
                src={companyData?.data.company.logo as string}
                alt={`${companyData?.data.company.name} logo`}
              />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-sm text-muted-foreground font-medium text-wrap text-center">
              Total questions
            </div>
            <div className="text-2xl font-bold text-foreground">
              {companyData?.data.totalNumberOfQuestions}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="h-20 w-20 flex flex-col items-center justify-center text-foreground font-bold text-lg rounded-full border-2 border-primary bg-primary/5 shadow-sm">
              {easyCompanySolved + mediumCompanySolved + hardCompanySolved}
              <h1 className=" text-xs">Solved</h1>
            </div>
          </div>
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
