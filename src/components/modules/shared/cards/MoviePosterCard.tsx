import { TMoviePosterCardProps } from "@/types/props.type";
import Image from "next/image";

const MoviePosterCard = ({ movie }: { movie: TMoviePosterCardProps }) => {
  const { name, id, image } = movie;
  console.log(name, id, image);
  return (
    <div className="relative h-72 md:h-80 w-48 md:w-60 rounded-lg overflow-hidden shadow-2xl shadow-[#800000] group cursor-pointer">
      {/* Movie Image */}
      <Image src={image} alt={name} fill className="object-cover" />

      {/* Dark Overlay on Hover */}
      <div className="absolute inset-0 bg-black/60 bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white text-center p-4">
        <h3 className="text-lg font-bold mb-2">{name}</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis</p>
      </div>
    </div>
  );
};

export default MoviePosterCard;
