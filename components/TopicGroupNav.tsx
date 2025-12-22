"use client";

import Link from "next/link";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { slugify } from "@/utils/slugify.utility";
import { useEffect, useState } from "react";
import { topicResponse } from "@/types/type";
import { getTopics } from "@/app/actions/topics/topics";
import { Badge } from "./ui/badge";

export default function TopicGroupNav() {
  const [topicData, setTopicData] = useState<topicResponse | null>();
  useEffect(() => {
    async function getTopicData() {
      const result = await getTopics();
      setTopicData(result);
    }
    getTopicData();
  }, []);

  return (
    <ToggleGroup
      className="flex-nowrap w-max"
      type="multiple"
      variant="outline"
      spacing={2}
      size="sm"
    >
      {topicData?.data.map((topic) => {
        return (
          <ToggleGroupItem
            key={topic.id}
            value={topic.name}
            className="flex items-center gap-2 data-[state=on]:bg-transparent"
          >
            <Link
              href={`/topic/${slugify(
                topic.name
              )}/leetcode-interview-questions`}
              className="flex items-center gap-2"
            >
              <Badge className="rounded-full">
                <h1 className="">{topic._count.questions}+</h1>
              </Badge>

              <span>{topic.name}</span>
            </Link>
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
  );
}
