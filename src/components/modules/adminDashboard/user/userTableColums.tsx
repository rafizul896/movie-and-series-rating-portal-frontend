/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IUserType } from "@/types/user";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { DeleteUserDialog } from "./DeleteUserDialog";
import { ChangeRoleDialog } from "./ChangeRoleDialog";
import { updateUserRole } from "@/services/user";

export function useUserColumns() {
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    name?: string;
  } | null>(null);

  const [openRoleDialogId, setOpenRoleDialogId] = useState<string | null>(null);
  const [currentRoleUser, setCurrentRoleUser] = useState<IUserType | null>(
    null
  );

  const handleDelete = (user: IUserType) => {
    setSelectedUser({ id: user.id, name: user.name });
    setOpenDialogId(user.id);
  };

  const handleOpenRoleDialog = (user: IUserType) => {
    setCurrentRoleUser(user);
    setOpenRoleDialogId(user.id);
  };

  const handleConfirmRoleChange = async () => {
    if (!currentRoleUser) return;

    const newRole = currentRoleUser.role === "ADMIN" ? "USER" : "ADMIN";
    try {
      const res = await updateUserRole(currentRoleUser.id, {
        role: newRole,
      });

      console.log("Updated role response:", res);
      setOpenRoleDialogId(null);
    } catch (error) {
      console.error(error);
      alert("Failed to change role");
    }
  };

  const columns: ColumnDef<IUserType>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <span className="font-medium text-white line-clamp-1">
          {row.original.name}
        </span>
      ),
      size: 150,
    },
    {
      accessorKey: "profileImage",
      header: "Profile",
      cell: ({ row }) => {
        const url = row.original.profileImage;
        return url ? (
          <Image
            src={url}
            alt="Profile"
            width={28}
            height={28}
            className="h-7 w-7 rounded-full object-cover border border-gray-600"
          />
        ) : (
          <div className="h-7 w-7 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white border border-gray-600">
            N/A
          </div>
        );
      },
      size: 70,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <span className="text-sm text-white line-clamp-1">
          {row.original.email}
        </span>
      ),
      size: 200,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <span className="text-xs h-5 px-2 font-normal">
          {row.original.role}
        </span>
      ),
      size: 100,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const isDeleted = status.toLowerCase() === "deleted";

        return (
          <Badge
            className={`text-xs h-5 px-2 ${
              isDeleted
                ? "bg-red-900/50 text-red-400 border-red-800"
                : "bg-green-900/50 text-green-400 border-green-800"
            }`}
            variant="outline"
          >
            {status}
          </Badge>
        );
      },
      size: 100,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original;
        const isDeleted = user.status.toLowerCase() === "deleted";

        return (
          <div className="flex justify-center gap-5">
            {!isDeleted && (
              <Button
                size="sm"
                onClick={() => handleDelete(user)}
                className="cursor-pointer h-7 w-7 p-0 hover:bg-red-700"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            )}

            <Button
              size="sm"
              variant={"customOutlined"}
              onClick={() => handleOpenRoleDialog(user)}
              className="cursor-pointer"
            >
              Change Role
            </Button>

            {openDialogId === user.id && (
              <DeleteUserDialog
                open={openDialogId === user.id}
                onClose={() => setOpenDialogId(null)}
                id={user.id}
                name={user.name}
              />
            )}

            {/* Role change confirmation dialog */}
            {openRoleDialogId === user.id && currentRoleUser && (
              <ChangeRoleDialog
                open={openRoleDialogId === user.id}
                onClose={() => setOpenRoleDialogId(null)}
                onConfirm={() => handleConfirmRoleChange()}
                currentRole={currentRoleUser.role}
                userName={currentRoleUser.name}
              />
            )}
          </div>
        );
      },
      size: 60,
    },
  ];

  return columns;
}
