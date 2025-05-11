
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IUserType } from "@/types/user";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";


export const getAllUser = async ({page,limit}:{page?:number,limit?:number}) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user?page=${page}&limit=${limit}`, {
      method: "GET",
      next: {
        tags: ["users"],
      },
    });
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

export const updateUserRole = async (id: string, payload:{role:string}) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(payload)
      }
    );
    revalidateTag("users");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getSingleUser = async (id: string): Promise<IUserType | Error> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user data");
    }

    return await res.json();
  } catch (error: any) {
    console.error("Error fetching user:", error);
    return new Error(error.message || "Failed to fetch user");
  }
};


  