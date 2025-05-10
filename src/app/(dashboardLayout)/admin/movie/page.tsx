import AllMedia from "@/components/modules/adminDashboard/Movie";
import { AddMediaDialog } from "@/components/modules/adminDashboard/Movie/AddMovies";

export const metadata = {
  title: "FlimNest | Media-Dashboard",
  description: "This is for media dashboard",
};

const MediaPage = async () => {
  return (
    <div className="mt-12">
      <AddMediaDialog />
      <AllMedia/>
    </div>
  );
};

export default MediaPage;
