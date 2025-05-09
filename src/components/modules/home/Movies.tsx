"use client";

import { Button } from "@/components/ui/button";
import SmallMovieCardOne from "../shared/cards/SmallMovieCardOne";
import { useForm } from "react-hook-form";
import { TSearchBarOne } from "@/types/form.type";
import { TMovie } from "@/types/movie.type";
import Link from "next/link";
import SearchBarOne from "../shared/searchBar/SearchBarOne";
import { useState, useEffect } from "react";

const Movies = ({ movies: initialMovies }: { movies: TMovie[] }) => {
  const [filteredMovies, setFilteredMovies] = useState<TMovie[]>(initialMovies);
  const [isClient, setIsClient] = useState(false);

  const form = useForm<TSearchBarOne>({
    defaultValues: {
      query: "",
      genre: "",
      platform: "",
      year: "",
    },
  });

  // Ensure we're on client-side before filtering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Apply filters whenever form values change
  useEffect(() => {
    if (!isClient) return;

    const subscription = form.watch((value) => {
      const filtered = initialMovies.filter((movie) => {
        // Search by title
        const matchesSearch =
          !value.query ||
          movie.title.toLowerCase().includes(value.query?.toLowerCase() || "");

        // Filter by genre
        const matchesGenre =
          !value.genre ||
          (movie.genres && movie.genres.includes(value.genre || ""));

        // Filter by platform
        const matchesPlatform =
          !value.platform ||
          (movie.platforms && movie.platforms.includes(value.platform || ""));

        // Filter by year
        const matchesYear =
          !value.year || movie.releaseYear.toString() === value.year;

        return matchesSearch && matchesGenre && matchesPlatform && matchesYear;
      });
      setFilteredMovies(filtered);
    });

    return () => subscription.unsubscribe();
  }, [form, initialMovies, isClient]);

  const onSubmit = (data: TSearchBarOne) => {
    console.log("Current filters:", data);
  };

  return (
    <div className="container mx-auto px-4">
      <SearchBarOne form={form} onSubmit={onSubmit} />

      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">
            {filteredMovies.length} Movies Found
          </h2>
        </div>

        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredMovies.map((movie: TMovie) => (
              <SmallMovieCardOne key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg text-gray-400">
              No movies found for the given filters
            </h3>
          </div>
        )}

        <div className="flex justify-center mt-10">
          <Link href="/movies">
            <Button className="px-8 py-3" variant={"custom"}>
              View More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Movies;
