"use client";

import React, { useEffect, useState } from "react";
import { getTopicDetails } from "@/app/actions/topics/topics";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import {  topicStats } from "@/types/type";
import { useUserProgressStore } from "@/app/store/store";
import { Skeleton } from "./ui/skeleton";

export default function TopicDetailsCard({ id, userId }: { id: string; userId: string }) {
  const [topicData, setTopicData] = useState<topicStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  const { 
    easySolved, 
    mediumSolved, 
    hardSolved, 
    initializeProgress 
  } = useUserProgressStore();

  useEffect(() => {
    const fetchTopicDetails = async () => {
      try {
        setLoading(true);
        const res = await getTopicDetails({ id, userId });
        
        if (res?.data) {
          setTopicData(res.data as topicStats);
          

          initializeProgress(
            res.data.easySolved || 0,
            res.data.mediumSolved || 0,
            res.data.hardSolved || 0
          );
        }
      } catch (err) {
        console.error("Error fetching topic details:", err);
        setError("Failed to fetch topic details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopicDetails();
  }, [id, userId, initializeProgress]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <Card className="md:col-span-1 h-40 p-4 flex items-center relative">
          <Skeleton className="absolute top-2 left-2 h-6 w-24 rounded-full" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-20" />
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

  if (error || !topicData) {
    return (
      <div className="flex justify-center items-center h-40">
        <h1>{error || "No topic data found"}</h1>
      </div>
    );
  }

  const { totalNumberOfQuestions, easy, medium, hard, topic } = topicData;


  const easyPercentage = easy > 0 ? (easySolved / easy) * 100 : 0;
  const mediumPercentage = medium > 0 ? (mediumSolved / medium) * 100 : 0;
  const hardPercentage = hard > 0 ? (hardSolved / hard) * 100 : 0;

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <Card className="md:col-span-1 h-40 p-4 flex items-center justify-between relative">
          <Badge className="absolute top-2 left-2">{topic.name}</Badge>
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 flex items-center justify-center text-foreground font-bold text-xl rounded-full border border-primary">
              {(easySolved + mediumSolved + hardSolved)}/{totalNumberOfQuestions}
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div>Total questions</div>
              <div className="text-foreground font-medium">{totalNumberOfQuestions}</div>
            </div>
          </div>
        </Card>

        <Card className="md:col-span-2 h-40 px-4 py-3 flex flex-col justify-center gap-4">
          {/* Easy Progress */}
          <div className="flex gap-2 justify-between items-center">
            <h1 className="text-green-500 font-semibold w-20">EASY</h1>
            <Progress value={easyPercentage} className="flex-1" />
            <h1 className="w-16 text-right">{easySolved}/{easy}</h1>
          </div>

          {/* Medium Progress */}
          <div className="flex gap-2 justify-between items-center">
            <h1 className="text-yellow-500 font-semibold w-20">MEDIUM</h1>
            <Progress value={mediumPercentage} className="flex-1" />
            <h1 className="w-16 text-right">{mediumSolved}/{medium}</h1>
          </div>

          {/* Hard Progress */}
          <div className="flex gap-2 justify-between items-center">
            <h1 className="text-red-500 font-semibold w-20">HARD</h1>
            <Progress value={hardPercentage} className="flex-1" />
            <h1 className="w-16 text-right">{hardSolved}/{hard}</h1>
          </div>
        </Card>
      </div>
    </div>
  );
}