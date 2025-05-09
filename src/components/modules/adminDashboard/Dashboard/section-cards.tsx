"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function SectionCards({
  data,
}: {
  data: {
    totalRevenue: number;
    totalPurchases: number;
    rentalCount: number;
    buyCount: number;
  };
}) {
  const { totalRevenue, totalPurchases, rentalCount, buyCount } = data;

  return (
    <div className="mt-2 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-black text-white border-gray-500">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalRevenue.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black text-white border-gray-500">
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Total Purchases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalPurchases.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black text-white border-gray-500">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Rentals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {rentalCount.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black text-white border-gray-500">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Buys</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {buyCount.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
