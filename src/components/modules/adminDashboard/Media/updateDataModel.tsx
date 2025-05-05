"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UpdateMovie from "./UpdateMovie";

interface UpdateDataModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function UpdateDataModal({
  open,
  setOpen,
}: UpdateDataModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="bg-white text-black max-h-[90vh] overflow-y-auto rounded-lg p-6"
      >
        <DialogHeader>
          <DialogTitle className="text-center capitalize">
            Update Movie
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <UpdateMovie movieId={""} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
