"use client";

import { Button } from "@/components/ui/button";
import SmallMovieCardOne from "../shared/cards/SmallMovieCardOne";
import SearchBarOne from "../shared/searchBar/SearchBarOne";
import { useForm } from "react-hook-form";
import { TSearchBarOne } from "@/types/form.type";
import { TMovie } from "@/types/movie.type";
import useAllMovies from "@/hooks/useMovie";
import LoadingPage from "@/app/loading";

const Movies = () => {
  const { allMovies: moviesData, loading } = useAllMovies();

  const form = useForm<TSearchBarOne>({
    defaultValues: {
      query: "",
      genre: "",
      platform: "",
      year: "",
    },
  });

  const onSubmit = (data: TSearchBarOne) => {
    console.log("Received Search Data:", data);
    // Add your filtering logic here
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div>
      <SearchBarOne form={form} onSubmit={onSubmit} />
      <div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 items-center justify-center mt-6 max-w-6xl mx-auto px-4">
          {moviesData?.map((movie: TMovie) => (
            <SmallMovieCardOne key={movie.id} movie={movie} />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Button variant={"custom"}>View more</Button>
        </div>
      </div>
    </div>
  );
};

export default Movies;
