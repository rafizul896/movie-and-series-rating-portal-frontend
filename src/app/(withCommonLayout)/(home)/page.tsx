import Banner from "@/components/modules/home/Banner";
import EditorsPick from "@/components/modules/home/EditorsPick";
import Movies from "@/components/modules/home/Movies";
import NewArrived from "@/components/modules/home/NewArrived";
import TopRated from "@/components/modules/home/TopRated";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <NewArrived />
      <Movies />
      <TopRated />
      <EditorsPick />
    </div>
  );
};

export default HomePage;
