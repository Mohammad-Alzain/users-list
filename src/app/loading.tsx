import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-8 text-center">User Directory</h1>

      {/* Search and Filter Section Skeleton */}
      <div className="p-4 rounded-lg shadow-md bg-[var(--card)] border border-[var(--border)]">
        <div className="md:flex md:space-x-4">
          <div className="relative flex-1 mb-4 md:mb-0">
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="relative md:w-64">
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>

      {/* User Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <UserCardSkeleton key={index} />
          ))}
      </div>
    </div>
  );
}

function UserCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--card)]">
      <Skeleton className="h-48 w-full" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <Skeleton className="h-4 w-1/2" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
      </div>
    </div>
  );
}
