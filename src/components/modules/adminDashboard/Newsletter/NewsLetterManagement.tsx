"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Edit,
  Eye,
  Mail,
  Plus,
  Send,
  Trash,
  FileText,
  Users,
  SendIcon,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  createNewsletter,
  deleteNewsletter,
  sendNewsletter,
  updateNewsletter,
} from "@/services/newsletter";
import NewsletterStats from "./NewsletterStats";
import { TNewsletter } from "@/types/newsletter.type";

export default function Newsletter({
  newslettersData = [],
}: {
  newslettersData?: TNewsletter[];
}) {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedNewsletter, setSelectedNewsletter] =
    useState<TNewsletter | null>(null);
  const [newNewsletter, setNewNewsletter] = useState<Partial<TNewsletter>>({
    title: "",
    subject: "",
    content: "",
    isScheduled: false,
    scheduledAt: null,
    status: "DRAFT",
    recipientCount: 0,
  });

  const resetForm = () => {
    setNewNewsletter({
      title: "",
      subject: "",
      content: "",
      isScheduled: false,
      scheduledAt: null,
      status: "DRAFT",
      recipientCount: 0,
    });
  };

  const handleCreateNewsletter = async () => {
    const newsletter: Omit<TNewsletter, "id" | "createdAt"> = {
      title: newNewsletter.title!,
      subject: newNewsletter.subject!,
      content: newNewsletter.content!,
      status: newNewsletter.isScheduled ? "SCHEDULED" : "DRAFT",
      recipientCount: 0,
      scheduledAt: newNewsletter.isScheduled ? newNewsletter.scheduledAt : null,
      sentAt: null,
    };

    try {
      const response = await createNewsletter(newsletter);
      if (response?.success) {
        toast.success(response?.message || "Newsletter created successfully");
      } else {
        toast.error(response?.message || "Failed to create newsletter");
      }
    } catch {
      toast.error("Failed to create newsletter");
    }
    resetForm();
    setCreateModalOpen(false);
  };

  const handleUpdateNewsletter = async () => {
    if (!newNewsletter.id) return;

    const updateData = {
      title: newNewsletter.title,
      subject: newNewsletter.subject,
      content: newNewsletter.content,
      isScheduled: newNewsletter.isScheduled,
      scheduledAt: newNewsletter.isScheduled ? newNewsletter.scheduledAt : null,
      status:
        newNewsletter.status === "SENT"
          ? "SENT"
          : newNewsletter.isScheduled
          ? "SCHEDULED"
          : "DRAFT",
    };

    try {
      const response = await updateNewsletter(newNewsletter.id, updateData);
      if (response?.success) {
        toast.success(response?.message || "Newsletter updated successfully");
      } else {
        toast.error(response?.message || "Failed to update newsletter");
      }
    } catch {
      toast.error("Failed to update newsletter");
    }
    setEditModalOpen(false);
    setSelectedNewsletter(null);
  };

  const openEditModal = (newsletter: TNewsletter) => {
    setNewNewsletter(newsletter);
    setEditModalOpen(true);
  };

  const openViewModal = (newsletter: TNewsletter) => {
    setSelectedNewsletter(newsletter);
    setViewModalOpen(true);
  };

  const sendNewsLetterToUser = async (id: string) => {
    setLoading(true);
    try {
      const response = await sendNewsletter(id);
      if (response?.success) {
        toast.success(
          response?.message || "Newsletter sent to users successfully"
        );
      } else {
        toast.error(response?.message || "Failed to send newsletter");
      }
    } catch {
      toast.error("Failed to send newsletter");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNewsletter = async (id: string) => {
    try {
      const response = await deleteNewsletter(id);
      if (response?.success) {
        toast.success(response?.message || "Newsletter deleted successfully");
        setDeleteModal(false);
      } else {
        toast.error(response?.message || "Failed to delete newsletter");
      }
    } catch {
      toast.error("Failed to delete newsletter");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SENT":
        return "bg-red-800/20 text-red-400 border-red-900";
      case "SCHEDULED":
        return "bg-red-800/20 text-red-400 border-red-900";
      case "DRAFT":
        return "bg-gray-800/20 text-gray-400 border-gray-900";
      default:
        return "bg-gray-800/20 text-gray-400 border-gray-900";
    }
  };

  return (
    <div className="p-6 bg-black min-h-screen">
      <div className="container mx-auto overflow-x-auto">
        <div className="my-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold mb-6 text-white ">
              Manage Newsletters
            </h2>
            <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700 transition-transform hover:scale-105 shadow-lg shadow-red-500/20"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Create Newsletter
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-gray-900 border-gray-800 text-white">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-red-400">
                    <Mail className="h-5 w-5" />
                    Create New Newsletter
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300">Title</Label>
                      <Input
                        className="bg-gray-800 border-gray-700 text-white focus:ring-red-500"
                        placeholder="Newsletter title"
                        value={newNewsletter.title}
                        onChange={(e) =>
                          setNewNewsletter({
                            ...newNewsletter,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-300">Subject Line</Label>
                      <Input
                        className="bg-gray-800 border-gray-700 text-white focus:ring-red-500"
                        placeholder="Email subject"
                        value={newNewsletter.subject}
                        onChange={(e) =>
                          setNewNewsletter({
                            ...newNewsletter,
                            subject: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">Content</Label>
                    <Textarea
                      className="min-h-[200px] bg-gray-800 border-gray-700 text-white focus:ring-red-500"
                      placeholder="Write your newsletter content..."
                      value={newNewsletter.content}
                      onChange={(e) =>
                        setNewNewsletter({
                          ...newNewsletter,
                          content: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
                    <Switch
                      checked={newNewsletter.isScheduled}
                      onCheckedChange={(checked) =>
                        setNewNewsletter({
                          ...newNewsletter,
                          isScheduled: checked,
                        })
                      }
                      className="data-[state=checked]:bg-red-500"
                    />
                    <Label className="text-gray-300">Schedule for later</Label>
                    {newNewsletter.isScheduled && (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                            size="sm"
                          >
                            <Calendar className="mr-2 h-4 w-4 text-red-400" />
                            {newNewsletter.scheduledAt
                              ? format(newNewsletter.scheduledAt, "PPP")
                              : "Pick date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="bg-gray-900 border-gray-800">
                          <CalendarComponent
                            mode="single"
                            selected={newNewsletter.scheduledAt ?? undefined}
                            onSelect={(date) =>
                              setNewNewsletter({
                                ...newNewsletter,
                                scheduledAt: date ?? null,
                              })
                            }
                            className="text-white"
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    className="bg-gray-800 text-white hover:bg-gray-700 border-gray-700"
                    onClick={() => setCreateModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-red-600 hover:bg-red-700"
                    onClick={handleCreateNewsletter}
                  >
                    {newNewsletter.isScheduled
                      ? "Schedule Newsletter"
                      : "Save Draft"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <NewsletterStats newslettersData={newslettersData} />

        <Card className="border-gray-800 bg-gray-900 shadow-xl">
          <CardHeader className="border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-destructive flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Newsletter History
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your past and scheduled communications
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-800">
                  <TableRow className="hover:bg-gray-800 border-gray-800">
                    <TableHead className="text-gray-300">Title</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Recipients</TableHead>
                    <TableHead className="text-gray-300">Created</TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {newslettersData?.map((newsletter) => (
                    <TableRow
                      key={newsletter.id}
                      className="border-gray-800 hover:bg-gray-800/50"
                    >
                      <TableCell>
                        <div>
                          <div className="font-medium text-gray-100">
                            {newsletter.title}
                          </div>
                          <div className="text-sm text-gray-400 truncate max-w-xs">
                            {newsletter.subject}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${getStatusColor(
                            newsletter.status
                          )} font-medium py-1`}
                          variant="outline"
                        >
                          {newsletter.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-red-400" />
                          <span className="font-medium text-gray-300">
                            {newsletter.recipientCount.toLocaleString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-400">
                        {newsletter.createdAt
                          ? format(newsletter.createdAt, "MMM dd, yyyy")
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openViewModal(newsletter)}
                            className="h-8 w-8 p-0 hover:bg-red-500/20"
                          >
                            <Eye className="h-4 w-4 text-red-400" />
                          </Button>
                          <Button
                            disabled={loading}
                            variant="ghost"
                            size="sm"
                            onClick={() => sendNewsLetterToUser(newsletter.id)}
                            className="h-8 w-8 p-0 hover:bg-red-500/20"
                          >
                            <SendIcon className="h-4 w-4 text-red-400" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditModal(newsletter)}
                            className="h-8 w-8 p-0 hover:bg-red-500/20"
                          >
                            <Edit className="h-4 w-4 text-red-400" />
                          </Button>

                          <Dialog
                            open={deleteModal}
                            onOpenChange={setDeleteModal}
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-red-500/20"
                              >
                                <Trash className="h-4 w-4 text-red-400" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-gray-900 border-gray-800 text-white">
                              <DialogHeader>
                                <DialogTitle className="text-red-400">
                                  Delete Newsletter
                                </DialogTitle>
                                <DialogDescription className="text-gray-400">
                                  Are you sure you want to delete "
                                  {newsletter.title}"? This action cannot be
                                  undone.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button
                                  variant="outline"
                                  className="bg-gray-800 text-white hover:bg-gray-700 border-gray-700"
                                  onClick={() => setDeleteModal(false)}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  onClick={() =>
                                    handleDeleteNewsletter(newsletter.id)
                                  }
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
          <DialogContent className="max-w-2xl bg-gray-900 border-gray-800 text-white">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-400">
                <Edit className="h-5 w-5" />
                Edit Newsletter
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Title</Label>
                  <Input
                    className="bg-gray-800 border-gray-700 text-white focus:ring-red-500"
                    value={newNewsletter.title}
                    onChange={(e) =>
                      setNewNewsletter({
                        ...newNewsletter,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Subject Line</Label>
                  <Input
                    className="bg-gray-800 border-gray-700 text-white focus:ring-red-500"
                    value={newNewsletter.subject}
                    onChange={(e) =>
                      setNewNewsletter({
                        ...newNewsletter,
                        subject: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Content</Label>
                <Textarea
                  className="min-h-[200px] bg-gray-800 border-gray-700 text-white focus:ring-red-500"
                  value={newNewsletter.content}
                  onChange={(e) =>
                    setNewNewsletter({
                      ...newNewsletter,
                      content: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
                <Switch
                  checked={newNewsletter.isScheduled}
                  onCheckedChange={(checked) =>
                    newNewsletter.status !== "SENT" &&
                    setNewNewsletter({ ...newNewsletter, isScheduled: checked })
                  }
                  disabled={newNewsletter.status === "SENT"}
                  className="data-[state=checked]:bg-red-500"
                />
                <Label className="text-gray-300">Schedule for later</Label>
                {newNewsletter.isScheduled && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                        size="sm"
                      >
                        <Calendar className="mr-2 h-4 w-4 text-red-400" />
                        {newNewsletter.scheduledAt
                          ? format(newNewsletter.scheduledAt, "PPP")
                          : "Pick date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="bg-gray-900 border-gray-800">
                      <CalendarComponent
                        mode="single"
                        selected={newNewsletter.scheduledAt ?? undefined}
                        onSelect={(date) =>
                          setNewNewsletter({
                            ...newNewsletter,
                            scheduledAt: date ?? null,
                          })
                        }
                        className="text-white"
                      />
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                className="bg-gray-800 text-white hover:bg-gray-700 border-gray-700"
                onClick={() => setEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={handleUpdateNewsletter}
              >
                Update Newsletter
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Dialog */}
        <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
          <DialogContent className="max-w-2xl bg-gray-900 border-gray-800 text-white">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-400">
                <Eye className="h-5 w-5" />
                Newsletter Preview
              </DialogTitle>
            </DialogHeader>
            {selectedNewsletter && (
              <div className="space-y-4 py-4">
                <div className="border-l-4 border-l-red-500 bg-gray-800 p-4 rounded">
                  <h3 className="font-semibold text-lg text-red-400">
                    {selectedNewsletter.title}
                  </h3>
                  <p className="text-gray-300 font-medium">
                    {selectedNewsletter.subject}
                  </p>
                </div>
                <div className="flex gap-4 flex-wrap">
                  <Badge
                    className={getStatusColor(selectedNewsletter.status)}
                    variant="outline"
                  >
                    {selectedNewsletter.status}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-gray-300">
                    <Users className="h-4 w-4 text-red-400" />
                    <span>
                      {selectedNewsletter.recipientCount.toLocaleString()}{" "}
                      Recipients
                    </span>
                  </div>
                  <div className="text-sm text-gray-300">
                    Created:{" "}
                    {selectedNewsletter.createdAt
                      ? format(selectedNewsletter.createdAt, "MMM dd, yyyy")
                      : "N/A"}
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-gray-300">Content:</h4>
                  <p className="text-gray-400 whitespace-pre-wrap">
                    {selectedNewsletter.content}
                  </p>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                className="bg-gray-800 text-white hover:bg-gray-700 border-gray-700"
                onClick={() => setViewModalOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
