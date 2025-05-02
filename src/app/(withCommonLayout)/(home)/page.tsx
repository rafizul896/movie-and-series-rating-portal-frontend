import Banner from "@/components/modules/home/Banner";
import EditorsPick from "@/components/modules/home/EditorsPick";
import NewArrived from "@/components/modules/home/NewArrived";
import TopRated from "@/components/modules/home/TopRated";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <NewArrived />
      <TopRated />
      <EditorsPick />
    </div>
  );
};

export default HomePage;
