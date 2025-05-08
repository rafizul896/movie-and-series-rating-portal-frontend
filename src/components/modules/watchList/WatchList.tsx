"use client";
import React, { useEffect, useState } from "react";
import WatchListCard from "./WatchListCard";
import { getAllWatchList, removeFromWatchList } from "@/services/watchList";
import { toast } from "sonner";

const WatchListPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const [watchList, setWatchList] = useState([]);
  
    useEffect(() => {
      const fetchWatchList = async () => {
        const res = await getAllWatchList();
        
        setWatchList(res?.data || []);
      };
  
      fetchWatchList();
    }, []);

    console.log(watchList)
  

    async function handleRemoveFromWatchlist(id: string) {
        try {
          const res = await removeFromWatchList(id)
          console.log(res)

          if (res.success) {
            toast.success(res?.message || "Movie removed from watchlist successfully");

          } else {
            toast.error(res.message || "Failed to remove movie from watchlist");
          }
        } catch (error) {
          console.error("Failed to remove movie from watchlist:", error)
        }
    }

  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
        {
            watchList?.length > 0 ? (
                watchList?.map(({movies,id}: any) => {
                    
                    return (
                        <WatchListCard
                            id={id}
                            onRemove={handleRemoveFromWatchlist}
                            key={movies?.id}
                            title={movies?.title}
                            releaseYear={movies?.releaseYear}
                            createdAt={movies?.createdAt}
                            avgRating={movies?.avgRating}
                            genres={movies?.genres}
                            synopsis={movies?.synopsis}
                            buyPrice={movies?.buyPrice}
                            rentPrice={movies?.rentPrice}
                            thumbnail={movies?.thumbnail} 
                        />
                        )
                })
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-white">
                <h2 className="text-xl font-semibold mb-2">Your watchlist is empty</h2>
                <p className="text-gray-400 mb-6"></p>
                </div>
        )}
      </div>
  );
};

export default WatchListPage;
