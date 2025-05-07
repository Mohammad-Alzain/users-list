import { User } from "../types";

const API_BASE_URL = "https://dummyjson.com";

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

// Get all users with hair colors for filtering
export async function getUsersWithFilters(): Promise<{
  users: User[];
  hairColors: string[];
}> {
  try {
    const response = await fetch(`${API_BASE_URL}/users?limit=100`);
    const data = await handleResponse<{ users: User[] }>(response);

    // Extract unique hair colors for the filter
    const hairColors = Array.from(
      new Set(data.users.map((user) => user.hair.color))
    );

    return {
      users: data.users,
      hairColors,
    };
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return {
      users: [],
      hairColors: [],
    };
  }
}

// Get a single user by ID
export async function getUserById(id: string): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    return await handleResponse<User>(response);
  } catch (error) {
    console.error(`Failed to fetch user with ID ${id}:`, error);
    return null;
  }
}

// Search users by query
export async function searchUsers(query: string): Promise<User[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/users/search?q=${encodeURIComponent(query)}`
    );
    const data = await handleResponse<{ users: User[] }>(response);
    return data.users;
  } catch (error) {
    console.error("Failed to search users:", error);
    throw error;
  }
}

// Filter users by hair color
export async function filterUsersByHairColor(color: string): Promise<User[]> {
  try {
    // The API doesn't directly support filtering by hair color, so we need to get all users and filter
    const { users } = await getUsersWithFilters();
    return users.filter(
      (user) => user.hair.color.toLowerCase() === color.toLowerCase()
    );
  } catch (error) {
    console.error("Failed to filter users by hair color:", error);
    throw error;
  }
}

// Combined search and filter
export async function searchAndFilterUsers(
  query?: string,
  hairColor?: string
): Promise<User[]> {
  try {
    let users: User[];

    // First apply search if provided
    if (query) {
      users = await searchUsers(query);
    } else {
      const { users: allUsers } = await getUsersWithFilters();
      users = allUsers;
    }

    // Then apply hair color filter if provided
    if (hairColor) {
      users = users.filter(
        (user) => user.hair.color.toLowerCase() === hairColor.toLowerCase()
      );
    }

    return users;
  } catch (error) {
    console.error("Failed to search and filter users:", error);
    throw error;
  }
}
