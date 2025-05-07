import AllMedia from "@/components/modules/adminDashboard/Movie";
import { AddMediaDialog } from "@/components/modules/adminDashboard/Movie/AddMovies";
import { getAllMovies } from "@/services/movie";

export const metadata = {
  title: "FlimNest | Media-Dashboard",
  description: "This is for media dashboard",
};

const MediaPage = async () => {
  const { data } = await getAllMovies();
  const allMovies = data?.data;

  return (
    <div className="mt-12">
      <AddMediaDialog />
      <AllMedia mediaData={allMovies} />
    </div>
  );
};

export default MediaPage;
