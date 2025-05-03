"use client";

import MoviePosterCard from "../shared/cards/MoviePosterCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { movieData } from "./movies.db";

const TopRated = () => {
  return (
    <div className="py-10 w-full px-4 md:px-10">
      <h1 className="border-l-4 border-[#800000] pl-3 text-xl font-bold mb-5">
        Top Rated or Trending
      </h1>
      <Carousel
        plugins={[
          Autoplay({
            delay: 1800,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full py-5"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {movieData.map((movie) => (
            <CarouselItem
              key={movie.id}
              className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 lg:basis-1/5"
            >
              <MoviePosterCard key={movie.id} movie={movie} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default TopRated;
