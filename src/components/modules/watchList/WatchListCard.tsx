import { Clock, Delete, DeleteIcon, Play, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";

interface WatchListCardProps {
  id: string;
  movieId: string;
  onRemove?: (id: string) => void;
  title: string;
  releaseYear: number;
  createdAt: string;
  avgRating: number;
  genres: string[];
  synopsis: string;
  buyPrice: number;
  rentPrice: number;
  thumbnail: string;
}

export default function WatchListCard({
  id,
  title,
  releaseYear,
  createdAt,
  avgRating,
  genres,
  synopsis,
  buyPrice,
  rentPrice,
  thumbnail,
  onRemove,
}: WatchListCardProps) {
  return (
    <Card className="w-64 overflow-hidden bg-[#1a1d29] text-white border-none shadow shadow-[#800000] group relative rounded-lg">
      <div className="relative">
        <Image
          src={thumbnail || "/placeholder.svg"}
          alt={title || "Movie Thumbnail"}
          width={300}
          height={500}
          className="w-full -mt-2 h-80 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Badge on hover */}
        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Badge className="bg-red-600 hover:bg-red-700 text-white">
            Movie
          </Badge>
        </div>

        {/* Rating on hover */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium">{avgRating}</span>
        </div>

        {/* Watch Now button on hover */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Link href={`/watchlist/${id}`}>
        <Button className="bg-red-600 hover:bg-red-700 text-white flex items-center cursor-pointer gap-2">
            <Play className="h-4 w-4" />
            Watch Now
          </Button>
        </Link>
        </div>
      </div>

      {/* Always visible: title and release year */}
      <div className="p-4">
        <div className="text-xs text-gray-400">Release Year: {releaseYear}</div>
        <h3 className="text-lg font-semibold text-red-500">{title}</h3>
      </div>

      {/* Hover-only: genres, synopsis, and footer */}
      {/* <CardContent className="p-4 pt-0 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    <div className="flex gap-2 flex-wrap">
      {genres.map((genre) => (
        <Badge
          key={genre}
          variant="outline"
          className="text-xs bg-transparent border-gray-700"
        >
          {genre}
        </Badge>
      ))}
    </div>
    <p className="text-xs text-gray-400 line-clamp-2">{synopsis}</p>
  </CardContent> */}

      <CardFooter className="p-4 pt-0 flex justify-between items-center ">
        <div>
          <span className="font-bold">${buyPrice}</span>
          <span className="text-xs text-gray-400"> | Rent: ${rentPrice}</span>
        </div>
        {onRemove ? (
          <div onClick={()=> onRemove(id)} className="flex items-center justify-center  p-2 rounded-full  hover:bg-black/70 transition-opacity duration-300 cursor-pointer" >
          <Trash2 className="h-4 w-4 text-red-500" />
          </div>
        ): (
          <div className="flex items-center justify-center  p-2 rounded-full  hover:bg-black/70 transition-opacity duration-300 cursor-pointer" >
          <Trash2 className="h-4 w-4 text-red-500" />
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
