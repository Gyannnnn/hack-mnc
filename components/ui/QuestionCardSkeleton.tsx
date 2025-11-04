import { Card } from "./card";
import { Skeleton } from "./skeleton";

export function QuestionCardSkeleton() {
  return (
    <Card className="flex flex-row justify-between items-center px-2 h-15">
      {/* Progress Track Button Skeleton */}
      <div>
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>

      {/* Question Name Skeleton */}
      <div className="flex-1 mx-4">
        <Skeleton className="h-4 w-3/4" />
      </div>

      {/* Companies Skeleton */}
      <div className="flex items-center gap-2">
        {[...Array(4)].map((_, index) => (
          <Skeleton key={index} className="h-6 w-6 rounded-2xl" />
        ))}
        <Skeleton className="h-5 w-8 rounded-full" />
      </div>

      {/* Topics Skeleton */}
      <div className="flex gap-1 mx-4">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="h-5 w-12 rounded-full" />
        ))}
        <Skeleton className="h-5 w-8 rounded-full" />
      </div>

      {/* Stats Section Skeleton */}
      <div className="flex justify-between items-center gap-4 w-1/4">
        {/* LeetCode Link Skeleton */}
        <Skeleton className="h-5 w-5 rounded" />
        
        {/* Acceptance Rate Skeleton */}
        <Skeleton className="h-4 w-12" />
        
        {/* Difficulty Skeleton */}
        <Skeleton className="h-4 w-16" />
        
        {/* Frequency Skeleton */}
        <Skeleton className="h-4 w-12" />
      </div>
    </Card>
  );
}

