import UpdateMovieForm from "@/components/modules/adminDashboard/Movie/UpdateMovie";

import { getSingleMovieDetails } from "@/services/movie";

export const metadata = {
  title: "FlimNest | Media-Update",
  description: "This is for media data update",
};

const UpdateMovie = async ({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) => {
  // const { user } = useUser();
  const { movieId } = await params;
  const { data } = await getSingleMovieDetails(movieId);
  const movieData = data?.data;

  return (
    <div>
      <UpdateMovieForm movieData={movieData} />
    </div>
  );
};

export default UpdateMovie;
