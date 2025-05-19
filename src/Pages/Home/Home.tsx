import DragCarouselSlider from "../../Components/Carousel/DragCarouselSlider";
import HeroSlider from "../../Components/HeroSilder/HeroSlider";

const Home = () => {
  return (
    <div>
      <HeroSlider />
      <div className="pt-20 md:pt-40 px-4 md:px-0">
        <h1 className="font-wroksans text-black text-3xl md:text-[56px] text-center">
          Quality Products
        </h1>
        <p className="font-wroksans text-lg md:text-2xl text-[#7A7777] text-center p-4 md:p-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
      <div className="px-4 md:px-0">
        <DragCarouselSlider />
      </div>
    </div>
  );
};

export default Home;
