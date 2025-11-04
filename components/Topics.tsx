import React from "react";
import { getTopics } from "@/app/actions/topics/topics";
import Link from "next/link";
import { Card } from "./ui/card";

export default async function Topics() {
  let topicData;
  try {
    const res = await getTopics();
    topicData = res?.data;

    return (
      <Card className="bg-transparent px-4 py-3">
        {/* Desktop: all topics as compact pills */}
        <div className="hidden md:flex flex-row flex-wrap justify-start gap-2">
          {topicData?.map((topic, index) => (
            <Link key={index} href={`/topic/${topic.id}`} className="group">
              <div className="flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 hover:bg-card transition-colors">
                <span className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                  {topic.name}
                </span>
                <span className="text-[11px] font-semibold text-primary bg-primary/10 rounded-full px-2 py-0.5">
                  {topic._count.questions}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile: show first N, expandable rest with summary toggle like LeetCode */}
        <div className="md:hidden">
          {(() => {
            const initialCount = 12;
            const first = topicData?.slice(0, initialCount) || [];
            const rest = topicData?.slice(initialCount) || [];

            return (
              <div className="flex flex-col gap-2">
                <div className="flex flex-row flex-wrap gap-2">
                  {first.map((topic, index) => (
                    <Link key={index} href={`/topic/${topic.id}`} className="group">
                      <div className="flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 hover:bg-card transition-colors">
                        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {topic.name}
                        </span>
                        <span className="text-[10px] font-semibold text-primary bg-primary/10 rounded-full px-2 py-0.5">
                          {topic._count.questions}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                {rest.length > 0 && (
                  <details className="group open:space-y-2">
                    <summary className="select-none cursor-pointer inline-flex items-center gap-1 text-primary text-sm font-medium">
                      <span className="group-open:hidden">See more</span>
                      <span className="hidden group-open:inline">Collapse</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4 transition-transform group-open:rotate-180"
                        aria-hidden="true"
                      >
                        <path fillRule="evenodd" d="M12 14.5a.75.75 0 0 1-.53-.22l-5-5a.75.75 0 1 1 1.06-1.06l4.47 4.47 4.47-4.47a.75.75 0 1 1 1.06 1.06l-5 5a.75.75 0 0 1-.53.22Z" clipRule="evenodd" />
                      </svg>
                    </summary>
                    <div className="mt-2 flex flex-row flex-wrap gap-2">
                      {rest.map((topic, index) => (
                        <Link key={index} href={`/topic/${topic.id}`} className="group">
                          <div className="flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 hover:bg-card transition-colors">
                            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                              {topic.name}
                            </span>
                            <span className="text-[10px] font-semibold text-primary bg-primary/10 rounded-full px-2 py-0.5">
                              {topic._count.questions}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </details>
                )}
              </div>
            );
          })()}
        </div>
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
