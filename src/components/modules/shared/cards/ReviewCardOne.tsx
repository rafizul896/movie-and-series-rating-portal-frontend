/* eslint-disable @next/next/no-img-element */
"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addComment, deleteReview, toggleLike } from "@/services/reviewService";
import { dateConvertor } from "@/utils/dateConvertor";
import { Heart, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import EditReviewModal from "../../movie/EditReviewModal";
import { TReviewByMovieId } from "@/types/review.type";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";

type TComment = {
  comment: string;
};

const ReviewCardOne = ({
  review,
  onReviewChange,
}: {
  review: TReviewByMovieId;
  movieId?: string;
  onReviewChange: () => void;
}) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { user } = useUser();

  const form = useForm<TComment>({
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async (data: TComment) => {
    const commentData = {
      content: data.comment,
      reviewId: review.id,
    };

    try {
      await addComment(commentData);
      form.reset();
      toast.success("Comment Added");
      onReviewChange();
    } catch (error) {
      console.log("Add comment failed", error);
      toast.error("Failed to add comment");
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    try {
      await deleteReview(reviewId);
      toast.success("Review deleted successfully");
      onReviewChange();
    } catch (err) {
      console.error("Delete review failed", err);
      toast.error("Delete review failed");
    }
  };

  const handleLikeToggle = async (reviewId: string) => {
    if(!user){
      return toast.error("Please login to like");
    }
    try {
      await toggleLike(reviewId);
      if (!review.liked) {
        toast.success("Liked");
      } else {
        toast.warning("Unliked");
      }
      onReviewChange();
    } catch (error) {
      console.error("Like toggle failed", error);
      toast.error("Failed to toggle like");
    }
  };

  return (
    <div className="bg-gray-700/50 p-4 rounded-lg">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <img
            src={
              "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
            }
            alt={review?.user?.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p>{review?.user?.name}</p>
            <p>⭐{review.rating}</p>
            <p className="flex gap-2">
              Tags:
              {review.tags.map((t) => (
                <span
                  key={t}
                  className="px-1 py-[1px] text-sm bg-gray-600 rounded"
                >
                  #{t}
                </span>
              ))}
            </p>
          </div>
        </div>
        <div>
          <p>
            {review.approved ? (
              dateConvertor(review.createdAt)
            ) : (
              <div className="flex gap-2">
                <EditReviewModal
                  reviewId={review?.id}
                  onReviewChange={onReviewChange}
                />
                <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                  <AlertDialogTrigger asChild>
                    <Trash2
                      className="cursor-pointer"
                      onClick={() => setIsDeleteOpen(true)}
                    />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-black">
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete and remove this review from the servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="text-black">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          handleDeleteReview(review.id);
                          setIsDeleteOpen(false);
                        }}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </p>
        </div>
      </div>

      <p className="my-5 text-gray-300">{review.content}</p>

      <div className="flex justify-between">
        <div className="flex gap-2">
          {review.approved  && (
            <Heart
              onClick={() => handleLikeToggle(review.id)}
              className={`cursor-pointer transition-all  ${
                review.isLikedByUser  ? "fill-red-500 text-red-500" : ""
              }`}
            />
          )}
          <p>{review._count.likes}</p>
        </div>
        <p>{review._count.comments} comments</p>
      </div>

      {review.approved && (
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col sm:flex-row items-center gap-2 mt-3"
            >
              <FormField
              disabled={!user?.email}
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        placeholder="Write a comment..."
                        className="bg-zinc-800 text-white placeholder:text-gray-400 border border-zinc-700 w-full"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
              disabled={!user?.email}
                type="submit"
                variant="customOutlined"
              >
                Comment
              </Button>
            </form>
          </Form>

          <div className="my-5">
            <p className="mb-1">Comments</p>
            <hr />
            {review?.comments?.length &&
              review?.comments?.map((c) => (
                <div key={c.id} className="p-2 rounded my-4 bg-gray-700/30">
                  <p>{c.content}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCardOne;
