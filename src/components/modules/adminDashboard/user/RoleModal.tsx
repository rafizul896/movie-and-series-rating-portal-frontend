import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { IUserType, UserRole } from "@/types/user";

interface RoleModalProps {
  open: boolean;
  user: IUserType | null;
  selectedRole: UserRole;
  setSelectedRole: React.Dispatch<React.SetStateAction<UserRole>>;
  onClose: () => void;
  onUpdate: () => void;
}

const RoleModal = ({
  open,
  user,
  selectedRole,
  setSelectedRole,
  onClose,
  onUpdate,
}: RoleModalProps) => {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-gray-800 text-white">
        <DialogTitle className="font-bold text-lg mb-4">
          Change Role for {user.name}
        </DialogTitle>
        <div className="space-y-4">
          <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value)}>
            <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600 text-white">
              {Object.values(UserRole).map((role) => (
                <SelectItem key={role} value={role} className="hover:bg-gray-700">
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={onUpdate} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Update Role
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoleModal;
