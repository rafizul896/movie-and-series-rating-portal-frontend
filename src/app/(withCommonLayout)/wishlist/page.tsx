import WishlistPage from "@/components/modules/wishlist/Wishlist";
import { Clock } from "lucide-react";
import React from "react";

const WatchListLayout = async() => {
  return (
    <div className="  text-white">
      <main className="container mx-auto px-4 py-20">
        <div className="flex items-center justify-center gap-2 my-10">
          <Clock className="h-6 w-6" />
          <h1 className="text-2xl font-bold">My Wishlist </h1>
        </div>

        <div className="w-full">
          <WishlistPage />
        </div>
      </main>
    </div>
  );
};

export default WatchListLayout;
