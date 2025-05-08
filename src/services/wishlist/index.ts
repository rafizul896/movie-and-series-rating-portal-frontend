"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const addToWishlist = async (data: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: JSON.stringify(data),
    });
    revalidateTag("wishlist");

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getAllWishlist = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/wishlist`, {
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      next: {
        tags: ["wishlist"],
      },
    });
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const removeFromWishlistList = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/wishlist/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );

    const result = await res.json();

    revalidateTag("wishlist");

    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const deleteManyWishlistItem = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/wishlist`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );

    const result = await res.json();

    revalidateTag("wishlist");

    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};
