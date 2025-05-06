"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function SectionCards({ data }: { data: any }) {
  const { totalRevenue, totalPurchases, rentalCount, buyCount } = data;
  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalRevenue.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
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

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Rentals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {rentalCount.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
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
