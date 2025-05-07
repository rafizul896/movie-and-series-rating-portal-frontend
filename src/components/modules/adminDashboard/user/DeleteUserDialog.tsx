'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deletedUser } from "@/services/user";


interface DeleteUserDialogProps {
  open: boolean;
  onClose: () => void;
  id: string;
  name?: string;
}

export function DeleteUserDialog({ open, onClose, id, name }: DeleteUserDialogProps) {
  const router = useRouter();

  const handleConfirm = async () => {
    try {
      const result = await deletedUser(id);
      
      if (result instanceof Error) {
        throw result;
      }

      if (result.success) {
        toast.success(result.message || `User ${name || ''} deleted successfully`);
        router.push("/admin/users");
        router.refresh();
      } else {
        toast.error(result.message || "Could not delete user");
      }
    } catch (error) {
      console.error("Delete user error:", error);
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white">Are you sure?</DialogTitle>
        </DialogHeader>
        <p className="text-gray-300 text-sm">
          This action cannot be undone. Do you really want to delete {name ? `"${name}"` : "this user"}?
        </p>
        <DialogFooter className="mt-4">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Confirm Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}