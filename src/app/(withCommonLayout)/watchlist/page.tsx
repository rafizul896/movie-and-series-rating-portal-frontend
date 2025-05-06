import WatchListPage from "@/components/modules/watchList/WatchList";
import { Button } from "@/components/ui/button";
import { Clock, Link } from "lucide-react";
import React from "react";

const WatchListLayout = () => {
  return (
    <div className="  text-white">
      <main className="container mx-auto px-4 py-20">
        <div className="flex items-center justify-center gap-2 my-12">
          <Clock className="h-6 w-6 text-red-500" />
          <h1 className="text-2xl font-bold">My Watchlist</h1>
        </div>

         <div className="flex items-center justify-center ">
         <WatchListPage />
         </div>

      </main>
    </div>
  );
};

export default WatchListLayout;

{
  /* <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <div className="mb-4">
            <Clock className="mx-auto text-gray-500" size={48} />
          </div>
          <h2 className="text-xl font-semibold mb-2">
            Your watchlist is empty
          </h2>
          <p className="text-gray-400 mb-6">
            Start browsing and add movies or series you want to watch later.
          </p>
          <Link to="/browse">
            <Button>Browse Content</Button>
          </Link>
        </div> */
}
