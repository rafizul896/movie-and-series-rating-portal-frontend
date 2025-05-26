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
import { addComment } from "@/services/reviewService";
import { dateConvertor } from "@/utils/dateConvertor";
import { Heart, MessageSquareCode, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import EditReviewModal from "../../movie/EditReviewModal";
import { TReviewByMovieId } from "@/types/review.type";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import { handleReview } from "./handleReview";

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
  const { user } = useUser();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState<string | null>(null);

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

  const handleDeleteReviewFunc = async (reviewId: string) => {
    await handleReview.handleDeleteReview(reviewId, onReviewChange);
  };

  const handleDeleteComments = async (commentId: string) => {
    await handleReview.handleDeleteComments(commentId, onReviewChange);
  };

  const handleApproveUnapprovedComment = async (commentId: string) => {
    await handleReview.handleApproveUnapprovedComment(
      commentId,
      onReviewChange
    );
  };

  const handleLikeToggle = async (reviewId: string) => {
    if (!user) {
      return toast.error("Please login to like");
    }
    await handleReview.handleLikeToggle(reviewId, onReviewChange, review);
  };

  return (
    <div className="bg-gray-700/50 p-4 rounded-lg mb-4">
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
          <div>
            {review.approved ? (
              <p className="text-sm font-medium px-3 py-1 rounded-full text-yellow-300 bg-yellow-900/20">{dateConvertor(review.createdAt)}</p>
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
                          handleDeleteReviewFunc(review.id);
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
          </div>
        </div>
      </div>

      <p className="my-5 text-gray-300">{review.content}</p>

      <div className="flex justify-between">
        <div className="flex gap-2">
          {review.approved && (
            <Heart
              onClick={() => handleLikeToggle(review.id)}
              className={`cursor-pointer transition-all  ${
                review.isLikedByUser ? "fill-red-500 text-red-500" : ""
              }`}
            />
          )}
          <p>{review._count.likes}</p>
        </div>
        <p>{review._count.comments} comments</p>
      </div>

      {review.approved && (
        <div className="mt-6">
          {/* Comment Input Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col sm:flex-row items-center gap-3"
            >
              <FormField
                disabled={!user?.email}
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        placeholder={
                          user?.email
                            ? "Write a comment..."
                            : "Please log in to comment"
                        }
                        className="bg-zinc-800 text-white placeholder:text-gray-400 border border-red-600 rounded-lg py-2 px-4 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 w-full"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                disabled={!user?.email}
                type="submit"
                className="bg-red-600 hover:cursor-pointer hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
              >
                Comment
              </Button>
            </form>
          </Form>

          {/* Comments List */}
          <div className="my-5">
            <p className="mb-2 text-lg font-semibold text-red-600">Comments</p>
            <hr className="border-red-600 mb-4" />
            {review?.comments?.length ? (
              review.comments.map((c: any) => {
                console.log(c);
                return (
                  <>
                    <div
                      key={c.id}
                      className="p-4 rounded-lg my-4 bg-gray-700/30 border border-red-600/50 hover:bg-gray-700/50 transition-all duration-200"
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              c.user?.profileImage ||
                              "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                            }
                            alt={c.user?.name || "User"}
                            className="w-10 h-10 rounded-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=";
                            }}
                          />
                          <p className="text-sm font-medium text-gray-200">
                            {c.user?.name || "Anonymous"}
                          </p>
                        </div>
                        <div className="ml-8">
                          <div className="flex items-start gap-2">
                            <MessageSquareCode className="text-red-600 h-5 w-5 mt-1" />
                            <span className="text-gray-200">{c.content}</span>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-sm font-medium px-3 py-1 rounded-full text-yellow-300 bg-yellow-900/20">
                              {dateConvertor(c.createdAt)}
                            </p>

                            {user && user?.role === "ADMIN" && (
                              <div className="flex  gap-2 ">
                                <div
                                  onClick={() => {
                                    handleApproveUnapprovedComment(c.id);
                                  }}
                                  className={`px-2 py-1 rounded text-xs font-medium cursor-pointer ${
                                    c?.approved
                                      ? "bg-green-700/20 text-green-400"
                                      : "bg-red-700/20 text-red-400"
                                  }`}
                                >
                                  {c?.approved ? "Approved" : "Not Approved"}
                                </div>

                                <AlertDialog
                                  open={
                                    isDeleteOpen && deleteCommentId === c.id
                                  }
                                  onOpenChange={(open) => {
                                    setIsDeleteOpen(open);
                                    if (!open) setDeleteCommentId(null);
                                  }}
                                >
                                  <AlertDialogTrigger asChild>
                                    <Trash2
                                      className="cursor-pointer text-gray-400 hover:text-red-500 transition-colors duration-200 h-5 w-5"
                                      onClick={() => {
                                        setDeleteCommentId(c.id);
                                        setIsDeleteOpen(true);
                                      }}
                                    />
                                  </AlertDialogTrigger>
                                  <AlertDialogContent className="bg-white">
                                    <AlertDialogHeader>
                                      <AlertDialogTitle className="text-black">
                                        Delete Comment?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. The
                                        comment will be permanently removed.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel className="text-black">
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        className="bg-red-600 hover:cursor-pointer hover:bg-red-700"
                                        onClick={() => {
                                          handleDeleteComments(c.id);
                                          setIsDeleteOpen(false);
                                          setDeleteCommentId(null);
                                        }}
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <p className="text-gray-400 italic">No comments yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCardOne;
