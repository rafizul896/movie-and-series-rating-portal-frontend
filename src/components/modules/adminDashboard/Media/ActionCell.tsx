/* eslint-disable @typescript-eslint/no-unused-vars */
// components/ActionCell.tsx
"use client";

import { SquarePen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Movie } from "./columns";
import UpdateDataModal from "./updateDataModel";

export function ActionCell({ media }: { media: Movie }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        variant={"custom"}
        className="cursor-pointer hover:underline"
      >
        <Trash2 />
      </Button>

      <UpdateDataModal open={isModalOpen} setOpen={setIsModalOpen} />
    </div>
  );
}