/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { PurchaseData } from "@/types/purchase.type";

// Or your custom Purchase type

export const fetchUserPurchases = async (token: string): Promise<PurchaseData[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/purchase`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`
      },
      cache: 'no-store' // Important for SSR
    });

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