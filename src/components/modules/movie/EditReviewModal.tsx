"use client";

import { z } from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { SquarePen } from "lucide-react";
import { toast } from "sonner";
import { getReviewById, editReview } from "@/services/reviewService";

const reviewFormSchema = z.object({
  rating: z.coerce.number().min(1).max(10),
  content: z.string().min(2, { message: "Content is required" }),
  tags: z.string().min(1, { message: "Tags are required" }),
  hasSpoiler: z.boolean().optional(),
});

const EditReviewModal = ({
  reviewId,
  onReviewChange,
}: {
  movieId?: string;
  reviewId: string;
  onReviewChange: () => void;
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const form = useForm<z.infer<typeof reviewFormSchema>>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      rating: 0,
      content: "",
      tags: "",
      hasSpoiler: false,
    },
  });

  useEffect(() => {
    const fetchReview = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token || !reviewId) return;

      try {
        const review = await getReviewById(reviewId, token);

        form.reset({
          rating: review?.data?.rating,
          content: review?.data?.content,
          tags: review?.data?.tags?.join(", ") || "",
          hasSpoiler: review?.data?.hasSpoiler ?? false,
        });
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error?.message);
        } else {
          toast.error("Failed to load review");
        }
      }
    };

    if (isEditModalOpen) {
      fetchReview();
    }
  }, [isEditModalOpen, reviewId, form]);

  const onSubmit = async (values: z.infer<typeof reviewFormSchema>) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return toast.warning("Login required");

    const payload = {
      rating: values?.rating,
      content: values?.content,
      tags: values?.tags?.split(",").map((tag) => tag.trim()),
      hasSpoiler: values?.hasSpoiler ?? false,
    };

    try {
      const result = await editReview(reviewId, payload, token);
      onReviewChange();
      toast.success(result?.message || "Review updated successfully");
      form.reset();
      setIsEditModalOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error?.message);
      } else {
        toast.error("Failed to update review");
      }
    }
  };

  return (
    <>
      <SquarePen
        onClick={() => setIsEditModalOpen(true)}
        className="cursor-pointer"
      />
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="text-black">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating (1–10)</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} max={10} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Review</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Write your review..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags (comma-separated)</FormLabel>
                    <FormControl>
                      <Input placeholder="Action, Drama, Sci-Fi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hasSpoiler"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(!!checked)}
                      />
                    </FormControl>
                    <FormLabel>Contains Spoiler</FormLabel>
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="custom">
                  Update Review
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditReviewModal;
