import { Button } from "@/components/ui/button";
import { TMovie } from "@/types/movie.type";
import { TMoviePosterCardProps } from "@/types/props.type";
import Image from "next/image";
import Link from "next/link";

const MoviePosterCard = ({ movie }: { movie: TMovie }) => {
  const { id, thumbnail, title } = movie;
  return (
    
      <div className="relative h-64 md:h-72 w-48 md:w-52 rounded-lg overflow-hidden shadow-2xl shadow-[#800000] group cursor-pointer">
        {/* Movie Image */}
        <Image
          src={
            thumbnail ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoWcWg0E8pSjBNi0TtiZsqu8uD2PAr_K11DA&s"
          }
          alt={title || "Image"}
          fill
          className="rounded object-cover"
        />
        {/* Dark Overlay on Hover */}
        <div className="absolute inset-0 bg-black/30 bg-opacity-70 opacity-0 group-hover:opacity-90 transition-all duration-300 flex flex-col justify-center items-center text-white text-center p-4">
          <h3 className="text-lg font-bold mb-2">{title}</h3>
          <Link href={`/movies/${id}`}>
            <Button className="bg-red-600 hover:bg-red-700 text-white flex items-center cursor-pointer  gap-2">
              
              See more
            </Button>
          </Link>
        </div>
      </div>

  );
};

export default MoviePosterCard;
