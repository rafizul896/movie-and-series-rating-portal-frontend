"use client";

import MoviePosterCard from "../shared/cards/MoviePosterCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { getAllMoviesByFilter } from "@/services/movie";
import { TMovie } from "@/types/movie.type";

const EditorsPick = () => {

  
    const [moviesData, setMoviesData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const TopRatedMovies = await getAllMoviesByFilter('isTrending', true,10);
        setMoviesData(TopRatedMovies?.data?.data || []);
      };
      fetchData()
    }, []);
  return (
    <div className="py-10 container mx-auto px-4">
      <h1 className="border-l-4 border-[#800000] pl-3 text-xl font-bold mb-5">
        Editors Pick
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
          align: "start",
          loop: true,
        }}
        className="w-full py-5"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {moviesData?.map((movie:TMovie) => (
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

export default EditorsPick;
