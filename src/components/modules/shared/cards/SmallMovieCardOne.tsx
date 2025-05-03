import { TMoviePosterCardProps } from "@/types/props.type";
import Image from "next/image";
import React from "react";

const SmallMovieCardOne = ({ movie }: { movie: TMoviePosterCardProps }) => {
  const { name, id, image } = movie;
  const watchTime = id * Math.floor(Math.random() * 2) + 1;
  return (
    <div className="relative w-40 h-52 rounded-lg overflow-hidden shadow shadow-[#800000] group cursor-pointer">
      <Image src={image} alt={name} fill className="object-cover" />
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-red-500 px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-sm font-semibold">{name}</h3>
        <span className="text-xs text-zinc-300">{watchTime} hr watchtime</span>
      </div>
    </div>
  );
};

export default SmallMovieCardOne;
