"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { revalidateTag } from 'next/cache';
import { PurchaseData } from "@/types/purchase.type";
import { cookies } from "next/headers";
import { ReviewQueryParams } from '@/types/queryParams.type';


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

export const getAllOrderHistory = async (params: ReviewQueryParams = {}) => {
  try {
    const query = new URLSearchParams();

    if (params.paymentStatus) query.append("paymentStatus", params.paymentStatus);
    if (params.purchase_type) query.append("purchase_type", params.purchase_type);
    if (params.page) query.append("page", params.page.toString());
    if (params.limit) query.append("limit", params.limit.toString());

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/purchase/purchase-history?${query.toString()}`,
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

