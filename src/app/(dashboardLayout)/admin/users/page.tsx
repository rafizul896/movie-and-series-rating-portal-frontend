// app/admin/users/page.tsx

import { UserTable } from "@/components/modules/adminDashboard/user/userTable";

export default async function ManageUsersPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl text-center font-bold mb-6">User Management</h1>
      <UserTable/>
    </div>
  );
}