"use client";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function ProfileCardSkeleton() {
  return (
    <Card className="w-full bg-card border border-border">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-around">
          <div className="flex flex-col items-center gap-6 w-full lg:w-2/6">
            <Skeleton className="h-32 w-32 rounded-full" />
            <div className="w-full space-y-3">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
              <div className="flex justify-center lg:justify-start">
                <Skeleton className="h-6 w-28 rounded-full" />
              </div>
            </div>
          </div>

          <div className="hidden sm:block">
            <div className="h-40 w-40 rounded-full border-8 border-border flex items-center justify-center">
              <Skeleton className="h-10 w-24" />
            </div>
          </div>

          <div className="flex items-center gap-10 w-full lg:w-4/5">
            <div className="space-y-4 flex-1 min-w-[280px]">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-2 w-full" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-2 w-full" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-2 w-full" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


