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

import { useForm } from "react-hook-form";

const AllMoviesPage = () => {
  const { allMovies: moviesData, loading } = useAllMovies();

  const genres = ["Action", "Drama", "Comedy", "Thriller"];
  const sortBy = ["Highest Rated", "Most Reviewes", "Latest Released"];
  const platforms = ["Netflix", "Disney+", "Amazon Prime", "Hulu"];
  const years = Array.from({ length: 25 }, (_, i) => `${2025 - i}`);
  // const { allMovies, loading } = useAllMovies();
  // console.log("all movies", moviesData);
  const form = useForm<TSearchBarOne>({
    defaultValues: {
      query: "",
      sortBy: "",
      genre: "",
      platform: "",
      year: "",
    },
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    form.setValue("query", value);
    console.log("Search Query:", value);
  };

  const handleFilter = (data: TSearchBarOne) => {
    const filterPayload = {
      genre: data.genre,
      platform: data.platform,
      year: data.year,
      sortBy: data.sortBy,
    };
    console.log("Filter Query:", filterPayload);
  };

  const handleReset = () => {
    form.reset();
    console.log("Form Reset");
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-4 min-h-screen">
        {/* Left Section: Movie Cards */}
        <div className="w-full md:w-9/12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {moviesData?.map((movie: TMovie) => (
              <SmallMovieCardOne key={movie.id} movie={movie} />
            ))}
          </div>
        </div>

        {/* Right Sidebar: Search & Filter */}
        <div className="w-full md:w-3/12 sticky top-16 self-start z-10 space-y-6">
          {/* Search Box */}
          <div>
            <Form {...form}>
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Search movies or series..."
                    className="bg-zinc-800 text-white placeholder:text-gray-400 border border-zinc-700"
                    value={form.watch("query")}
                    onChange={handleSearchChange}
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
              <form
                onSubmit={form.handleSubmit(handleFilter)}
                className="space-y-4"
              >
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
                {/* SortBy Filter */}
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
                  <Button type="submit" variant={"custom"}>
                    Add Filter
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

export default AllMoviesPage;
