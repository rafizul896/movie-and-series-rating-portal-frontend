'use client';

import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  currentRole: string;
  userName?: string;
}

export function ChangeRoleDialog({ open, onClose, onConfirm, currentRole, userName }: Props) {
  const nextRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN';

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-gray-300 bg-gray-800">
        <DialogHeader>
          <DialogTitle>Change Role</DialogTitle>
        </DialogHeader>

        <div className="text-sm ">
          Are you sure you want to change <span className="font-semibold">{userName}</span> role to <span className="text-red-400">{nextRole}</span>?
        </div>

        <DialogFooter>
          <Button variant="outline" className="text-gray-800"  onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-red-600 hover:bg-red-700" onClick={onConfirm}>
            Yes, Change
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
