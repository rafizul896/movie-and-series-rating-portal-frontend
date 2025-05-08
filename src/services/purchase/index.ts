"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createPurchase  = async (data: any) => {
    console.log("data",data)
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/purchase/many-purchase`, {
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