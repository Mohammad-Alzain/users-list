"use client";

import type React from "react";

import { useState, useCallback, useEffect } from "react";
import { Search, Filter, Loader2, X } from "lucide-react";
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
import { User } from "../../core/types";
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

  return (
    <div className="space-y-8">
      {/* Search and Filter Section */}
      <Card className="p-4 shadow-md">
        <div className="md:flex md:space-x-4">
          {/* Search Input */}
          <div className="relative flex-1 mb-4 md:mb-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>

          {/* Hair Color Filter */}
          <div className="relative md:w-64">
            <Select
              value={selectedHairColor}
              onValueChange={handleHairColorChange}
            >
              <SelectTrigger className="w-full">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2 text-gray-400" />
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

          {/* Clear Filters Button */}
          {activeFilters.length > 0 && (
            <Button
              onClick={clearFilters}
              variant="outline"
              className="mt-4 md:mt-0 w-full md:w-auto"
            >
              Clear All Filters
            </Button>
          )}
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <Badge
                key={filter}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {filter}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeFilter(filter)}
                />
              </Badge>
            ))}
          </div>
        )}
      </Card>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex justify-center my-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        </div>
      )}

      {/* Error Message */}
      {error && !isLoading && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md my-6">
          <p>{error}</p>
        </div>
      )}

      {/* No Results Message */}
      {!isLoading && !error && users.length === 0 && (
        <div className="text-center my-12">
          <p className="text-lg text-gray-600">
            No users found matching your criteria.
          </p>
          <Button onClick={clearFilters} className="mt-4">
            Clear Filters
          </Button>
        </div>
      )}

      {/* User Grid */}
      {!isLoading && !error && users.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}
