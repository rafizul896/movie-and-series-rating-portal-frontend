'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteOrderHistory } from "@/services/purchase";

interface DeleteOrderHistoryDialogProps {
  open: boolean;
  onClose: () => void;
  id: string;
  name?: string;
}

export function DeleteOrderHistoryDialog({
  open,
  onClose,
  id,
  name,
}: DeleteOrderHistoryDialogProps) {
  const router = useRouter();

  const handleConfirm = async () => {
    try {
      const result = await deleteOrderHistory(id);

      if (result instanceof Error) {
        throw result;
      }

      if (result.success) {
        toast.success(result.message || `Order ${name || "history"} deleted successfully`);
        router.refresh();
      } else {
        toast.error(result.message || "Could not delete order");
      }
    } catch (error) {
      console.error("Delete order error:", error);
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border border-gray-800 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl text-red-500">Confirm Deletion</DialogTitle>
        </DialogHeader>
        <p className="text-gray-300 text-sm mt-2">
          This action cannot be undone. Are you sure you want to delete {name ? `"${name}"` : "this order"}?
        </p>
        <DialogFooter className="mt-6 flex justify-end space-x-3">
          <Button 
            variant="ghost" 
            onClick={onClose}
            className="text-gray-300 hover:text-gray-200 hover:bg-gray-800"
          >
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}