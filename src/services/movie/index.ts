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

// export const getSingleMovie = async (movieId: string) => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_API}/movie/${movieId}`,
//       {
//         method: "GET",
//       }
//     );
//     const result = await res.json();
//     return result;
//   } catch (error: any) {
//     return Error(error.message);
//   }
// };

export const getSingleMovie = async (movieId: string) => {
  const bodyData = {
    userId: "6f39dc54-0a44-45ba-bd4d-4f2800e05313",
  };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/movie/${movieId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
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
