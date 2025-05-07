"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  User,
  Share2,
  Download,
  Star,
  Bookmark,
  ChevronRight,
  Globe,
  GraduationCap,
  CreditCard,
  Network,
} from "lucide-react";
import { User as UserType } from "../../core/types";
import { cn } from "@/lib/utils";

interface UserDetailsProps {
  user: UserType;
}

export default function UserDetailsView({ user }: UserDetailsProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between"
      >
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
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark
              className={cn(
                "h-4 w-4 transition-all",
                isBookmarked ? "fill-amber-500 text-amber-500" : ""
              )}
            />
            {isBookmarked ? "Saved" : "Save"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Star
              className={cn(
                "h-4 w-4 transition-all",
                isFavorite ? "fill-amber-500 text-amber-500" : ""
              )}
            />
            {isFavorite ? "Favorited" : "Favorite"}
          </Button>

          <Button variant="outline" size="icon" className="h-9 w-9">
            <Share2 className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon" className="h-9 w-9">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden border-0 shadow-lg bg-white dark:bg-slate-900">
          <div className="relative">
            {/* Background pattern */}

            <div className="md:flex">
              <div className="md:w-1/3 relative">
                <div className="relative h-80 w-full md:h-full overflow-hidden">
                  <Avatar className="h-full w-full rounded-none">
                    <AvatarImage
                      src={
                        user.image || "/placeholder.svg?height=400&width=400"
                      }
                      alt={`${user.firstName} ${user.lastName}`}
                      className="object-cover"
                    />
                    <AvatarFallback className="text-6xl rounded-none h-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                      {initials}
                    </AvatarFallback>
                  </Avatar>

                  {/* Age badge */}
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full">
                    <span className="text-sm font-medium">
                      {user.age} years old
                    </span>
                  </div>
                </div>
              </div>

              <CardContent className="md:w-2/3 p-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {user.firstName} {user.lastName}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1">
                      <User className="h-4 w-4" />@{user.username}
                    </p>
                  </div>
                  <Badge className="text-sm capitalize bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 px-3 py-1.5">
                    {user.gender}
                  </Badge>
                </div>

                <Tabs defaultValue="personal" className="mt-8">
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="professional">Professional</TabsTrigger>
                    <TabsTrigger value="physical">Physical</TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                          <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                            <Mail className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              Email
                            </p>
                            <p className="font-medium">{user.email}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                          <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                            <Phone className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              Phone
                            </p>
                            <p className="font-medium">{user.phone}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                          <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                            <Calendar className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              Birth Date
                            </p>
                            <p className="font-medium">{user.birthDate}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                          <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mt-1">
                            <MapPin className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              Address
                            </p>
                            <p className="font-medium">
                              {user.address.address}
                            </p>
                            <p className="text-slate-600 dark:text-slate-300">
                              {user.address.city}, {user.address.state}{" "}
                              {user.address.postalCode}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                          <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                            <Globe className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              IP Address
                            </p>
                            <p className="font-medium">{user.ip}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                          <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                            <GraduationCap className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              University
                            </p>
                            <p className="font-medium">{user.university}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="professional" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                          <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                            <Building className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              Company
                            </p>
                            <p className="font-medium">{user.company.name}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                          <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mt-1">
                            <Briefcase className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              Position
                            </p>
                            <p className="font-medium">{user.company.title}</p>
                            <p className="text-slate-600 dark:text-slate-300">
                              {user.company.department}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                          <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mt-1">
                            <MapPin className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              Company Address
                            </p>
                            <p className="font-medium">
                              {user.company.address?.address || "N/A"}
                            </p>
                            <p className="text-slate-600 dark:text-slate-300">
                              {user.company.address?.city || ""},{" "}
                              {user.company.address?.state || ""}{" "}
                              {user.company.address?.postalCode || ""}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                          <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                            <CreditCard className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              Bank
                            </p>
                            <p className="font-medium">{user.bank.cardType}</p>
                            <p className="text-slate-600 dark:text-slate-300">
                              Expires: {user.bank.cardExpire}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                          <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                            <Network className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              Crypto
                            </p>
                            <p className="font-medium">{user.crypto.coin}</p>
                            <p className="text-slate-600 dark:text-slate-300">
                              Network: {user.crypto.network}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="physical" className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                          <Heart className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Hair
                          </p>
                          <div className="flex items-center">
                            <span
                              className="inline-block w-4 h-4 rounded-full mr-2 ring-2 ring-white dark:ring-slate-700"
                              style={{
                                backgroundColor: user.hair.color.toLowerCase(),
                              }}
                            ></span>
                            <p className="font-medium capitalize">
                              {user.hair.color}, {user.hair.type}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                          <Eye className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Eyes
                          </p>
                          <div className="flex items-center">
                            <span
                              className="inline-block w-4 h-4 rounded-full mr-2 ring-2 ring-white dark:ring-slate-700"
                              style={{
                                backgroundColor: user.eyeColor.toLowerCase(),
                              }}
                            ></span>
                            <p className="font-medium capitalize">
                              {user.eyeColor}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                          <Ruler className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Height
                          </p>
                          <p className="font-medium">{user.height} cm</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                          <Weight className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Weight
                          </p>
                          <p className="font-medium">{user.weight} kg</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                          <Heart className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Blood Group
                          </p>
                          <p className="font-medium">{user.bloodGroup}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
