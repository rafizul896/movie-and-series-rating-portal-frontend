export const dynamic = "force-dynamic";

import { UserPurchaseTable } from "@/components/Purchase/UserPurchaseTable";
import { getCurrentUser } from "@/services/authService";
import { fetchUserPurchases } from "@/services/purchase";
import { cookies } from "next/headers";
import { JSX } from "react";

export default async function PurchasePage(): Promise<JSX.Element> {
  // 1. Get current user
  const user = await getCurrentUser();
  if (!user?.email) {
    throw new Error("Authentication required");
  }

  // 2. Get access token
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) {
    throw new Error("Session expired - please login again");
  }

  // 3. Fetch purchases
  const purchases = await fetchUserPurchases(token);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center mb-8 sm:mb-10">
        <h1 className="text-2xl mt-10 sm:text-3xl font-bold text-white">
          Purchase History
        </h1>
        <p className="mt-2 text-sm  text-gray-400">
          View all your past purchases
        </p>
      </div>

      <div className="text-white  rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-x-auto">
        <UserPurchaseTable data={purchases} />
      </div>
    </div>
  );
}
