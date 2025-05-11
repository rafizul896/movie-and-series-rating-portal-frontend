import { getAllMovies } from "@/services/movie";
import Movies from "./Movies";

const FeaturedMovie = async () => {
  const { data } = await getAllMovies();
  const allMovies = data?.data?.slice(0,10);

  return (
    <div>
      <Movies movies={allMovies} />
    </div>
  );
};

export default FeaturedMovie;
