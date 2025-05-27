import Banner from "@/components/modules/home/Banner";
import EditorsPick from "@/components/modules/home/EditorsPick";
import FeaturedMovie from "@/components/modules/home/FeaturedMovie";
import NewArrived from "@/components/modules/home/NewArrived";
import TopRated from "@/components/modules/home/TopRated";
import UserNewsletterSection from "@/components/modules/UserNewsLetter/UserNewsLetter";

const HomePage = async () => {
  return (
    <div>
      <Banner />
      <NewArrived />
      <FeaturedMovie />
      <TopRated />
      <EditorsPick />
      <UserNewsletterSection/>
    </div>
  );
};

export default HomePage;
