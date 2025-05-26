"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { X } from "lucide-react";
import { updateMovie } from "@/services/movie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export enum MediaType {
  MOVIE = "MOVIE",
  SERIES = "SERIES",
}

type MovieFormData = {
  id: string;
  title: string;
  synopsis: string;
  genres: string[];
  type: MediaType;
  releaseYear: number;
  director: string;
  cast: string[] | string;
  platforms: string[];
  buyPrice: number;
  rentPrice: number;
  discountPercentage: number;
  thumbnail: File | null;
  streamingLink: string;
  isTrending: boolean;
};

const UpdateMovieForm = ({ movieData }: { movieData: MovieFormData }) => {
  const allGenres = [
    "Action",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Romance",
    "Sci-Fi",
    "Thriller",
  ];
  const allPlatforms = [
    "Netflix",
    "Amazon Prime",
    "Disney+",
    "HBO Max",
    "Apple TV+",
  ];

  const [genres, setGenres] = useState<string[]>(movieData.genres || []);
  const [platforms, setPlatforms] = useState<string[]>(
    movieData.platforms || []
  );
  const [mediaType, setMediaType] = useState<MediaType>(
    movieData.type || MediaType.MOVIE
  );
  const [isTrending, setIsTrending] = useState(movieData.isTrending || false);
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MovieFormData>({
    defaultValues: {
      title: movieData.title,
      synopsis: movieData.synopsis,
      genres: movieData.genres,
      type: movieData.type,
      releaseYear: movieData.releaseYear,
      director: movieData.director,
      cast: Array.isArray(movieData.cast)
        ? movieData.cast.join(", ")
        : movieData.cast,
      platforms: movieData.platforms,
      buyPrice: movieData.buyPrice,
      rentPrice: movieData.rentPrice,
      discountPercentage: movieData.discountPercentage,
      thumbnail: movieData.thumbnail,
      streamingLink: movieData.streamingLink,
      isTrending: movieData.isTrending,
    },
  });

  useEffect(() => {
    if (movieData.thumbnail && typeof movieData.thumbnail !== "string") {
      const objectUrl = URL.createObjectURL(movieData.thumbnail);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (typeof movieData.thumbnail === "string") {
      setPreview(movieData.thumbnail);
    }
  }, [movieData.thumbnail]);

  const toggleGenre = (genre: string) => {
    const updated = genres.includes(genre)
      ? genres.filter((g) => g !== genre)
      : [...genres, genre];
    setGenres(updated);
    setValue("genres", updated);
  };

  const togglePlatform = (platform: string) => {
    const updated = platforms.includes(platform)
      ? platforms.filter((p) => p !== platform)
      : [...platforms, platform];
    setPlatforms(updated);
    setValue("platforms", updated);
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("thumbnail", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit: SubmitHandler<MovieFormData> = async (data) => {
    data.genres = genres;
    data.platforms = platforms;
    data.type = mediaType;
    data.isTrending = isTrending;
    data.cast =
      typeof data.cast === "string"
        ? data.cast.split(",").map((c) => c.trim())
        : data.cast;

    const parsedData = {
      ...data,
      buyPrice: Number(data.buyPrice),
      rentPrice: Number(data.rentPrice),
      releaseYear: Number(data.releaseYear),
      discountPercentage: Number(data.discountPercentage),
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(parsedData));
    formData.append("file", data.thumbnail!);

    try {
      const res = await updateMovie(movieData.id, formData);
      console.log(res);
      if (res.success) {
        toast.success(res.message || "Media updated successfully");
        router.push("/admin/movie");
      } else {
        toast.error(res.message || "Could not update media");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-2xl border border-gray-700">
      <h2 className="text-3xl font-bold mb-8 text-center text-white bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        Update Media
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-gray-300">
            Title
          </Label>
          <Input
            id="title"
            {...register("title", { required: "Title is required" })}
            className="bg-gray-700 text-white"
          />
          {errors.title && (
            <p className="text-sm text-red-400">{errors.title.message}</p>
          )}
        </div>

        {/* Year & Director */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="releaseYear" className="text-gray-300">
              Release Year
            </Label>
            <Input
              type="number"
              {...register("releaseYear", {
                required: "Release year is required",
              })}
              className="bg-gray-700 text-white"
            />
            {errors.releaseYear && (
              <p className="text-sm text-red-400">
                {errors.releaseYear.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="director" className="text-gray-300">
              Director
            </Label>
            <Input
              {...register("director", { required: "Director is required" })}
              className="bg-gray-700 text-white"
            />
            {errors.director && (
              <p className="text-sm text-red-400">{errors.director.message}</p>
            )}
          </div>
        </div>

        {/* Media Type */}
        <div className="space-y-2">
          <Label className="text-gray-300">Media Type</Label>
          <Select
            value={mediaType}
            onValueChange={(val: MediaType) => setMediaType(val)}
          >
            <SelectTrigger className="bg-gray-700 text-white">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-white">
              <SelectItem value={MediaType.MOVIE}>Movie</SelectItem>
              <SelectItem value={MediaType.SERIES}>Series</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Genres */}
        <div className="space-y-2">
          <Label className="text-gray-300">Genres</Label>
          <div className="flex flex-wrap gap-3 cursor-pointer">
            {allGenres.map((genre) => (
              <div
                key={genre}
                className="flex items-center cursor-pointer space-x-2"
              >
                <Checkbox
                  checked={genres.includes(genre)}
                  onCheckedChange={() => toggleGenre(genre)}
                  className={`cursor-pointer `}
                />
                <Label className="text-gray-300">{genre}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Platforms */}
        <div className="space-y-2">
          <Label className="text-gray-300">Platforms</Label>
          <div className="flex flex-wrap gap-3">
            {allPlatforms.map((platform) => (
              <div key={platform} className="flex items-center space-x-2">
                <Checkbox
                  checked={platforms.includes(platform)}
                  onCheckedChange={() => togglePlatform(platform)}
                  className="cursor-pointer"
                />
                <Label className="text-gray-300">{platform}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Cast */}
        <div className="space-y-2">
          <Label htmlFor="cast" className="text-gray-300">
            Cast (comma separated)
          </Label>
          <Input
            {...register("cast", { required: "Cast is required" })}
            className="bg-gray-700 text-white"
          />
          {errors.cast && (
            <p className="text-sm text-red-400">{errors.cast.message}</p>
          )}
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="buyPrice" className="text-gray-300">
              Buy Price
            </Label>
            <Input
              id="buyPrice"
              type="number"
              {...register("buyPrice")}
              className="bg-gray-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rentPrice" className="text-gray-300">
              Rent Price
            </Label>
            <Input
              id="rentPrice"
              type="number"
              {...register("rentPrice")}
              className="bg-gray-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="discountPercentage" className="text-gray-300">
              Discount Percentage %
            </Label>
            <Input
              id="discountPercentage"
              type="number"
              {...register("discountPercentage")}
              className="bg-gray-700 text-white"
            />
          </div>
        </div>

        {/* Streaming Link */}
        <div className="space-y-2">
          <Label htmlFor="streamingLink" className="text-gray-300">
            Streaming Link
          </Label>
          <Input
            {...register("streamingLink", {
              required: "Streaming link is required",
            })}
            className="bg-gray-700 text-white"
          />
          {errors.streamingLink && (
            <p className="text-sm text-red-400">
              {errors.streamingLink.message}
            </p>
          )}
        </div>

        {/* Synopsis */}
        <div className="space-y-2">
          <Label className="text-gray-300">Synopsis</Label>
          <Textarea
            {...register("synopsis", { required: "Synopsis is required" })}
            className="bg-gray-700 text-white"
          />
          {errors.synopsis && (
            <p className="text-sm text-red-400">{errors.synopsis.message}</p>
          )}
        </div>

        {/* Thumbnail */}
        <div className="space-y-2">
          <Label className="text-gray-300">Thumbnail</Label>
          <div className="flex items-center gap-4">
            {!preview && (
              <Input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="bg-gray-700 text-white cursor-pointer"
              />
            )}

            {typeof preview === "string" && preview.trim() !== "" && (
              <div className="relative group">
                <Image
                  src={preview}
                  alt="Preview"
                  width={120}
                  height={120}
                  className="rounded"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreview(null);
                    setValue("thumbnail", null);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Trending */}
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={isTrending}
            onCheckedChange={() => setIsTrending(!isTrending)}
          />
          <Label className="text-gray-300">Mark as Trending</Label>
        </div>

        <Button
          type="submit"
          className="bg-red-600 text-white py-3 px-6 rounded hover:bg-red-700 cursor-pointer transition-colors duration-200 ease-in-out"
        >
          Update Movie
        </Button>
      </form>
    </div>
  );
};

export default UpdateMovieForm;
