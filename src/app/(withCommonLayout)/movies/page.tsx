import AllMovie from "@/components/modules/home/AllMovie";
import React from "react";

export const metadata = {
  title: "FlimNest | All-Movies",
  description: "This is for all movies page",
};

const AllMoviePage = () => {
  return (
    <div>
      <AllMovie />
    </div>
  );
};

export default AllMoviePage;
