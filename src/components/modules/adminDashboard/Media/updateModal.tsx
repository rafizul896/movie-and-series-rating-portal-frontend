"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddMovie from "./AddMovie";

interface UpdateModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function UpdateModal({ open, setOpen }: UpdateModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="bg-white text-black max-h-[90vh] overflow-y-auto rounded-lg p-6"
      >
        <DialogHeader>
          {/* Optional Header */}
          <DialogTitle className="text-center">Add New Movie</DialogTitle>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="space-y-4">
          <AddMovie />
        </div>
      </DialogContent>
    </Dialog>
  );
}
