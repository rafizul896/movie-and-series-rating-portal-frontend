'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { IUserType } from '@/types/user';

interface Props {
  open: boolean;
  user: IUserType | null;
  onClose: () => void;
}

export default function UserStatusModal({ open, user, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <h2 className="text-lg font-semibold">Change Status</h2>
        <p>User: {user?.name}</p>
        {/* Optional: Status change dropdown or input */}
        <p className="text-sm text-gray-500 mt-2">Status change functionality goes here.</p>
      </DialogContent>
    </Dialog>
  );
}
