"use client";

import Link from "next/link";
import { UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function UserNotFound() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-indigo-100 dark:bg-indigo-900/30 rounded-full blur-xl opacity-70"></div>
        <UserX className="h-24 w-24 text-indigo-600 dark:text-indigo-400 relative" />
      </div>

      <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        User Not Found
      </h1>

      <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-md">
        We couldn't find the user you're looking for. The user might have been
        removed or doesn't exist in our database.
      </p>

      <Link href="/">
        <Button className="bg-indigo-600 hover:bg-indigo-700 gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-users"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          Browse All Users
        </Button>
      </Link>
    </motion.div>
  );
}
