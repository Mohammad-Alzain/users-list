import { getUsersWithFilters } from "@/modules/users/core/api/users-apis";
import UserDirectory from "@/modules/users/ui/components/UserDirectory";

export default async function Home() {
  const { users, hairColors } = await getUsersWithFilters();

  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-center">User Directory</h1>
      <UserDirectory initialUsers={users} hairColors={hairColors} />
    </>
  );
}
