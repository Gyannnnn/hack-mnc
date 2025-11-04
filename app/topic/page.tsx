import React from "react";
import { getTopics } from "../actions/topics/topics";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default async function page() {
  let topicData;
  try {
    const res = await getTopics();
    topicData = res?.data;

    return (
      <div className="w-full">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Topics
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Explore questions by topic
          </p>
        </div>

        {/* Topics Grid */}
        <Card className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {topicData?.map((topic) => (
              <Link
                key={topic.id}
                href={`/topic/${topic.id}`}
                className="group block"
              >
                <div className="flex flex-col p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-200 group-hover:scale-105 bg-white dark:bg-gray-800 h-full">
                  {/* Topic Name */}
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {topic.name}
                    </h3>
                  </div>

                  {/* Question Count */}
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      Questions
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-semibold px-2 py-1 text-xs"
                    >
                      {topic._count.questions}
                    </Badge>
                  </div>

                  {/* Progress bar indicator (optional) */}
                  <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                    <div
                      className="bg-blue-600 h-1 rounded-full transition-all duration-300 group-hover:bg-blue-500"
                      style={{
                        width: `${Math.min(
                          (topic._count.questions / 50) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {(!topicData || topicData.length === 0) && (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
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
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                No topics available
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Topics will appear here once they are added.
              </p>
            </div>
          )}
        </Card>
      </div>
    );
  } catch (error) {
    console.log(error)
    return (
      <Card className="p-8 text-center bg-white dark:bg-gray-900 border border-red-200 dark:border-red-800">
        <div className="text-red-500 mb-4">
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
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Something went wrong
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          We couldn&apos;t load the topics. Please try again later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
        >
          Try Again
        </button>
      </Card>
    );
  }
}
