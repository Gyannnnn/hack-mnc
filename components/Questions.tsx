"use client";

import { getQuestions } from "@/app/actions/questions/questions";
import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import Link from "next/link";
import Image from "next/image";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LoaderCircle, LoaderCircleIcon } from "lucide-react";

export default function Q2() {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error
  } = useInfiniteQuery({
    queryKey: ["questions"],
    queryFn: ({ pageParam = 1 }) => getQuestions({ pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.hasMore ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const allQuestions = data?.pages.flatMap(page => page.data.fetchQuestions) || [];

  const handleScroll = () => {
    const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
    
    if (bottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNextPage, isFetchingNextPage]);

  // Handle initial loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <LoaderCircle className="animate-spin h-8 w-8" />
        <span className="ml-2">Loading questions...</span>
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div className="flex justify-center items-center py-8 text-red-500">
        Error loading questions: {error?.message || "Unknown error"}
      </div>
    );
  }

  // Handle empty state
  if (allQuestions.length === 0) {
    return (
      <div className="flex justify-center items-center py-8">
        No questions found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {allQuestions.map((question, index) => (
        <Card 
          key={`${question.name}-${index}`} 
          className={`flex flex-row justify-between items-center px-2 h-10 ${
            index % 2 === 0 ? "bg-muted" : "bg-background"
          }`}
        >
          <h1>{index + 1}. {question.name}</h1>
          
          <div className="flex gap-1">
            {question.companies.map((company, companyIndex) => (
              <img
                key={companyIndex}
                className="h-6 min-w-6 rounded-full"
                src={company.company.logoSmall}
                alt="Company logo"
              />
            ))}
          </div>
          
          <div className="flex gap-1">
            {question.topics.map((topic, topicIndex) => (
              <Badge 
                className={`${index % 2 === 0 ? "bg-card" : "bg-muted"}`}  
                key={topicIndex}
              >
                {topic.topic.name}
              </Badge>
            ))}
          </div>
          
          <div className="flex justify-between gap-2 w-1/4">
            <Link target="_blank" href={question.leetCodeLink}>
              <Image 
                src={"/logo/LeetCode_Logo_1.png"} 
                height={30} 
                width={30} 
                alt="leetcode logo" 
              />
            </Link>
            <p>{question.acceptanceRate.toFixed(2)} % </p>
            <p className="font-bold text-green-500">{question.difficulty}</p>
            <p>{question.frequency.toFixed(2)} %</p>
          </div>
        </Card>
      ))}
      
      {/* Loading indicator for next page */}
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <LoaderCircleIcon className="text-primary animate-spin" />
          <span className="ml-2">Loading more questions...</span>
        </div>
      )}
      
      {/* No more data indicator */}
      {!hasNextPage && allQuestions.length > 0 && (
        <div className="flex justify-center py-4">
          <p>No more questions to load.</p>
        </div>
      )}
    </div>
  );
}