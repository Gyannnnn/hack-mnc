"use client";

import React, { useEffect, useState } from "react";
import { getTopicDetails } from "@/app/actions/topics/topics";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import {  topicStats } from "@/types/type";
import { useUserProgressStore } from "@/app/store/store";

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
      <div className="flex justify-center items-center h-40">
        <h1>Loading...</h1>
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
      <div className="flex max-sm:flex-col gap-2">
        <Card className="w-1/3 h-40 flex flex-row items-center justify-around relative">
          <Card className="h-30 w-30 flex items-center justify-center text-white font-bold text-2xl rounded-full border border-primary">
            <h1>{easySolved + mediumSolved + hardSolved}/{totalNumberOfQuestions}</h1>
          </Card>
          <Badge className="absolute top-2 left-2">{topic.name}</Badge>
        </Card>

        <Card className="w-2/3 h-40 px-4 flex flex-col justify-center space-y-4">
          {/* Easy Progress */}
          <div className="flex gap-2 justify-between items-center">
            <h1 className="text-green-400 font-bold w-20">EASY</h1>
            <Progress value={easyPercentage} className="flex-1" />
            <h1 className="w-16 text-right">{easySolved}/{easy}</h1>
          </div>

          {/* Medium Progress */}
          <div className="flex gap-2 justify-between items-center">
            <h1 className="text-yellow-400 font-bold w-20">MEDIUM</h1>
            <Progress value={mediumPercentage} className="flex-1" />
            <h1 className="w-16 text-right">{mediumSolved}/{medium}</h1>
          </div>

          {/* Hard Progress */}
          <div className="flex gap-2 justify-between items-center">
            <h1 className="text-red-400 font-bold w-20">HARD</h1>
            <Progress value={hardPercentage} className="flex-1" />
            <h1 className="w-16 text-right">{hardSolved}/{hard}</h1>
          </div>
        </Card>
      </div>
    </div>
  );
}