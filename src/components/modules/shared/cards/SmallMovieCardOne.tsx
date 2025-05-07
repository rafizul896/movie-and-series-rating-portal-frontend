import { TMovie } from "@/types/movie.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SmallMovieCardOne = ({ movie }: { movie: TMovie }) => {
  return (
    <Link
      href={`movies/${movie.id}`}
      className="relative w-40 h-52 rounded-lg overflow-hidden shadow shadow-[#800000] group cursor-pointer"
    >
      <Image
        src={movie?.thumbnail}
        alt={movie.title}
        fill
        className="object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-red-500 px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-sm font-semibold">{movie.title}</h3>
        <span className="text-xs text-zinc-300"></span>
      </div>
    </Link>
  );
};

export default SmallMovieCardOne;
