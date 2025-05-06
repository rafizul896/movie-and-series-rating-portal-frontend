/* eslint-disable @typescript-eslint/no-unused-vars */
// components/ActionCell.tsx
"use client";

import { SquarePen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Movie } from "./columns";
import UpdateDataModal from "./updateDataModel";
import Swal from "sweetalert2";

export function ActionCell({ media }: { media: Movie }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // Add your delete logic here
        console.log("Deleting media:", media.id);
        
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => setIsModalOpen(true)}
        variant="ghost"
        className="cursor-pointer text-blue-500 hover:underline"
      >
        <SquarePen />
      </Button>
      <Button
        variant="ghost"
        className="cursor-pointer text-red-500 hover:underline"
        onClick={handleDelete}
      >
        <Trash2 />
      </Button>

      <UpdateDataModal open={isModalOpen} setOpen={setIsModalOpen} />
    </div>
  );
}