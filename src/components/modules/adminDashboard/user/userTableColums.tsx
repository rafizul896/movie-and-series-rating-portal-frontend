'use client';

import { ColumnDef } from "@tanstack/react-table";
import { IUserType, UserRole, UserStatus } from "@/types/user";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function useUserColumns() {
  const [selectedUser, setSelectedUser] = useState<IUserType | null>(null);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.USER);
  const [selectedStatus, setSelectedStatus] = useState<UserStatus>(UserStatus.ACTIVE);

  const handleRoleModalOpen = (user: IUserType) => {
    setSelectedUser(user);
    setSelectedRole(user.role);
    setRoleModalOpen(true);
  };

  const handleStatusModalOpen = (user: IUserType) => {
    setSelectedUser(user);
    setSelectedStatus(user.status);
    setStatusModalOpen(true);
  };

  const handleRoleChange = () => {
    if (selectedUser) {
      console.log("Updating role to:", selectedRole);
      setRoleModalOpen(false);
    }
  };

  const handleStatusChange = () => {
    if (selectedUser) {
      console.log("Updating status to:", selectedStatus);
      setStatusModalOpen(false);
    }
  };

  // Common modal configuration
  const modalConfig = {
    size: "sm:max-w-[500px]",
    titleClass: "font-bold text-lg mb-4",
    selectClass: "w-full bg-gray-700 border-gray-600 text-white",
    selectContentClass: "bg-gray-800 border-gray-600 text-white",
    selectItemClass: "hover:bg-gray-700",
    buttonClass: "w-full bg-blue-600 hover:bg-blue-700 text-white",
    buttonSize: "sm" as const,
  };

  const columns: ColumnDef<IUserType>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <span className="font-medium text-white">
          {row.original.name}
        </span>
      ),
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
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover border border-gray-600"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white border border-gray-600">
            N/A
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <span className="text-sm text-white">
          {row.original.email}
        </span>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.original.role;
        return (
          <>
            <Badge 
              className={`cursor-pointer w-20 text-xs h-6 text-white ${
                role === "ADMIN" ? "bg-red-600" : "bg-blue-600"
              }`}
              onClick={() => handleRoleModalOpen(row.original)}
            >
              {role}
            </Badge>
            <Dialog open={roleModalOpen && selectedUser?.id === row.original.id} onOpenChange={setRoleModalOpen}>
              <DialogContent className={`${modalConfig.size} bg-gray-800 text-white`}>
                <DialogTitle className={modalConfig.titleClass}>
                  Change Role for {selectedUser?.name}
                </DialogTitle>
                <div className="space-y-4">
                  <Select
                    value={selectedRole}
                    onValueChange={(value: UserRole) => setSelectedRole(value)}
                  >
                    <SelectTrigger className={modalConfig.selectClass}>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent className={modalConfig.selectContentClass}>
                      {Object.values(UserRole).map((role) => (
                        <SelectItem 
                          key={role} 
                          value={role} 
                          className={modalConfig.selectItemClass}
                        >
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    onClick={handleRoleChange}
                    variant={"custom"}
                    className="w-full"
                    size={modalConfig.buttonSize}
                  >
                    Update Role
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const statusColors = {
          ACTIVE: "bg-green-600",
          BLOCKED: "bg-yellow-600",
          DELETED: "bg-red-600"
        };
        return (
          <>
            <Badge 
              className={`cursor-pointer text-xs w-20 h-6 text-white ${statusColors[status]}`}
              onClick={() => handleStatusModalOpen(row.original)}
            >
              {status}
            </Badge>
            <Dialog open={statusModalOpen && selectedUser?.id === row.original.id} onOpenChange={setStatusModalOpen}>
              <DialogContent className={`${modalConfig.size} bg-gray-800 text-white`}>
                <DialogTitle className={modalConfig.titleClass}>
                  Change Status for {selectedUser?.name}
                </DialogTitle>
                <div className="space-y-4">
                  <Select
                    value={selectedStatus}
                    onValueChange={(value: UserStatus) => setSelectedStatus(value)}
                  >
                    <SelectTrigger className={modalConfig.selectClass}>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className={modalConfig.selectContentClass}>
                      {Object.values(UserStatus).map((status) => (
                        <SelectItem 
                          key={status} 
                          value={status} 
                          className={modalConfig.selectItemClass}
                        >
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    onClick={handleStatusChange}
                    variant={"custom"}
                    className="w-full"
                    size={modalConfig.buttonSize}
                  >
                    Update Status
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </>
        );
      },
    },
  ];

  return columns;
}