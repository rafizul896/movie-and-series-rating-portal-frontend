"use server";
import { revalidateTag } from 'next/cache';
import { cookies } from "next/headers";

export const getAllWatchList = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/watchlist`, {
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      next: {
        tags: ["watchlist"], // this tags the cache
      },
    });
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const removeFromWatchList = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/watchlist/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });

    const result = await res.json();

    revalidateTag('watchlist');

    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};
