"use client";
import AddReviewModal from "@/components/modules/movie/AddReviewModal";
import ReviewCardOne from "@/components/modules/shared/cards/ReviewCardOne";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/context/UserContext";
import { getSingleMovie } from "@/services/movie";
import { addToWatchList } from "@/services/watchList";
import { addToWishlist } from "@/services/wishlist";
import { TMovie } from "@/types/movie.type";
import { TAddToWatchList } from "@/types/watchList.type";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

const MovieDetailsPage = () => {
  const [moviesData, setMoviesData] = useState<TMovie>();
  const [isPending, startTransition] = useTransition();
  const { user, isLoading } = useUser();

  const param = useParams();

  // const token = localStorage.getItem("accessToken");

  // const user = jwtDecode(token || "");
  // console.log(user);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await getSingleMovie(param?.movieId as string, user?.id);
      setMoviesData(res?.data?.data || []);
    };

    fetchMovies();
  }, [param?.movieId]);

  // console.log(moviesData);

  const handleAddToWishlist = async (movieId: string) => {
    if (!user) {
      toast.error("You have to signup first");
      return;
    }

    startTransition(async () => {
      try {
        const data: TAddToWatchList = {
          movieId: movieId,
          userId: user?.id,
        };

        console.log(data);

        const result = await addToWishlist(data);

        if (result.success) {
          toast.success(result?.message || "Successfully added to watchlist");
        } else {
          toast.error(result?.message || "Something went wrong!");
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error?.message || "Something went wrong!");
        }
      }
    });
  };

  return (
    <div className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex gap-2 flex-col md:flex-row">
        <div className="md:w-3/12">
          <div className="w-10/12 mx-auto">
            <div className="relative w-52 h-80 mx-auto">
              <Image
                src={
                  moviesData?.thumbnail ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoWcWg0E8pSjBNi0TtiZsqu8uD2PAr_K11DA&s"
                }
                alt={moviesData?.title || ""}
                fill
                className="rounded"
              />
            </div>
            <div className="flex flex-col gap-3">
              <Button variant={"custom"}>Buy or Rent</Button>
              <Button
                onClick={() => handleAddToWishlist(moviesData?.id as string)}
                variant={"customOutlined"}
              >
                {" "}
                {isPending ? "Adding..." : "+ Add to wishlist"}
              </Button>
            </div>
            <div className="bg-red-400/20 p-3 rounded mt-4">
              <div className="grid grid-cols-2 mt-1">
                <p>Release Year</p>
                <p>{moviesData?.releaseYear}</p>
                <p>Director</p>
                <p>{moviesData?.director}</p>
              </div>
              <hr className="my-3" />
              <div>
                <p>Genres</p>
                <div className="flex gap-1 flex-wrap mt-1">
                  {moviesData?.genres?.map((g) => (
                    <span
                      key={g}
                      className="text-sm bg-gray-500 px-[10px] py-[1px] rounded"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
              <hr className="my-3" />
              <div>
                <p>Available on</p>
                <div className="flex gap-1 flex-wrap mt-1">
                  {moviesData?.platforms?.map((p) => (
                    <span
                      key={p}
                      className="text-sm bg-red-600 text-white px-[10px] py-[1px] rounded"
                    >
                      {p}{" "}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-9/12 p-4 md:p-0">
          <Link
            href={"/movies"}
            className="text-red-500 md:flex items-center gap-2 cursor-pointer hidden"
          >
            <ArrowLeft size={20} /> Back to Movies
          </Link>
          <p className="text-gray-500 mt-5 font-semibold flex items-center">
            <span className="font-normal text-xs px-2 py-[2px] rounded-full bg-red-100 text-red-950 mr-3">
              {moviesData?.type}
            </span>
            {moviesData?.releaseYear}
          </p>
          <h1 className="text-xl md:text-3xl mt-2 mb-1">{moviesData?.title}</h1>
          <div className="flex gap-4 text-gray-400 mb-2">
            <p className="text-yellow-400">
              ⭐
              {moviesData?.avgRating ? moviesData?.avgRating?.toFixed(1) : "8"}
              /10
            </p>
            <p>
              Buy:{" "}
              <span className="font-semibold ">${moviesData?.buyPrice}</span>
            </p>
            <p>
              Rent:{" "}
              <span className="font-semibold ">${moviesData?.rentPrice}</span>
            </p>
          </div>
          <p>{moviesData?.synopsis}</p>
          <h6 className="mt-5">Cast: </h6>
          <div className="flex flex-wrap gap-2 mt-1">
            {moviesData?.cast?.map((cast) => (
              <p
                key={cast}
                className="text-sm bg-gray-500 px-[10px] py-[1px] rounded-xl"
              >
                {cast}
              </p>
            ))}
          </div>

          <div className="Reviews mt-10 bg-gray-700/45 p-3 rounded">
            <div className="flex justify-between mb-3">
              <h5 className="mb-1 md:text-xl">Reviews</h5>
              <AddReviewModal movieId={moviesData?.id || ""} />
            </div>
            <Separator className="mb-3" />
            <div className="p-2">
              {moviesData?.reviews?.map((review) => (
                <ReviewCardOne key={review?.id} review={review} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
