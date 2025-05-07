
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";



export const getAllUser = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`, {
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


export const updateUserStatus = async (userId: string, UserData: FormData) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/${userId}`, {
        method: "PATCH",
        body: UserData,
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        next: {
          tags: ["users"],
        },
      });
      const result = await res.json();
      return result;
    } catch (error: any) {
      return { error: error.message };
    }
  };
  