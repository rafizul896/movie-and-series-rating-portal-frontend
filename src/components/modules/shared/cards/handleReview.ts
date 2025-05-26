"use client"

import { deleteComments, toggleApproveComments } from "@/services/comment";
import { deleteReview, toggleLike } from "@/services/reviewService";
import { TReviewByMovieId } from "@/types/review.type";
import { toast } from "sonner";

 
 
 const handleDeleteReview = async (reviewId: string,onReviewChange: ()=> void) => {
    try {
      await deleteReview(reviewId);
      toast.success("Review deleted successfully");
      onReviewChange();
    } catch (err) {
      console.error("Delete review failed", err);
      toast.error("Delete review failed");
    }
  };

  const handleDeleteComments = async (commentId: string,onReviewChange: ()=> void) => {
    try {
      const commentIds = [commentId];
      await deleteComments(commentIds);
      toast.success("Comment deleted successfully");
      onReviewChange();
    } catch (err) {
      console.error("Delete comment failed", err);
      toast.error("Delete comment failed");
    }
  };

  const handleApproveUnapprovedComment = async (commentId: string,onReviewChange: ()=> void) => {
    try {
      const commentIds = [commentId];
      await toggleApproveComments(commentIds);
      toast.success("Comment Approved successfully");
      onReviewChange();
    } catch (err) {
      console.error("Approved comment failed", err);
      toast.error("Approved comment failed");
    }
  };

  const handleLikeToggle = async (reviewId: string,onReviewChange: ()=> void,review:TReviewByMovieId) => {
   
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
export  const handleReview = {
    handleDeleteReview,
    handleLikeToggle,
    handleDeleteComments,
    handleApproveUnapprovedComment
}