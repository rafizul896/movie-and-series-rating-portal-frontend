"use server";

import { ReviewQueryParams } from "@/types/queryParams.type";
import { revalidateTag } from "next/cache";

export const getAllReviews = async (params: ReviewQueryParams = {}) => {
  try {
    const query = new URLSearchParams();

    if (params.filterReview) query.append("filterReview", params.filterReview);
    if (params.page) query.append("page", params.page.toString());
    if (params.limit) query.append("limit", params.limit.toString());

    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_API
      }/reviews/movie/status?${query.toString()}`,
      {
        next: {
          tags: ["reviews"],
        },
        method: "GET",
      }
    );

    const result = await res.json();
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error occurred while fetching reviews");
  }
};

export const toggleApproveReview = async (reviewId: string, token: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/reviews/${reviewId}/approve-toggle`,
      {
        method: "PATCH",
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to toggle review approval");
    }
    revalidateTag("reviews");
    const result = await res.json();
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error occurred while updating reviews");
  }
};

export const deleteReview = async (reviewId: string, token: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/reviews/${reviewId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to delete review");
    }
    revalidateTag("reviews");
    const result = await res.json();
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error occurred while deleting reviews");
  }
};

export const addReview = async (
  data: {
    rating: number;
    content: string;
    tags: string[];
    hasSpoiler?: boolean;
    movieId: string;
  },
  token: string
) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to submit review");
    }
    revalidateTag("movies");

    const result = await res.json();
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error occurred while submitting review");
  }
};
