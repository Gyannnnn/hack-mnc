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
      setError("Failed to fetch company details.");
    } finally {
      setLoading(false);
    }
  }, [companyId, userId, initializeCompanyProgress]);

  useEffect(() => {
    console.log("IDs:", { companyId, userId });
    if (companyId) {
      fetchCompanyDetails();
    }
  }, [companyId, userId, fetchCompanyDetails]); // Use the memoized function

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
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

    if (companyId && userId) {
      fetchData();
    }
  }, [companyId, userId]); // Remove initializeCompanyProgress

  useEffect(() => {
    console.log("Company progress in CompanyDetailsCard updated:", {
      easyCompanySolved,
      mediumCompanySolved,
      hardCompanySolved,
    });
  }, [easyCompanySolved, mediumCompanySolved, hardCompanySolved]);

  // Add debug logging
  useEffect(() => {
    console.log("Loading state:", loading);
    console.log("Company data:", companyData);
  }, [loading, companyData]);

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
        <Badge
          variant="secondary"
          className="absolute top-3 left-3 bg-primary/10 text-white font-medium"
        >
          {companyData?.data.company.name}
        </Badge>

        <div className="flex items-center justify-center  gap-4">
          <div className="flex justify-center items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-lg scale-110"></div>
              <Image
                height={100}
                width={100}
                src={companyData?.data.company.logo as string}
                alt={`${companyData?.data.company.name} logo`}
                className="rounded-lg object-cover relative z-10 border"
              />
            </div>

            <div className="space-y-2">
              <div className="text-sm text-muted-foreground font-medium">
                Total questions
              </div>
              <div className="text-2xl font-bold text-foreground">
                {companyData?.data.totalNumberOfQuestions}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="h-16 w-16 flex items-center justify-center text-foreground font-bold text-lg rounded-full border-2 border-primary bg-primary/5 shadow-sm">
              {easyCompanySolved + mediumCompanySolved + hardCompanySolved}
            </div>
            <span className="text-xs text-muted-foreground mt-2">Solved</span>
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
