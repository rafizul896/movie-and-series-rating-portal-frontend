"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Icons for visual appeal (using SVG for simplicity)
const RevenueIcon = () => (
  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-4c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 14c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
  </svg>
);

const PurchasesIcon = () => (
  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18v18H3zM9 9l3 3 3-3" />
  </svg>
);

const RentalsIcon = () => (
  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3H4v4h4zm0 14v4H4v-4h4zm12-14V3h-4v4h4zm0 14v4h-4v-4h4zM3 9h18v6H3z" />
  </svg>
);

const BuysIcon = () => (
  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
  </svg>
);

export function SectionCards({ data }: { data: any }) {
  const { totalRevenue, totalPurchases, rentalCount, buyCount } = data;

  return (
    <div className="mt-4 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Revenue Card */}
        <Card className="bg-black text-white border border-red-600/50 shadow-lg  hover:shadow-red-600/40 transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center gap-2 border-b border-red-600/30 pb-2">
            <RevenueIcon />
            <CardTitle className="text-sm sm:text-base font-semibold tracking-wide">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-xl sm:text-2xl font-bold text-green-400">
              ${totalRevenue.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        {/* Total Purchases Card */}
        <Card className="bg-black text-white border border-red-600/50 shadow-lg  hover:shadow-red-600/40 transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center gap-2 border-b border-red-600/30 pb-2">
            <PurchasesIcon />
            <CardTitle className="text-sm sm:text-base font-semibold tracking-wide">
              Total Purchases
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-xl sm:text-2xl font-bold text-blue-400">
              {totalPurchases.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        {/* Rentals Card */}
        <Card className="bg-black text-white border border-red-600/50 shadow-lg  hover:shadow-red-600/40 transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center gap-2 border-b border-red-600/30 pb-2">
            <RentalsIcon />
            <CardTitle className="text-sm sm:text-base font-semibold tracking-wide">
              Rentals
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-xl sm:text-2xl font-bold text-yellow-400">
              {rentalCount.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        {/* Buys Card */}
        <Card className="bg-black text-white border border-red-600/50 shadow-lg  hover:shadow-red-600/40 transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center gap-2 border-b border-red-600/30 pb-2">
            <BuysIcon />
            <CardTitle className="text-sm sm:text-base font-semibold tracking-wide">
              Buys
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-xl sm:text-2xl font-bold text-purple-400">
              {buyCount.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}