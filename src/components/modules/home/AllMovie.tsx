"use client";

import LoadingPage from "@/app/loading";
import SmallMovieCardOne from "@/components/modules/shared/cards/SmallMovieCardOne";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAllMovies from "@/hooks/useMovie";
import { TSearchBarOne } from "@/types/form.type";
import { TMovie } from "@/types/movie.type";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const AllMovie = () => {
  const { allMovies: initialMovies, loading } = useAllMovies();
  const [filteredMovies, setFilteredMovies] = useState<TMovie[]>([]);

  const genres = [
    "Action",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Romance",
    "Sci-Fi",
    "Thriller",
  ];
  const sortBy = ["Highest Rated", "Most Reviewes", "Latest Released"];
  const platforms = [
    "Netflix",
    "Amazon Prime",
    "Disney+",
    "HBO Max",
    "Apple TV+",
  ];
  const years = Array.from({ length: 25 }, (_, i) => `${2025 - i}`);
  const rating = Array.from({ length: 10 }, (_, i) => `${i + 1}`);

  const form = useForm<TSearchBarOne>({
    defaultValues: {
      query: "",
      sortBy: "",
      genre: "",
      platform: "",
      year: "",
      totalRating: "",
    },
  });

  useEffect(() => {
    if (!loading && initialMovies) {
      setFilteredMovies(initialMovies as TMovie[]);
    }
  }, [initialMovies, loading]);

  useEffect(() => {
    const subscription = form.watch((filters) => {
      if (loading || !initialMovies) return;

      let result = [...initialMovies];

      if (filters.query) {
        result = result.filter(
          (movie) =>
            movie.title.toLowerCase().includes(filters.query!.toLowerCase()) ||
            (movie.director &&
              movie.director
                .toLowerCase()
                .includes(filters?.query!.toLowerCase()))
        );
      }

      if (filters.genre) {
        result = result.filter((movie) =>
          movie.genres?.includes(filters.genre || "")
        );
      }

      if (filters.platform) {
        result = result.filter((movie) =>
          movie.platforms?.includes(filters.platform || "")
        );
      }

      if (filters.year) {
        result = result.filter(
          (movie) => String(movie.releaseYear) === filters.year
        );
      }

      if (filters.totalRating) {
        result = result.filter(
          (movie) => String(movie.totalRating) === filters.totalRating
        );
      }



      if (filters.sortBy) {
        switch (filters.sortBy) {
          case "Highest Rated":
            result.sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0));
            break;
          case "Most Reviewes":
            result.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
            break;
          case "Latest Released":
            result.sort(
              (a, b) => Number(b.releaseYear) - Number(a.releaseYear)
            );
            break;
        }
      }

      setFilteredMovies(result as TMovie[]);
    });

    return () => subscription.unsubscribe();
  }, [initialMovies, loading, form]);

  const handleReset = () => {
    form.reset();
    setFilteredMovies(initialMovies || []);
  };

  if (loading) return <LoadingPage />;

  return (
    <div className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">All Movies</h1>
      <div className="flex flex-col md:flex-row gap-4 min-h-screen">
        {/* Movie List */}
        <div className="w-full md:w-9/12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredMovies && filteredMovies?.length > 0 ? (
              filteredMovies?.map((movie: TMovie) => (
                <SmallMovieCardOne key={movie.id} movie={movie} />
              ))
            ) : (
              <p className="text-white col-span-full text-center text-lg mt-10">
                No movies found for the given filters.
              </p>
            )}
          </div>
        </div>

        {/* Sidebar Filters */}
        <div className="w-full md:w-3/12 sticky top-16 self-start z-10 space-y-6">
          {/* Search Field */}
          <div>
            <Form {...form}>
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Search movies or series..."
                    className="bg-zinc-800 text-white placeholder:text-gray-400 border border-zinc-700"
                    {...form.register("query")}
                  />
                </FormControl>
              </FormItem>
            </Form>
          </div>

          {/* Filter Form */}
          <div>
            <p className="w-full border-b-2 border-red-600 mb-5">
              Filter Options
            </p>
            <Form {...form}>
              <form className="space-y-4">
                {/* Genre Filter */}
                <FormField
                  control={form.control}
                  name="genre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Genre</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="bg-zinc-800 text-white border border-zinc-700 w-full">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900 text-white">
                            {genres.map((g) => (
                              <SelectItem key={g} value={g}>
                                {g}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Platform Filter */}
                <FormField
                  control={form.control}
                  name="platform"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Platform</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="bg-zinc-800 text-white border border-zinc-700 w-full">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900 text-white">
                            {platforms.map((p) => (
                              <SelectItem key={p} value={p}>
                                {p}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Sort By Filter */}
                <FormField
                  control={form.control}
                  name="sortBy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Sort By</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="bg-zinc-800 text-white border border-zinc-700 w-full">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900 text-white">
                            {sortBy.map((p) => (
                              <SelectItem key={p} value={p}>
                                {p}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Rating Filter */}
                <FormField
                  control={form.control}
                  name="totalRating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Rating</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="bg-zinc-800 text-white border border-zinc-700 w-full">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900 text-white max-h-60 overflow-auto">
                            {rating.map((y) => (
                              <SelectItem key={y} value={y}>
                                {y}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Year Filter */}
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Year</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="bg-zinc-800 text-white border border-zinc-700 w-full">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900 text-white max-h-60 overflow-auto">
                            {years.map((y) => (
                              <SelectItem key={y} value={y}>
                                {y}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Buttons */}
                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    onClick={handleReset}
                    variant={"customOutlined"}
                  >
                    Reset Filter
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllMovie;
