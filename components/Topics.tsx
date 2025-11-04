import React from "react";
import { getTopics } from "@/app/actions/topics/topics";
import Link from "next/link";
import { Card } from "./ui/card";

export default async function Topics() {
  let topicData;
  try {
    const res = await getTopics();
    topicData = res?.data;
    console.log(topicData);

    return (
      <Card className="flex flex-row flex-wrap justify-start min-h-52 gap-2 bg-transparent  px-4">
        {topicData?.map((topic, index) => (
          <Link key={index} href={`/topic/${topic.id}`}>
            <div className="flex gap-2 items-center justify-center">
              <h1 className="hover:underline underline-offset-2 text-gray-200 font-bold">
                {topic.name}
              </h1>
              <h1 className="text-primary   rounded-full bg-card">
                {topic._count.questions} +
              </h1>
            </div>
          </Link>
        ))}
      </Card>
    );
  } catch (error) {
    console.log(error)
    return (
      <div className="cnt">
        <h1>something went wrong</h1>
      </div>
    );
  }
}
