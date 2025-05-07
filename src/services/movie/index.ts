"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllMovies = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/movie`, {
      method: "GET",
      next: {
        tags: ["movies"],
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getSingleMovie = async (movieId: string, userId: string) => {
  const bodyData = { userId };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/movie/${movieId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
        next: {
          tags: [`movie-${movieId}`], // ⬅️ This enables tag-based revalidation
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const addMovie = async (movieData: FormData): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/movie`, {
      method: "POST",
      body: movieData,
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    revalidateTag("movies");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
