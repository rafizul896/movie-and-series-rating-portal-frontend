import ReviewCardOne from "@/components/modules/shared/cards/ReviewCardOne";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MovieDetailsPage = () => {
  const movie = {
    title: "Avengers",
    synopsis: "A marine on an alien planet becomes torn between two worlds.",
    genres: ["Sci-Fi", "Adventure"],
    type: "MOVIE",
    releaseYear: 2009,
    director: "James Cameron",
    cast: ["Sam Worthington", "Zoe Saldana"],
    platforms: ["Disney+"],
    buyPrice: 13.99,
    rentPrice: 4.99,
    discountPrice: 3.49,
    thumbnail:
      "https://wallpapercat.com/w/full/e/c/7/119551-1350x2160-samsung-hd-avengers-wallpaper.jpg",
    streamingLink: "https://streaming.example.com/avatar",
    isTrending: true,
  };

  const reviews = [
    {
      id: 1,
      name: "Aktheruzzaman",
      profileImage:
        "https://img.freepik.com/premium-vector/person-icon_109161-4674.jpg?w=360",
      rating: 9,
      content: "love it!",
      date: "26 may 2025",
      tags: ["fantasy", "action"],
      comments: [
        {
          id: 1,
          comment: "Demo comment 1",
        },
        {
          id: 2,
          comment: "Demo comment 2",
        },
      ],
    },
    {
      id: 2,
      name: "Aktheruzzaman",
      profileImage:
        "https://img.freepik.com/premium-vector/person-icon_109161-4674.jpg?w=360",
      rating: 9,
      content: "Looks Good",
      date: "20 may 2025",
      tags: ["fantasy", "action"],
      comments: [
        {
          id: 1,
          comment: "demo comment",
        },
      ],
    },
  ];

  return (
    <div className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex gap-2">
        <div className="w-3/12">
          <div className="w-10/12 mx-auto">
            <div className="relative w-52 h-80 mx-auto">
              <Image
                src={movie.thumbnail}
                alt={movie.title}
                fill
                className="rounded"
              />
            </div>
            <div className="flex flex-col gap-3">
              <Button variant={"custom"}>Buy or Rent</Button>
              <Button variant={"customOutlined"}>+ Add to wishlist</Button>
            </div>
            <div className="bg-red-400/20 p-3 rounded mt-4">
              <div className="grid grid-cols-2 mt-1">
                <p>Release Year</p>
                <p>{movie.releaseYear}</p>
                <p>Director</p>
                <p>{movie.director}</p>
              </div>
              <hr className="my-3" />
              <div>
                <p>Genres</p>
                <div className="flex gap-1 flex-wrap mt-1">
                  {movie.genres.map((g) => (
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
                  {movie.platforms.map((p) => (
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
        <div className="w-9/12">
          <Link
            href={"/movies"}
            className="text-red-500 flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft size={20} /> Back to Movies
          </Link>
          <p className="text-gray-500 mt-5 font-semibold flex items-center">
            <span className="font-normal text-xs px-2 py-[2px] rounded-full bg-red-100 text-red-950 mr-3">
              {movie.type}
            </span>
            {movie.releaseYear}
          </p>
          <h1 className="text-xl md:text-3xl mt-2 mb-1">{movie.title}</h1>
          <div className="flex gap-4 text-gray-400 mb-2">
            <p className="text-yellow-400">⭐9/10</p>
            <p>
              Buy: <span className="font-semibold ">${movie.buyPrice}</span>
            </p>
            <p>
              Rent: <span className="font-semibold ">${movie.rentPrice}</span>
            </p>
          </div>
          <p>{movie.synopsis}</p>
          <h6 className="mt-5">Cast: </h6>
          <div className="flex flex-wrap gap-2 mt-1">
            {movie.cast.map((cast) => (
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
              <Button variant={"custom"}>Write a review</Button>
            </div>
            <Separator className="mb-3" />
            <div className="p-2">
              {reviews.map((review) => (
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
