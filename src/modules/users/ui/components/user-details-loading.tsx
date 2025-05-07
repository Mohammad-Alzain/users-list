import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UserDetailsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 dark:border-indigo-800 dark:hover:bg-indigo-950"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to users
          </Button>
        </Link>

        <div className="flex gap-2">
          <Skeleton className="h-9 w-24 rounded-md" />
          <Skeleton className="h-9 w-24 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border-0 shadow-lg bg-white dark:bg-slate-900">
        <div className="md:flex">
          <div className="md:w-1/3 relative">
            <Skeleton className="h-80 w-full md:h-full" />
          </div>

          <div className="md:w-2/3 p-8">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-5 w-32" />
              </div>
              <Skeleton className="h-7 w-20 rounded-full" />
            </div>

            <div className="mt-8">
              <Skeleton className="h-10 w-full mb-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50"
                    >
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-20 mb-2" />
                        <Skeleton className="h-5 w-full" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
