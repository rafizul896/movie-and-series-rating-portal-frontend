"use server";
import { revalidateTag } from 'next/cache';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { PurchaseData } from "@/types/purchase.type";
import { cookies } from "next/headers";

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

export const getAllOrderHistory = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/purchase/purchase-history`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        next: {
          tags: ["purchase"],
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const deleteOrderHistory = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/purchase/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        }
        
      },
    );
    revalidateTag("orders");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

