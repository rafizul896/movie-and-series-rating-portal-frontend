// app/admin/users/page.tsx

import { UserTable } from "@/components/modules/adminDashboard/user/userTable";
import { getAllUser } from "@/services/user";

export default async function ManageUsersPage() {
const { data } = await getAllUser();
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl text-center font-bold mb-6">User Management</h1>
      <UserTable data={data} />
    </div>
  );
}