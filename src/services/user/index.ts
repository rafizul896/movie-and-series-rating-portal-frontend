"use server";

import { jwtDecode } from "jwt-decode";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { DecodedUser } from "../authService";

export const getAllUser = async ({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
}) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user?page=${page}&limit=${limit}`,
      {
        method: "GET",
        next: {
          tags: ["users"],
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const deletedUser = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/soft/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("users");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const updateUser = async (id: string, payload:FormData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: payload,
    });
    revalidateTag("users");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getSingleUser = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken");

    if (!token) {
      throw new Error("Failed to fetch user data");
    }

    const { id } = jwtDecode<DecodedUser>(token.value);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user data");
    }

    return res.json();
  } catch (error: any) {
    console.error("Error fetching user:", error);
    return new Error(error.message || "Failed to fetch user");
  }
};
