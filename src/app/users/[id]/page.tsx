import {
  getUserById,
  getUsersWithFilters,
} from "@/modules/users/core/api/users-apis";
import UserDetailsView from "@/modules/users/ui/pages/UserDetails";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: any;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { id } = await props.params;
  try {
    if (!id) {
      return {
        title: "User Not Found",
      };
    }

    const user = await getUserById(id);

    if (!user) {
      return {
        title: "User Not Found",
      };
    }

    return {
      title: `${user.firstName} ${user.lastName}'s Profile` || "User Profile",
      description: `View the profile of ${user.firstName} ${user.lastName}. ${
        user.username || ""
      }`,
      openGraph: {
        title: `${user.firstName} ${user.lastName}'s Profile` || "User Profile",
        description: `View the profile of ${user.firstName} ${user.lastName}. ${
          user.username || ""
        }`,
        images: user.image ? [{ url: user.image }] : [],
        type: "profile",
      },
      twitter: {
        card: "summary",
        title: `${user.firstName} ${user.lastName}'s Profile` || "User Profile",
        description: `View the profile of ${user.firstName} ${user.lastName}. ${
          user.username || ""
        }`,
        images: user.image ? [{ url: user.image }] : [],
      },
    };
  } catch (error) {
    return {
      title: "User Profile",
      description: "View user profile information",
    };
  }
}

export default async function UserDetailsPage({ params }: { params: any }) {
  try {
    const { id } = await params;
    if (!id) {
      notFound();
    }

    const user = await getUserById(id);

    if (!user) {
      notFound();
    }

    return <UserDetailsView user={user} />;
  } catch (error) {
    console.error(`Failed to fetch user with ID ${params.id}:`, error);
    notFound();
  }
}

export async function generateStaticParams() {
  const { users } = await getUsersWithFilters();

  // Generate paths for the first 20 users (or all if less than 20)
  return users.slice(0, 20).map((user) => ({
    id: user.id.toString(),
  }));
}
