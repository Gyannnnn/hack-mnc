import { getQuestionsByTopic } from "@/app/actions/questions/questions";
import { Card } from "@/components/ui/card";
import { Badge } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  let questionData;
  try {
    const res = await getQuestionsByTopic(id);
    questionData = res?.data

    return(
      <div>
        {questionData?.fetchQuestions.map((question, index) => (
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
      </div>
    )
  } catch (error) {
    return(
      <div>Failed to fetch question</div>
    )
  }
}
