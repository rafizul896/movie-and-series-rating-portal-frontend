"use client";

import MoviePosterCard from "../shared/cards/MoviePosterCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const EditorsPick = () => {
  const movieData = [
    {
      id: 1,
      image:
        "https://wallpapercat.com/w/full/e/c/7/119551-1350x2160-samsung-hd-avengers-wallpaper.jpg",
      name: "Avengers",
    },
    {
      id: 2,
      image:
        "https://c8.alamy.com/comp/2R3X5EW/avatar-the-way-of-water-2022-directed-by-james-cameron-credit-20th-century-studios-album-2R3X5EW.jpg",
      name: "Avatar",
    },
    {
      id: 3,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREgcLgkRpfQc1BKAAb687ZZTeSsFw7XqJvnA&s",
      name: "Captain America 3",
    },
    {
      id: 4,
      image:
        "https://c8.alamy.com/comp/2WPWK4W/transformers-2007-directed-by-michael-bay-and-starring-shia-labeouf-megan-fox-and-josh-duhamel-an-ancient-struggle-between-two-cybertronian-races-the-heroic-autobots-and-the-evil-decepticons-comes-to-earth-with-a-clue-to-the-ultimate-power-held-by-a-teenager-photograph-of-an-original-2007-us-advance-poster-editorial-use-only-credit-bfa-paramount-pictures-2WPWK4W.jpg",
      name: "Transformers",
    },
    {
      id: 5,
      image: "https://cdn.europosters.eu/image/1300/81192.jpg",
      name: "Black Panthr",
    },
    {
      id: 6,
      image:
        "https://m.media-amazon.com/images/M/MV5BZTMyZTA0ZTItYjY3Yi00ODNjLWExYTgtYzgxZTk0NTg0Y2FlXkEyXkFqcGc@._V1_.jpg",
      name: "Black Widow",
    },
  ];

  return (
    <div className="py-10 max-w-6xl mx-auto">
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
          {movieData.map((movie) => (
            <CarouselItem
              key={movie.id}
              className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 lg:basis-1/4"
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
