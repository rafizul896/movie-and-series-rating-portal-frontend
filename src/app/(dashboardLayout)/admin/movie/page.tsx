import AllMedia from "@/components/modules/adminDashboard/Movie";
import { AddMediaDialog } from "@/components/modules/adminDashboard/Movie/AddMovies";
import { getAllMovies } from "@/services/movie";

const MediaPage = async () => {
  const { data } = await getAllMovies();
  const allMovies = data.data;
  console.log("all movie data ->", allMovies);

  return (
    <div className="mt-12">
      <AddMediaDialog />
      <AllMedia mediaData={allMovies} />
    </div>
  );
};

export default MediaPage;
