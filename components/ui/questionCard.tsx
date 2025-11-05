"use client";
import { featuredQuestions } from "@/types/type";
import React from "react";
import { Badge } from "./badge";
import { Card } from "./card";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import ProgressTrackButton from "./ProgressTrackButton";

export default function QuestionCard({
  data,
  index,
  type,
}: {
  data: featuredQuestions;
  index: number;
  companyId: string;
  type: string;
}) {
  // const increaseEasySolved = useUserProgressStore(
  //   (state) => state.increaseEasySolved
  // );
  // const increaseMediumSolved = useUserProgressStore(
  //   (state) => state.increaseMediumSolved
  // );
  // const increaseHardSolved = useUserProgressStore(
  //   (state) => state.increaseHardSolved
  // );
  const levelColor = (level: string): string => {
    if (level === "EASY") return "text-green-500";
    else if (level === "MEDIUM") return "text-yellow-500";
    else return "text-red-500";
  };

  // const chooseProgress = (difficulty: string) => {
  //   if (difficulty === "EASY") return increaseEasySolved;
  //   else if (difficulty === "MEDIUM") return increaseMediumSolved;
  //   else if (difficulty === "HARD") return increaseHardSolved;
  // };

  console.log(data);

  return (
    <Card
      key={`${data.name}-${index}`}
      className={`px-2 py-2 ${index % 2 === 0 ? "bg-muted" : "bg-background"} max-sm:relative `}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Left: Progress + index + question name (fixed width, wraps) */}
        <div className="flex items-start md:items-center gap-3 w-full md:w-[520px] min-w-0">
          <ProgressTrackButton
            type={type}
            questionId={data.id}
            isSolved={data.isSolved}
            difficulty={data.difficulty}
          />
          <h1 className="w-full break-words leading-5 md:leading-6 text-[15px] md:text-base max-sm:font-bold">
            {index + 1}. {data.name}
          </h1>
        </div>

        {/* Middle: Company logos + topics (together) */}
        <div className="flex w-full flex-col gap-2 md:flex-row md:items-center md:flex-1 md:justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            {data.companies?.slice(0, 7).map((company, companyIndex) => (
              <Tooltip key={companyIndex}>
                <TooltipTrigger>
                  <img
                    src={company.company.logoSmall}
                    alt={`${company.company.name} logo`}
                    className="h-5 md:h-6"
                  />
                </TooltipTrigger>
                <TooltipContent>{company.company.name}</TooltipContent>
              </Tooltip>
            ))}

            {data.companies && data.companies.length > 7 && (
              <Tooltip>
                <TooltipTrigger>
                  <span className="text-primary font-bold animate-pulse">
                    {data.companies.length - 7}+
                  </span>
                </TooltipTrigger>
                <TooltipContent className="flex justify-center items-center gap-1">
                  {data.companies.slice(5).map((data, index) => (
                    <Tooltip key={index}>
                      <TooltipTrigger>
                      <img
                          alt={`${data.company.name} logo`}
                          src={data.company.logoSmall}
                        className="h-5 md:h-6"
                        />
                      </TooltipTrigger>
                      <TooltipContent>{data.company.name}</TooltipContent>
                    </Tooltip>
                  ))}
                </TooltipContent>
              </Tooltip>
            )}
          </div>

          <div className="flex gap-1 flex-wrap">
            {data.topics?.slice(0, 4).map((topic, topicIndex) => (
              <Badge
                className={`${index % 2 === 0 ? "bg-card" : "bg-muted"}`}
                key={topicIndex}
              >
                {topic.topic.name}
              </Badge>
            ))}
            {data.topics && data.topics.length > 4 && (
              <Tooltip>
                <TooltipTrigger>
                  <Badge>{data.topics.length - 4}+</Badge>
                </TooltipTrigger>
                <TooltipContent className="flex gap-2 flex-wrap">
                  {data.topics.slice(4).map((topic, index) => (
                    <Badge key={index}>{topic.topic.name}</Badge>
                  ))}
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>

        {/* Right: LeetCode link + acceptance + difficulty + frequency */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end shrink-0">
          {data?.leetCodeLink ? (
            <Link
              target="_blank"
              href={data.leetCodeLink}
              className="flex items-center justify-center max-sm:absolute bottom-1 right-1"
            >
              <Tooltip>
                <TooltipContent>
                  <p>Solve on LeetCode</p>
                </TooltipContent>
                <TooltipTrigger>
                  <img
                    src={"/logo/LeetCode_Logo_1.png"}
                    alt="LeetCode logo"
                    className="sm:h-5 sm:w-5 h-8 w-8"
                  />
                </TooltipTrigger>
              </Tooltip>
            </Link>
          ) : (
            <span className="text-gray-400 text-sm italic">No link</span>
          )}

          <Tooltip>
            <TooltipTrigger>
              <p className="font-mono md:w-20 w-auto text-right text-sm md:text-base">{data.acceptanceRate?.toFixed(2)} % </p>
            </TooltipTrigger>
            <TooltipContent>Acceptance rate</TooltipContent>
          </Tooltip>
          <p className={`font-bold text-center min-w-[70px] md:min-w-[80px] text-sm md:text-base ${levelColor(data.difficulty)}`}>
            {data.difficulty}
          </p>
          <Tooltip>
            <TooltipTrigger>
              <p className="font-mono md:w-20 w-auto text-right text-sm md:text-base">{data.frequency?.toFixed(2)} %</p>
            </TooltipTrigger>
            <TooltipContent>Frequncy</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </Card>
  );
}
