"use server";
import { TAddToWatchList } from '@/types/watchList.type';
import { revalidateTag } from 'next/cache';
import { cookies } from "next/headers";

export const addToWatchList = async (data:TAddToWatchList)=>{
  try {
    const res =await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/watchlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: JSON.stringify(data)
    })
    const result = await res.json()
    return result;
  } catch (error:any) {
    return Error(error.message)
  }
}
export const getAllWatchList = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/watchlist`, {
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      next: {
        tags: ["watchlist"],
      },
    });
    const result = await res.json();
console.log("get all watchl ", result)
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getSingleWatchList = async (watchMovieId: string) => {

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/watchlist/${watchMovieId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        }
      }
    );
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
