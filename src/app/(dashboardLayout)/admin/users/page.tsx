// app/admin/users/page.tsx
"use client";
import { UserTable } from "@/components/modules/adminDashboard/user/userTable";
import { IUserType, UserRole, UserStatus } from "@/types/user";
import { useState, useEffect } from "react";

async function getData(): Promise<IUserType[]> {
  return [
    {
      id: "1",
      name: "Admin User",
      email: "admin@example.com",
      profileImage: "/images/admin-avatar.jpg",
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
      password: "", // Add missing property
      createdAt: new Date().toISOString(), // Add missing property
      updatedAt: new Date().toISOString(), // Add missing property
    },
    {
      id: "2",
      name: "Regular User",
      email: "user@example.com",
      profileImage: "",
      role: UserRole.USER,
      status: UserStatus.ACTIVE,
      password: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Blocked User",
      email: "blocked@example.com",
      profileImage: "/images/blocked-avatar.jpg",
      role: UserRole.USER,
      status: UserStatus.BLOCKED,
      password: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "4",
      name: "Deleted User",
      email: "deleted@example.com",
      profileImage: "",
      role: UserRole.USER,
      status: UserStatus.DELETED,
      password: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
}

export default function ManageUsersPage() {
  const [data, setData] = useState<IUserType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getData();
      setData(fetchedData);
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl text-center font-bold mb-6">User Management</h1>
      <UserTable data={data} />
    </div>
  );
}