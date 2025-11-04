import { Card } from "./card";
import { Skeleton } from "./skeleton";

export function QuestionCardSkeleton() {
  return (
    <Card className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 gap-3 sm:gap-2 min-h-20">
      {/* Main content area */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        {/* Progress Track Button Skeleton */}
        <Skeleton className="h-6 w-6 rounded-full flex-shrink-0" />

        {/* Question Name Skeleton */}
        <Skeleton className="h-4 flex-1 sm:flex-none sm:w-48" />
      </div>

      {/* Middle section - Companies and Topics */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto sm:flex-1 sm:mx-4">
        {/* Companies Skeleton */}
        <div className="flex items-center gap-2 flex-wrap">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-6 w-6 rounded-2xl flex-shrink-0" />
          ))}
          <Skeleton className="h-5 w-8 rounded-full flex-shrink-0" />
        </div>

        {/* Topics Skeleton */}
        <div className="flex items-center gap-2 flex-wrap">
          {[...Array(2)].map((_, index) => (
            <Skeleton key={index} className="h-5 w-12 rounded-full flex-shrink-0" />
          ))}
          <Skeleton className="h-5 w-8 rounded-full flex-shrink-0" />
        </div>
      </div>

      {/* Stats Section Skeleton */}
      <div className="flex justify-between sm:justify-end items-center gap-3 w-full sm:w-auto sm:gap-4">
        {/* LeetCode Link Skeleton */}
        <Skeleton className="h-5 w-5 rounded flex-shrink-0" />
        
        {/* Acceptance Rate Skeleton */}
        <Skeleton className="h-4 w-12 hidden xs:block flex-shrink-0" />
        
        {/* Difficulty Skeleton */}
        <Skeleton className="h-4 w-16 hidden sm:block flex-shrink-0" />
        
        {/* Frequency Skeleton */}
        <Skeleton className="h-4 w-12 hidden md:block flex-shrink-0" />
      </div>
    </Card>
  );
}