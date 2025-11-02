"use client";
import { featuredQuestions } from "@/types/type";
import React from "react";
import { Badge } from "./badge";
import { Card } from "./card";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { ImCheckboxUnchecked } from "react-icons/im";
import { useUserProgressStore } from "@/app/store/store";
import ProgressTrackButton from "./ProgressTrackButton";



export default function QuestionCard({
  data,
  index,
  companyId,
  type
}: {
  data: featuredQuestions;
  index: number;
  companyId: string,
  type:string

}) {
  const  increaseEasySolved= useUserProgressStore((state)=>state.increaseEasySolved)
  const  increaseMediumSolved= useUserProgressStore((state)=>state.increaseMediumSolved)
  const increaseHardSolved= useUserProgressStore((state)=>state.increaseHardSolved)
  const levelColor = (level: string): string => {
    if (level === "EASY") return "text-green-500";
    else if (level === "MEDIUM") return "text-yellow-500";
    else return "text-red-500";
  };

  const chooseProgress = (difficulty:string)=>{
    if(difficulty === "EASY") return increaseEasySolved
    else if(difficulty === "MEDIUM") return increaseMediumSolved
    else if(difficulty=== "HARD") return increaseHardSolved
  }
  console.log(data)
  
  return (
    <Card
      key={`${data.name}-${index}`}
      className={`flex flex-row justify-between items-center px-2 h-15 ${
        index % 2 === 0 ? "bg-muted" : "bg-background"
      }`}
    >
      <div>
        <ProgressTrackButton  questionId={data.id} isSolved={data.isSolved} difficulty={data.difficulty}/>
      </div>
      <h1>
        {index + 1}. {data.name}
      </h1>

      <div className="flex items-center gap-2">
        {data.companies?.slice(0, 7).map((company, companyIndex) => (
         
          <Tooltip>
            <TooltipTrigger>
              <img src={company.company.logoSmall} className="h-6  rounded-2xl"></img>
            </TooltipTrigger>
            <TooltipContent>
              {company.company.name}
            </TooltipContent>
          </Tooltip>
        ))}


        {data.companies && data.companies.length > 7 && (
          
          <Tooltip>
            <TooltipTrigger>
              <Badge>{data.companies.length - 7}+</Badge>
            </TooltipTrigger>
            <TooltipContent className="flex justify-center items-center gap-1">
              {data.companies.slice(5).map((data, index) => (
                <Tooltip>
                  <TooltipTrigger>
                    <img
                  key={index}
                  alt={`${data.company.name} logo`}
                  src={data.company.logoSmall}
                  className="h-6  "
                ></img>
                  </TooltipTrigger>
                  <TooltipContent>
                    {data.company.name}
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      <div className="flex gap-1">
        {data.topics?.slice(0,4).map((topic, topicIndex) => (
          <Badge
            className={`${index % 2 === 0 ? "bg-card" : "bg-muted"}`}
            key={topicIndex}
          >
            {topic.topic.name}
          </Badge>
        ))}
        {
          data.topics && data.topics.length >4 && (
            <Tooltip>
              <TooltipTrigger>
                <Badge>
                  {data.topics.length -4}+
                </Badge>
              </TooltipTrigger>
              <TooltipContent className="flex gap-2">
                {data.topics.slice(4).map((topic,index)=>(
                  <Badge
            
            key={index}
          >
            {topic.topic.name}
          </Badge>
                ))}
              </TooltipContent>
            </Tooltip>
          )
        }
      </div>

      <div className="flex justify-between items-center gap-2 w-1/4">
        {data?.leetCodeLink ? (
          <Link
            target="_blank"
            href={data.leetCodeLink}
            className="flex items-center justify-center"
          >
            <Tooltip>
              <TooltipContent>
                <p>Solve on LeetCode</p>
              </TooltipContent>
              <TooltipTrigger>
                <img
                  src={"/logo/LeetCode_Logo_1.png"}
                  className="h-5 w-5"
                ></img>
              </TooltipTrigger>
            </Tooltip>
          </Link>
        ) : (
          <span className="text-gray-400 text-sm italic">No link</span>
        )}

        <Tooltip>
          <TooltipTrigger>
            <p>{data.acceptanceRate?.toFixed(2)} % </p>
          </TooltipTrigger>
          <TooltipContent>Acceptance rate</TooltipContent>
        </Tooltip>
        <p className={`font-bold ${levelColor(data.difficulty)}`}>
          {data.difficulty}
        </p>
        <Tooltip>
          <TooltipTrigger>
            <p>{data.frequency?.toFixed(2)} %</p>
          </TooltipTrigger>
          <TooltipContent>Frequncy</TooltipContent>
        </Tooltip>
      </div>
    </Card>
  );
}
