"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { addMovie } from "@/services/movie";
import { toast } from "sonner";

export enum MediaType {
  MOVIE = "MOVIE",
  SERIES = "SERIES",
}

type MovieFormData = {
  title: string;
  synopsis: string;
  genres: string[];
  type: MediaType;
  releaseYear: number;
  director: string;
  cast: string[];
  platforms: string[];
  buyPrice: number;
  rentPrice: number;
  discountPrice: number;
  thumbnail: File | null;
  streamingLink: string;
  isTrending: boolean;
};

export function AddMediaDialog() {
  const [genres, setGenres] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [mediaType, setMediaType] = useState<MediaType>(MediaType.MOVIE);
  const [isTrending, setIsTrending] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<MovieFormData>();

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

  const onSubmit: SubmitHandler<MovieFormData> = async (data) => {
    data.genres = genres;
    data.platforms = platforms;
    data.type = mediaType;
    data.isTrending = isTrending;
    data.cast = data.cast.split(",").map((c: string) => c.trim());

    // Convert number fields from string to number
    const parsedData = {
      ...data,
      buyPrice: Number(data.buyPrice),
      rentPrice: Number(data.rentPrice),
      releaseYear: Number(data.releaseYear),
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(parsedData));
    formData.append("file", data.thumbnail!);

    try {
      const res = await addMovie(formData);
      if (res.success) {
        toast.success(res.message || "Media added successfully");
        setIsOpen(false);
        reset();
        setGenres([]);
        setPlatforms([]);
        setIsTrending(false);
        setMediaType(MediaType.MOVIE);
        setPreview(null);
      } else if (res.error) {
        toast.error(res.error || "Media added failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("thumbnail", file); // Manually set the thumbnail file
      setPreview(URL.createObjectURL(file)); // Preview image
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer ">Add Movie/Series</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-900 text-black dark:text-white">
        <DialogHeader>
          <DialogTitle>Add New Media</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          {/* Title */}
          <div>
            <Label className="mb-2" htmlFor="title">
              Title
            </Label>
            <Input
              id="title"
              className="bg-white dark:bg-zinc-800"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Release Year */}
          <div>
            <Label className="mb-2" htmlFor="releaseYear">
              Release Year
            </Label>
            <Input
              id="releaseYear"
              type="number"
              className="bg-white dark:bg-zinc-800"
              {...register("releaseYear", {
                required: "Release year is required",
              })}
            />
            {errors.releaseYear && (
              <p className="text-red-500 text-sm">
                {errors.releaseYear.message}
              </p>
            )}
          </div>

          {/* Director */}
          <div>
            <Label className="mb-2" htmlFor="director">
              Director
            </Label>
            <Input
              id="director"
              className="bg-white dark:bg-zinc-800"
              {...register("director", { required: "Director is required" })}
            />
            {errors.director && (
              <p className="text-red-500 text-sm">{errors.director.message}</p>
            )}
          </div>

          {/* Media Type */}
          <div>
            <Label className="mb-2">Media Type</Label>
            <Select
              value={mediaType}
              onValueChange={(v: any) => setMediaType(v)}
            >
              <SelectTrigger className="bg-white dark:bg-zinc-800">
                <SelectValue placeholder="Select media type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MOVIE">Movie</SelectItem>
                <SelectItem value="SERIES">TV Series</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Genres */}
          <div>
            <Label className="mb-2">Genres</Label>
            <div className="flex flex-wrap gap-2">
              {allGenres.map((genre) => (
                <div key={genre} className="flex items-center space-x-2">
                  <Checkbox
                    id={`genre-${genre}`}
                    checked={genres.includes(genre)}
                    onCheckedChange={() => toggleGenre(genre)}
                  />
                  <Label htmlFor={`genre-${genre}`}>{genre}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Platforms */}
          <div>
            <Label className="mb-2">Platforms</Label>
            <div className="flex flex-wrap gap-2">
              {allPlatforms.map((platform) => (
                <div key={platform} className="flex items-center space-x-2">
                  <Checkbox
                    id={`platform-${platform}`}
                    checked={platforms.includes(platform)}
                    onCheckedChange={() => togglePlatform(platform)}
                  />
                  <Label htmlFor={`platform-${platform}`}>{platform}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Cast */}
          <div>
            <Label className="mb-2" htmlFor="cast">
              Cast (comma separated)
            </Label>
            <Input
              id="cast"
              className="bg-white dark:bg-zinc-800"
              {...register("cast", { required: "Cast is required" })}
            />
            {errors.cast && (
              <p className="text-red-500 text-sm">{errors.cast.message}</p>
            )}
          </div>

          {/* Prices */}
          {["buyPrice", "rentPrice"].map((field) => (
            <div key={field}>
              <Label className="mb-2" htmlFor={field}></Label>
              <Input
                id={field}
                type="number"
                min={0}
                className="bg-white dark:bg-zinc-800"
                {...register(field as keyof MovieFormData)}
              />
            </div>
          ))}

          {/* Thumbnail */}
          <div>
            <Label className="mb-2" htmlFor="thumbnail">
              Thumbnail
            </Label>
            <Input
              id="thumbnail"
              type="file"
              accept="image/*"
              className="bg-white dark:bg-zinc-800"
              onChange={handleThumbnailChange}
              required
            />
            {errors.thumbnail && (
              <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>
            )}
            {preview && (
              <Image
                src={preview}
                alt="Preview"
                width={200}
                height={200}
                className="mt-2 w-32 h-32 object-cover rounded"
              />
            )}
          </div>

          {/* Streaming Link */}
          <div>
            <Label className="mb-2" htmlFor="streamingLink">
              Streaming Link
            </Label>
            <Input
              id="streamingLink"
              className="bg-white dark:bg-zinc-800"
              {...register("streamingLink", { required: "Link is required" })}
            />
            {errors.streamingLink && (
              <p className="text-red-500 text-sm">
                {errors.streamingLink.message}
              </p>
            )}
          </div>

          {/* Synopsis */}
          <div>
            <Label className="mb-2" htmlFor="synopsis">
              Description
            </Label>
            <Textarea
              id="synopsis"
              rows={3}
              className="bg-white dark:bg-zinc-800"
              {...register("synopsis", { required: "Description is required" })}
            />
            {errors.synopsis && (
              <p className="text-red-500 text-sm">{errors.synopsis.message}</p>
            )}
          </div>

          {/* Trending */}
          <div className="flex items-center space-x-2 mb-2">
            <Checkbox
              id="trending"
              checked={isTrending}
              onCheckedChange={() => setIsTrending(!isTrending)}
            />
            <Label htmlFor="trending">Mark as trending</Label>
          </div>

          <DialogFooter>
            <Button
              // onClick={() => setIsOpen(false)}
              className="cursor-pointer"
              type="submit"
            >
              Add Media
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
