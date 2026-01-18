import React from "react";
import Link from "next/link";
import { getTopics } from "../actions/topics/topics";
import { Card } from "@/components/ui/card";
import TopicSearch from "@/components/TopicSearch";

export default async function page() {
  let topicData;
  try {
    const res = await getTopics();
    topicData = res?.data;

    return (
      <div className="cnt px-10">
        {/* Topics Browser with search */}
        {topicData && topicData.length > 0 ? (
          <TopicSearch topics={topicData} />
        ) : (
          <Card className="p-8 text-center bg-card border border-border">
            <div className="text-muted-foreground mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">No topics available</h3>
            <p className="text-muted-foreground">
              Topics will appear here once they are added.
            </p>
          </Card>
        )}
      </div>
    );
  } catch (error) {
    console.log(error)
    return (
      <Card className="p-8 text-center bg-card border border-border">
        <div className="text-destructive mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2">
          Something went wrong
        </h3>
        <p className="text-muted-foreground mb-4">
          We couldn&apos;t load the topics. Please try again later.
        </p>
        <Link href="/topic" className="inline-block px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors font-medium">
          Try Again
        </Link>
      </Card>
    );
  }
}
