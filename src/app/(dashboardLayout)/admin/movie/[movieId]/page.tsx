import UpdateMovieForm from "@/components/modules/adminDashboard/Movie/UpdateMovie";
import { useUser } from "@/context/UserContext";
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
  const { user } = useUser();
  const { movieId } = await params;
  const { data } = await getSingleMovie(movieId, user?.id as string || '');
  const movieData = data.data;

  return (
    <div>
      <UpdateMovieForm movieData={movieData} />
    </div>
  );
};

export default UpdateMovie;
