import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingUserList() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-6 rounded-xl">
        <div className="w-full md:w-auto">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-5 w-48" />
        </div>

        <div className="flex flex-wrap gap-4">
          <Skeleton className="h-16 w-32" />
          <Skeleton className="h-16 w-32" />
        </div>
      </div>

      {/* Search and Filter Section Skeleton */}
      <div className="p-5 rounded-lg shadow-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div className="space-y-4">
          <div className="md:flex md:space-x-4">
            <div className="relative flex-1 mb-4 md:mb-0">
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="relative md:w-64">
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="relative md:w-64 mt-4 md:mt-0">
              <Skeleton className="h-10 w-full" />
            </div>
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
    <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 h-full">
      <Skeleton className="h-48 w-full" />
      <div className="p-5 space-y-4">
        <div className="flex justify-between">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <Skeleton className="h-4 w-1/2" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>
      </div>
    </div>
  );
}
