"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
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
import { toast } from "sonner";

const reviewFormSchema = z.object({
  rating: z.coerce.number().min(1).max(10),
  content: z.string().min(2, { message: "Content is required" }),
  tags: z.string().min(1, { message: "Tags are required" }),
  hasSpoiler: z.boolean().optional(),
});

const AddReviewModal = ({ movieId }: { movieId: string }) => {
  const form = useForm<z.infer<typeof reviewFormSchema>>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      rating: 0,
      content: "",
      tags: "",
      hasSpoiler: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof reviewFormSchema>) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return toast.warning("Login required");

    const payload = {
      ...values,
      tags: values.tags.split(",").map((tag) => tag.trim()),
      movieId,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Review submitted!");
        form.reset();
      } else {
        toast.error(data?.message || "Failed to submit review");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="custom">Write a review</Button>
      </DialogTrigger>
      <DialogContent className="text-black">
        <DialogHeader>
          <DialogTitle>Add Review</DialogTitle>
        </DialogHeader>

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
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" variant="custom">
                Submit Review
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddReviewModal;
