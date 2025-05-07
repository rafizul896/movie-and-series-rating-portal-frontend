import UpdateMovieForm from "@/components/modules/adminDashboard/Movie/UpdateMovie";
import { getSingleMovie } from "@/services/movie";

export const metadata = {
  title: "FlimNest | Media-Update",
  description: "This is for media data update",
};

const UpdateMovie = async ({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) => {
  const { movieId } = await params;
  const { data } = await getSingleMovie(movieId);
  const movieData = data.data;

  return (
    <div>
      <UpdateMovieForm movieData={movieData} />
    </div>
  );
};

export default UpdateMovie;
