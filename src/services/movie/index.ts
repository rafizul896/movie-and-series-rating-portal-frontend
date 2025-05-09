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
      cache: "no-store"
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getAllMoviesByFilter = async (
  sortBy: string,
  values: string | boolean,
  limit: number
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/movie?${sortBy}=${values}&limit=${limit}`,
      {
        method: "GET",
        cache: "no-store"
      }
    );
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

export const getSingleMovieDetails = async (movieId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/movie/${movieId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

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

export const updateMovie = async (id: string, movieData: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/movie/${id}`, {
      method: "PUT",
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

export const deletedMovie = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/movie/soft/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("movies");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
