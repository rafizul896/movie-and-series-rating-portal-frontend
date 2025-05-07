'use client';

import { ColumnDef } from "@tanstack/react-table";
import { IUserType } from "@/types/user";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { DeleteUserDialog } from "./DeleteUserDialog";

export function useUserColumns() {
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<{ id: string; name?: string } | null>(null);

  const handleDelete = (user: IUserType) => {
    setSelectedUser({ id: user.id, name: user.name });
    setOpenDialogId(user.id);
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
      size: 150, // Reduced column width
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
      size: 70, // Reduced column width
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <span className="text-sm text-white line-clamp-1">
          {row.original.email}
        </span>
      ),
      size: 200, // Reduced column width
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <span 
         
          className="text-xs h-5 px-2 font-normal"
        >
          {row.original.role}
        </span>
      ),
      size: 100, // Reduced column width
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const isDeleted = status.toLowerCase() === 'deleted';
        
        return (
          <Badge 
            className={`text-xs h-5 px-2 ${
              isDeleted 
                ? 'bg-red-900/50 text-red-400 border-red-800' 
                : 'bg-green-900/50 text-green-400 border-green-800'
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
        const isDeleted = user.status.toLowerCase() === 'deleted';
        
        return (
          <div className="flex justify-center">
            {!isDeleted && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(user)}
                className="cursor-pointer h-7 w-7 p-0 hover:bg-red-700"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            )}

            {openDialogId === user.id && (
              <DeleteUserDialog
                open={openDialogId === user.id}
                onClose={() => setOpenDialogId(null)}
                id={user.id}
                name={user.name}
              />
            )}
          </div>
        );
      },
      size: 60, // Reduced column width
    },
  ];

  return columns;
}