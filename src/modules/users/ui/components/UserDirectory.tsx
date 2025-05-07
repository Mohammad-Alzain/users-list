"use client";

import type React from "react";
import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Loader2,
  X,
  ChevronDown,
  SlidersHorizontal,
  Users,
  UserPlus,
  Download,
  Upload,
  RefreshCw,
} from "lucide-react";
import debounce from "lodash.debounce";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { User } from "../../core/types";
import { filterUsersByHairColor, searchUsers } from "../../core/api/users-apis";
import UserCard from "./UserCard";

interface UserDirectoryProps {
  initialUsers: User[];
  hairColors: string[];
}

export default function UserDirectory({
  initialUsers,
  hairColors,
}: UserDirectoryProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHairColor, setSelectedHairColor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("default");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Update active filters when search or hair color changes
  useEffect(() => {
    const filters = [];
    if (searchTerm) filters.push(`Search: ${searchTerm}`);
    if (selectedHairColor) filters.push(`Hair: ${selectedHairColor}`);
    setActiveFilters(filters);
  }, [searchTerm, selectedHairColor]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (term: string) => {
      if (!term) {
        // If search term is empty and no hair color filter, reset to initial users
        if (!selectedHairColor) {
          setUsers(initialUsers);
        } else {
          // If hair color is selected, apply only that filter
          await applyHairColorFilter(selectedHairColor);
        }
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const searchedUsers = await searchUsers(term);

        // If hair color filter is active, filter the search results
        if (selectedHairColor) {
          setUsers(
            searchedUsers.filter(
              (user) =>
                user.hair.color.toLowerCase() ===
                selectedHairColor.toLowerCase()
            )
          );
        } else {
          setUsers(searchedUsers);
        }
      } catch (err) {
        console.error("Search error:", err);
        setError("Failed to search users. Please try again.");
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    }, 500),
    [initialUsers, selectedHairColor]
  );

  // Apply hair color filter
  const applyHairColorFilter = async (color: string) => {
    if (!color) {
      // If no color is selected and no search term, reset to initial users
      if (!searchTerm) {
        setUsers(initialUsers);
      } else {
        // If search term exists, re-apply search
        await debouncedSearch(searchTerm);
      }
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // If search term exists, filter the current results
      if (searchTerm) {
        const searchedUsers = await searchUsers(searchTerm);
        setUsers(
          searchedUsers.filter(
            (user) => user.hair.color.toLowerCase() === color.toLowerCase()
          )
        );
      } else {
        // Otherwise, get all users with the selected hair color
        const filteredUsers = await filterUsersByHairColor(color);
        setUsers(filteredUsers);
      }
    } catch (err) {
      console.error("Filter error:", err);
      setError("Failed to filter users. Please try again.");
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsLoading(true);
    debouncedSearch(value);
  };

  // Handle hair color filter change
  const handleHairColorChange = (value: string) => {
    setSelectedHairColor(value);
    applyHairColorFilter(value);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedHairColor("");
    setUsers(initialUsers);
    setError(null);

    // Focus the search input after clearing
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Remove a specific filter
  const removeFilter = (filter: string) => {
    if (filter.startsWith("Search:")) {
      setSearchTerm("");
      if (selectedHairColor) {
        applyHairColorFilter(selectedHairColor);
      } else {
        setUsers(initialUsers);
      }
    } else if (filter.startsWith("Hair:")) {
      setSelectedHairColor("");
      if (searchTerm) {
        debouncedSearch(searchTerm);
      } else {
        setUsers(initialUsers);
      }
    }
  };

  // Sort users
  const sortUsers = (sortOption: string) => {
    setSortBy(sortOption);

    const sortedUsers = [...users];

    switch (sortOption) {
      case "name-asc":
        sortedUsers.sort((a, b) =>
          `${a.firstName} ${a.lastName}`.localeCompare(
            `${b.firstName} ${b.lastName}`
          )
        );
        break;
      case "name-desc":
        sortedUsers.sort((a, b) =>
          `${b.firstName} ${b.lastName}`.localeCompare(
            `${a.firstName} ${a.lastName}`
          )
        );
        break;
      case "age-asc":
        sortedUsers.sort((a, b) => a.age - b.age);
        break;
      case "age-desc":
        sortedUsers.sort((a, b) => b.age - a.age);
        break;
      case "city-asc":
        sortedUsers.sort((a, b) =>
          a.address.city.localeCompare(b.address.city)
        );
        break;
      default:
        // Default sorting (by ID)
        sortedUsers.sort((a, b) => a.id - b.id);
    }

    setUsers(sortedUsers);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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
    <div className="space-y-8">
      {/* Header with stats */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-6 rounded-xl">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            User Directory
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-1">
            Browse and manage user profiles
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-sm">
            <Users className="h-5 w-5 text-indigo-500" />
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Total Users
              </p>
              <p className="font-semibold">{initialUsers.length}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-sm">
            <Filter className="h-5 w-5 text-indigo-500" />
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Filtered
              </p>
              <p className="font-semibold">{users.length}</p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5">
                <SlidersHorizontal className="h-4 w-4" />
                Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>User Management</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add New User
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Export Users
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Upload className="h-4 w-4 mr-2" />
                  Import Users
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Data
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Search and Filter Section */}
      <Card className="p-5 shadow-md border-0 bg-white dark:bg-slate-900">
        <div className="space-y-4">
          <div className="md:flex md:space-x-4">
            {/* Search Input */}
            <div className="relative flex-1 mb-4 md:mb-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <Input
                type="text"
                placeholder="Search by name, email, username..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                ref={searchInputRef}
              />
              {searchTerm && (
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => {
                    setSearchTerm("");
                    if (selectedHairColor) {
                      applyHairColorFilter(selectedHairColor);
                    } else {
                      setUsers(initialUsers);
                    }
                  }}
                >
                  <X className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                </button>
              )}
            </div>

            {/* Hair Color Filter */}
            <div className="relative md:w-64">
              <Select
                value={selectedHairColor}
                onValueChange={handleHairColorChange}
              >
                <SelectTrigger className="w-full border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2 text-slate-400" />
                    <SelectValue placeholder="Filter by hair color" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All hair colors</SelectItem>
                  {hairColors.map((color) => (
                    <SelectItem key={color} value={color}>
                      <div className="flex items-center">
                        <span
                          className="inline-block w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: color.toLowerCase() }}
                        ></span>
                        {color}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort By */}
            <div className="relative md:w-64 mt-4 md:mt-0">
              <Select value={sortBy} onValueChange={sortUsers}>
                <SelectTrigger className="w-full border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                  <div className="flex items-center">
                    <ChevronDown className="h-4 w-4 mr-2 text-slate-400" />
                    <SelectValue placeholder="Sort by" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  <SelectItem value="age-asc">Age (Low to High)</SelectItem>
                  <SelectItem value="age-desc">Age (High to Low)</SelectItem>
                  <SelectItem value="city-asc">City (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters Button */}
            {activeFilters.length > 0 && (
              <Button
                onClick={clearFilters}
                variant="outline"
                className="mt-4 md:mt-0 w-full md:w-auto border-slate-300 dark:border-slate-700 hover:bg-indigo-50 hover:text-indigo-700 dark:hover:bg-slate-800"
              >
                Clear All Filters
              </Button>
            )}
          </div>

          {/* View Mode Tabs */}
          <div className="flex justify-between items-center">
            {/* Active Filters */}
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <Badge
                  key={filter}
                  variant="secondary"
                  className="flex items-center gap-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 px-3 py-1"
                >
                  {filter}
                  <X
                    className="h-3 w-3 cursor-pointer ml-1"
                    onClick={() => removeFilter(filter)}
                  />
                </Badge>
              ))}
            </div>

            {/* View Mode Toggle */}
            <Tabs
              value={viewMode}
              onValueChange={(value) => setViewMode(value as "grid" | "list")}
              className="w-auto"
            >
              <TabsList className="bg-slate-100 dark:bg-slate-800">
                <TabsTrigger
                  value="grid"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
                >
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
                    className="lucide lucide-grid-2x2"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M3 12h18" />
                    <path d="M12 3v18" />
                  </svg>
                </TabsTrigger>
                <TabsTrigger
                  value="list"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
                >
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
                    className="lucide lucide-list"
                  >
                    <line x1="8" x2="21" y1="6" y2="6" />
                    <line x1="8" x2="21" y1="12" y2="12" />
                    <line x1="8" x2="21" y1="18" y2="18" />
                    <line x1="3" x2="3.01" y1="6" y2="6" />
                    <line x1="3" x2="3.01" y1="12" y2="12" />
                    <line x1="3" x2="3.01" y1="18" y2="18" />
                  </svg>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </Card>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex justify-center my-12">
          <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
        </div>
      )}

      {/* Error Message */}
      {error && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg my-6 shadow-sm"
        >
          <p className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
            {error}
          </p>
        </motion.div>
      )}

      {/* No Results Message */}
      {!isLoading && !error && users.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center my-16 bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/50 mb-4">
            <Users className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <p className="text-xl font-medium text-slate-700 dark:text-slate-300 mb-3">
            No users found matching your criteria
          </p>
          <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
            Try adjusting your search or filter parameters to find what you're
            looking for.
          </p>
          <Button
            onClick={clearFilters}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Clear Filters
          </Button>
        </motion.div>
      )}

      {/* User Grid */}
      {!isLoading && !error && users.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "flex flex-col gap-4"
          }
        >
          <AnimatePresence>
            {users.map((user) => (
              <motion.div key={user.id} variants={itemVariants} layout>
                <UserCard user={user} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
