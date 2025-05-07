import Link from "next/link";
import { UserX } from "lucide-react";

export default function UserNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <UserX className="h-24 w-24 text-[var(--muted-foreground)] mb-6" />
      <h1 className="text-2xl font-bold mb-4">User Not Found</h1>
      <p className="text-[var(--muted-foreground)] mb-8 max-w-md">
        We couldn't find the user you're looking for. The user might have been
        removed or doesn't exist in our database.
      </p>
      <Link href="/">
        <button className="px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-md hover:bg-[var(--primary)]/90 transition-colors">
          Browse All Users
        </button>
      </Link>
    </div>
  );
}
