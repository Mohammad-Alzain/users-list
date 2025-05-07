import { getUsersWithFilters } from "@/modules/users/core/api/users-apis";
import UserDirectory from "@/modules/users/ui/pages/UserDirectory";

export default async function Home() {
  const { users, hairColors } = await getUsersWithFilters();

  return <UserDirectory initialUsers={users} hairColors={hairColors} />;
}
