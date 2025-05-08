"use server";

import { PurchaseData } from "@/types/purchase.type";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createPurchase = async (data: any) => {
  console.log("data", data);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/purchase/many-purchase`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(data),
      }
    );

    revalidateTag("wishlist");

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

// Or your custom Purchase type

export const fetchUserPurchases = async (
  token: string
): Promise<PurchaseData[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/purchase`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        cache: "no-store", // Important for SSR
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to fetch purchases (${response.status})`
      );
    }

    const { data } = await response.json();
    return data;
  } catch (error: any) {
    console.error("[PURCHASE_SERVICE_ERROR]", error);
    throw new Error(error.message || "Failed to fetch purchase history");
  }
};
