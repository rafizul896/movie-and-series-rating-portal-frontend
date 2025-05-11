import { toggleApproveReview } from '@/services/reviewService';
"use server"

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const deleteComments = async (reviewIds: string[]) => {
  try {
    console.log(8,reviewIds);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/comments/delete-comments`,
      {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")?.value || "",
        },
        body: JSON.stringify(reviewIds)
      }
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result?.message || "Failed to delete comment");
    }

    revalidateTag("comments");
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error occurred while deleting comments");
  }
};
export const toggleApproveComments = async (reviewIds: string[]) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/comments/approve-toggle`,
      {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")?.value || "",
        },
        body: JSON.stringify(reviewIds)
      }
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result?.message || "Failed to delete comment");
    }

    revalidateTag("comments");
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error occurred while deleting comments");
  }
};