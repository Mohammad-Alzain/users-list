import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function UserDetailsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link href="/">
          <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary)]/80">
            <ArrowLeft className="h-4 w-4" />
            Back to users
          </button>
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--card)]">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gray-50">
            <Skeleton className="h-64 w-full md:h-full" />
          </div>

          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="space-y-6">
                <div>
                  <Skeleton className="h-6 w-40 mb-4" />
                  <div className="space-y-3">
                    {Array(4)
                      .fill(0)
                      .map((_, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Skeleton className="h-5 w-5 rounded-full" />
                          <Skeleton className="h-4 w-full" />
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <Skeleton className="h-6 w-48 mb-4" />
                  <div className="space-y-3">
                    {Array(2)
                      .fill(0)
                      .map((_, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Skeleton className="h-5 w-5 rounded-full" />
                          <Skeleton className="h-4 w-full" />
                        </div>
                      ))}
                  </div>
                </div>

                <hr className="border-[var(--border)]" />

                <div>
                  <Skeleton className="h-6 w-48 mb-4" />
                  <div className="grid grid-cols-2 gap-3">
                    {Array(4)
                      .fill(0)
                      .map((_, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Skeleton className="h-4 w-4 rounded-full" />
                          <Skeleton className="h-4 w-16" />
                          <Skeleton className="h-4 w-full" />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
