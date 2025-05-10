"use client";
import React from "react";
import WatchListCard from "./WatchListCard";
import { removeFromWatchList } from "@/services/watchList";
import { toast } from "sonner";
import { TMovie } from "@/types/movie.type";


type WatchListEntry = {
  createdAt: string;
  id: string;
  movies?: Partial<TMovie>;
};

type WatchListPageProps = {
  watchListData: WatchListEntry[];
};

const WatchListPage = ({ watchListData }: WatchListPageProps) => {

  async function handleRemoveFromWatchlist(id: string) {
    try {
      const res = await removeFromWatchList(id);
      if (res.success) {
        toast.success(
          res?.message || "Movie removed from watchlist successfully"
        );
      } else {
        toast.error(res.message || "Failed to remove movie from watchlist");
      }
    } catch (error) {
      console.error("Failed to remove movie from watchlist:", error);
    }
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {watchListData?.length > 0 ? (
        watchListData?.map(({ movies, id }: any) => (
          <WatchListCard
            key={id}
            id={id}
            onRemove={handleRemoveFromWatchlist}
            movieId={movies?.id}
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
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-white">
          <h2 className="text-xl font-semibold mb-2">
            Your watchlist is empty
          </h2>
          <p className="text-gray-400 mb-6"></p>
        </div>
      )}
    </div>
  );
};

export default WatchListPage;
