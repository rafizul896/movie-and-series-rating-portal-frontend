"use server";

import { ReviewQueryParams } from "@/types/queryParams.type";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

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

    if (!res.ok) {
      throw new Error(result?.message || "Failed to fetch reviews");
    }

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error occurred while fetching reviews");
  }
};

export const toggleApproveReview = async (reviewId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/reviews/${reviewId}/approve-toggle`,
      {
        method: "PATCH",
        headers: {
          Authorization: (await cookies()).get("accessToken")?.value || "",
        },
      }
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result?.message || "Failed to toggle review approval");
    }

    revalidateTag("reviews");
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error occurred while updating reviews");
  }
};

export const deleteReview = async (reviewId: string) => {
  try {
    console.log(reviewId)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/reviews/${reviewId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")?.value || "",
        },
      }
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result?.message || "Failed to delete review");
    }

    revalidateTag("reviews");
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error occurred while deleting reviews");
  }
};

export const addReview = async (data: {
  rating: number;
  content: string;
  tags: string[];
  hasSpoiler?: boolean;
  movieId: string;
}) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")?.value || "",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result?.message || "Failed to submit review");
    }

    revalidateTag("movies");
    revalidateTag(`movie-${data.movieId}`);

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error occurred while submitting review");
  }
};

export const getReviewById = async (reviewId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/reviews/${reviewId}`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")?.value || "",
        },
        next: {
          tags: [`review-${reviewId}`],
        },
      }
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result?.message || "Failed to fetch review");
    }

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error occurred while fetching review");
  }
};

export const getReviewsByMovieId = async (movieId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/reviews/movie/${movieId}`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")?.value || "",
        },
        next: {
          tags: [`movie-${movieId}-reviews`],
        },
      }
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result?.message || "Failed to fetch reviews for movie");
    }

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error occurred while fetching movie reviews");
  }
};

export const editReview = async (
  reviewId: string,
  data: {
    rating: number;
    content: string;
    tags: string[];
    hasSpoiler?: boolean;
  }
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/reviews/${reviewId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(data),
      }
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result?.message || "Failed to update review");
    }

    revalidateTag("reviews");
    revalidateTag(`review-${reviewId}`);

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error occurred while updating review");
  }
};

export const toggleLike = async (reviewId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/likes/${reviewId}`,
      {
        method: "POST",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result?.message || "Failed to toggle like on review");
    }

    revalidateTag("reviews");
    revalidateTag(`review-${reviewId}`);

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error occurred while toggling like");
  }
};

export const addComment = async (data: {
  content: string;
  reviewId: string;
}) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result?.message || "Failed to submit comment");
    }

    revalidateTag(`review-${data.reviewId}`);
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error occurred while submitting comment");
  }
};
