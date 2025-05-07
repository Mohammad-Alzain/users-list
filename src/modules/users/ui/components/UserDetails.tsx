"use client";

import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Building,
  Heart,
  Eye,
  Ruler,
  Weight,
} from "lucide-react";
import { User } from "../../core/types";

interface UserDetailsProps {
  user: User;
}

export default function UserDetailsView({ user }: UserDetailsProps) {
  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to users
          </Button>
        </Link>
      </div>

      <Card className="overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gray-50">
            <div className="relative h-64 w-full md:h-full">
              <Avatar className="h-full w-full rounded-none">
                <AvatarImage
                  src={user.image || "/placeholder.svg"}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="object-cover"
                />
                <AvatarFallback className="text-6xl rounded-none h-full">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          <CardContent className="md:w-2/3 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-gray-600">@{user.username}</p>
              </div>
              <Badge className="text-sm">{user.gender}</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Personal Information
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <span>{user.email}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <span>{user.phone}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <span>
                        Born: {user.birthDate} (Age: {user.age})
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p>{user.address.address}</p>
                        <p>
                          {user.address.city}, {user.address.state}
                        </p>
                        <p>{user.address.postalCode}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Professional Information
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Building className="h-5 w-5 text-gray-400" />
                      <span>{user.company.name}</span>
                    </div>

                    <div className="flex items-start gap-3">
                      <Briefcase className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p>{user.company.title}</p>
                        <p className="text-sm text-gray-500">
                          {user.company.department}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Physical Characteristics
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-500">Hair:</span>
                      <span className="flex items-center">
                        <span
                          className="inline-block w-3 h-3 rounded-full mr-1"
                          style={{
                            backgroundColor: user.hair.color.toLowerCase(),
                          }}
                        ></span>
                        {user.hair.color}, {user.hair.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-500">Eyes:</span>
                      <span>
                        <span
                          className="inline-block w-3 h-3 rounded-full mr-1"
                          style={{
                            backgroundColor: user.eyeColor.toLowerCase(),
                          }}
                        ></span>
                        {user.eyeColor}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Ruler className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-500">Height:</span>
                      <span>{user.height} cm</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Weight className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-500">Weight:</span>
                      <span>{user.weight} kg</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
