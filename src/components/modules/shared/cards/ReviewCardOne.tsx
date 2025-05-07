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
import { deleteReview } from "@/services/reviewService";
import { TSingleMovieReview } from "@/types/movie.type";
import { dateConvertor } from "@/utils/dateConvertor";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import EditReviewModal from "../../movie/EditReviewModal";

type TComment = {
  comment: string;
};

const ReviewCardOne = ({
  review,
  onReviewChange,
}: {
  review: TSingleMovieReview;
  movieId?: string;
  onReviewChange: () => void;
}) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const form = useForm<TComment>({
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = (data: TComment) => {
    const commentData = {
      comment: data.comment,
      reviewId: review.id,
    };
    console.log(commentData);
  };

  const handleDeleteReview = async (reviewId: string) => {
    const token = localStorage.getItem("accessToken") || "";
    try {
      await deleteReview(reviewId, token);
      onReviewChange();
    } catch (err) {
      console.error("Delete review failed", err);
    }
  };

  return (
    <div className="mb-5 bg-gray-700/50 p-4 rounded-lg">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <img
            src={
              review?.user?.profileImage ||
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

      {review.approved && (
        <div className="p-3 rounded">
          <p className="mb-1">Comments</p>
          <hr />
          {/* new  */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col sm:flex-row items-center gap-2 mt-3"
            >
              <FormField
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
                type="submit"
                variant="customOutlined"
                className="whitespace-nowrap"
              >
                Comment
              </Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default ReviewCardOne;
