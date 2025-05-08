import WatchListPage from "@/components/modules/watchList/WatchList";
import { Button } from "@/components/ui/button";
import { getAllWatchList } from "@/services/watchList";
import { Clock, Link } from "lucide-react";
import React from "react";

const WatchListLayout = async() => {
  const data = await getAllWatchList();
  const watchListData = data?.data;
  return (
    <div className="  text-white">
      <main className="container mx-auto px-4 py-20">
        <div className="flex items-center justify-center gap-2 my-12">
          <Clock className="h-6 w-6 text-red-500" />
          <h1 className="text-2xl font-bold">My Watchlist</h1>
        </div>

         <div className="flex items-center justify-center ">
         <WatchListPage watchListData={watchListData}/>
         </div>

      </main>
    </div>
  );
};

export default WatchListLayout;