import { Skeleton } from "@/components/ui/skeleton";

export function BlogMetaSkeleton() {
  return (
    <div className="flex items-center gap-3">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  );
}

export function BlogActionsSkeleton() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="h-6 w-12" />
      <Skeleton className="h-6 w-12" />
    </div>
  );
}

export function AuthorBioSkeleton() {
  return (
    <div className="flex items-start gap-4 mt-8">
      <Skeleton className="w-16 h-16 rounded-full shrink-0" />
      <div className="flex-1 space-y-3">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-4 pt-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
}
