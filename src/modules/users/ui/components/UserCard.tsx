import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Briefcase } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "../../core/types";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full bg-gray-100">
        <Avatar className="h-full w-full rounded-none">
          <AvatarImage
            src={user.image || "/placeholder.svg"}
            alt={`${user.firstName} ${user.lastName}`}
            className="object-cover"
          />
          <AvatarFallback className="text-4xl rounded-none h-full">
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-semibold line-clamp-1">
            {user.firstName} {user.lastName}
          </h2>
          <Badge variant="outline" className="text-xs">
            {user.gender}
          </Badge>
        </div>

        <p className="text-gray-600 text-sm mb-3">@{user.username}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{user.email}</span>
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{user.address.city}</span>
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <Briefcase className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{user.company.title}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span
              className="inline-block w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: user.hair.color.toLowerCase() }}
            ></span>
            <span className="text-sm text-gray-500">
              {user.hair.color} hair
            </span>
          </div>
          <Link href={`/users/${user.id}`}>
            <Button size="sm">View Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
