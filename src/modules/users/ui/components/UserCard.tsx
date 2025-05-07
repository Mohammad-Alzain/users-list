"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Mail,
  MapPin,
  Briefcase,
  Heart,
  ExternalLink,
  Star,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "../../core/types";
import { cn } from "@/lib/utils";

interface UserCardProps {
  user: User;
}
const statusColors = {
  active: "bg-emerald-500",
  junior: "bg-amber-500",
  senior: "bg-purple-500",
};
export default function UserCard({ user }: UserCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const status = useMemo(() => {
    if (user.age < 25) return "junior";
    if (user.age > 40) return "senior";
    return "active";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-xl border-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
        <div className="relative">
          {/* Background gradient */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 dark:from-indigo-500/10 dark:to-purple-500/10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fillOpacity='0.05' fillRule='evenodd'/%3E%3C/svg%3E")`,
            }}
          />

          {/* User image */}
          <div className="relative h-48 w-full overflow-hidden">
            <Avatar className="h-full w-full rounded-none">
              <AvatarImage
                src={user.image || "/placeholder.svg?height=192&width=384"}
                alt={`${user.firstName} ${user.lastName}`}
                className="object-cover transition-transform duration-500 hover:scale-110"
              />
              <AvatarFallback className="text-4xl rounded-none h-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                {initials}
              </AvatarFallback>
            </Avatar>

            {/* Favorite button */}
            <button
              onClick={handleFavoriteClick}
              className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition-all duration-200 z-10"
            >
              <Heart
                className={cn(
                  "h-5 w-5 transition-all duration-300",
                  isFavorite
                    ? "fill-rose-500 text-rose-500 scale-110"
                    : "text-slate-500"
                )}
              />
            </button>

            {/* Status indicator */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-md z-10">
              <span
                className={cn(
                  "h-2.5 w-2.5 rounded-full animate-pulse",
                  statusColors[status as keyof typeof statusColors]
                )}
              ></span>
              <span className="text-xs font-medium capitalize">{status}</span>
            </div>
          </div>
        </div>

        <CardContent className="p-5">
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-xl font-bold line-clamp-1 group-hover:text-indigo-600 transition-colors">
              {user.firstName} {user.lastName}
            </h2>
            <Badge
              variant="secondary"
              className="ml-2 capitalize bg-slate-100 dark:bg-slate-700 font-medium"
            >
              {user.gender}
            </Badge>
          </div>

          <p className="text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
            @{user.username}
          </p>

          <div className="space-y-2.5 mb-5">
            <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
              <Mail className="h-4 w-4 mr-2.5 flex-shrink-0 text-slate-400" />
              <span className="truncate hover:text-indigo-600 transition-colors">
                {user.email}
              </span>
            </div>

            <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
              <MapPin className="h-4 w-4 mr-2.5 flex-shrink-0 text-slate-400" />
              <span className="truncate hover:text-indigo-600 transition-colors">
                {user.address.city}
              </span>
            </div>

            <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
              <Briefcase className="h-4 w-4 mr-2.5 flex-shrink-0 text-slate-400" />
              <span className="truncate hover:text-indigo-600 transition-colors">
                {user.company.title}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-700">
            <div className="flex items-center">
              <span
                className="inline-block w-3 h-3 rounded-full mr-2 ring-2 ring-white"
                style={{ backgroundColor: user.hair.color.toLowerCase() }}
              ></span>
              <span className="text-sm text-slate-500 dark:text-slate-400 capitalize">
                {user.hair.color} hair
              </span>
            </div>
            <Link href={`/users/${user.id}`} className="inline-block">
              <Button
                size="sm"
                className="gap-1.5 bg-indigo-600 hover:bg-indigo-700"
              >
                View
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
