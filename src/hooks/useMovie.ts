"use client";

import { getAllMovies } from "@/services/movie";
import { TMovie } from "@/types/movie.type";
import { useEffect, useState, useMemo } from "react";

interface Movie {
  [x: string]: any;
  id: string;
  title: string;
  genres: string[];
  platforms: string[];
  releaseYear: number;
}

interface FilterOptions {
  searchTerm?: string;
  genre?: string;
  platform?: string;
  year?: string;
}

const useAllMovies = (initialFilters?: FilterOptions) => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [metaData, setMetaData] = useState({});
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>(initialFilters || {});

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const { data } = await getAllMovies();
        setAllMovies(data?.data);
        setMetaData(data?.meta);
      } catch (err) {
        console.error("Failed to fetch movies", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = useMemo(() => {
    return allMovies?.filter((movie) => {
      const matchesSearch =
        !filters.searchTerm ||
        movie.title.toLowerCase().includes(filters.searchTerm.toLowerCase());

      const matchesGenre =
        !filters.genre ||
        (movie.genres && movie.genres.includes(filters.genre));

      const matchesPlatform =
        !filters.platform ||
        (movie.platforms && movie.platforms.includes(filters.platform));

      const matchesYear =
        !filters.year || movie.releaseYear.toString() === filters.year;

      return matchesSearch && matchesGenre && matchesPlatform && matchesYear;
    });
  }, [allMovies, filters]);

  const updateFilters = (newFilters: FilterOptions) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({});
  };

  const filterOptions = useMemo(() => {
    const genres = Array?.from(
      new Set(allMovies?.flatMap((movie) => movie.genres || []))
    );
    const platforms = Array?.from(
      new Set(allMovies?.flatMap((movie) => movie.platforms || []))
    );
    const years = Array?.from(
      new Set(allMovies?.map((movie) => movie.releaseYear.toString()))
    ).sort((a, b) => parseInt(b) - parseInt(a));

    return { genres, platforms, years };
  }, [allMovies]);

  return {
    allMovies: allMovies as TMovie[],
    filteredMovies,
    loading,
    metaData,
    filters,
    filterOptions,
    updateFilters,
    resetFilters,
  };
};

export default useAllMovies;