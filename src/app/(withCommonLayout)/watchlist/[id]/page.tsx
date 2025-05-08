"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Film, ArrowLeft, Star, Clock, Calendar } from "lucide-react";
import { useParams } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { getSingleWatchList } from "@/services/watchList";

export default function WatchPage({ params }: { params: { id: string } }) {
  const { id } = useParams();
  const [movieData, setMoviesData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await getSingleWatchList(id as string);
      setMoviesData(res?.data?.movies|| {});
      setIsLoading(false);
    };

    fetchMovies();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!movieData) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
        <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
        <Button className="bg-red-600 hover:bg-red-700">
          <Link href="/watchlist">Back to Watchlist</Link>
        </Button>
      </div>
    );
  }
  const {
    synopsis,
    rentPrice,
    avgRating,
    buyPrice,
    title,
    thumbnail,
    director,
    platforms,
    genres,
    type,
    streamingLink,
    createdAt,
    releaseYear,
    cast,
  } = movieData;
  return (
    <div className="container mx-auto flex justify-center items-center">
      <main className="pt-16 ">
        {/* Video Player */}
        <div className="w-full bg-black aspect-video relative">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/nqmYnTZvcw8?si=mo6s_hoMMvAWBWt3?autoplay=1&controls=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Movie Details */}
        <div className="w-full px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>

              <div className="flex items-center flex-wrap gap-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                  <span className="text-white">{avgRating?.toFixed(1)}/10</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{new Date(createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{releaseYear}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {genres?.map((genre: string, index: number) => (
                    <span
                      key={index}
                      className="text-xs bg-red-600/80 text-white px-2 py-1 rounded-full"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-gray-300 mb-6">{synopsis}</p>

              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    Director
                  </h2>
                  <p className="text-gray-300">{director}</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    Cast
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {cast?.map((actor: string, index: number) => (
                      <span
                        key={index}
                        className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm"
                      >
                        {actor}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="relative h-[300px] mb-4">
                    <Image
                      src={thumbnail || "/placeholder.svg"}
                      alt={title || "Not found"}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>

                  <div className="text-center">
                    <p className="text-gray-400 mb-2">
                      You purchased this {type} for
                    </p>
                    <p className="text-2xl font-bold text-white mb-4">
                      <span className="text-red-600/80">$</span>
                      {buyPrice?.toFixed(2)}
                    </p>
                    {/* <p className="text-2xl font-bold text-white mb-4">
                      ${rentPrice?.toFixed(2)}
                    </p> */}

                    <Link href={`https://www.youtube.com/embed/iu2eXrYe8Fo?si=bhSoxnmmO81yqATw`} >
                    <Button className="w-full bg-red-600 hover:bg-red-700 mb-2">
                      Streaming link
                    </Button>
                    </Link>

                    {/* <Button
                      variant="outline"
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      Add to Favorites
                    </Button> */}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
