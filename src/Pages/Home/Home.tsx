import DragCarouselSlider from "../../Components/Carousel/DragCarouselSlider";
import HeroSlider from "../../Components/HeroSilder/HeroSlider";

const Home = () => {
  return (
    <div>
      <HeroSlider />
      <div className="pt-40">
        <h1 className="font-wroksans text-black text-[56px] text-center">
          Quality Products
        </h1>
        <p className="font-wroksans text-2xl text-[#7A7777] text-center p-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <br />
          eiusmod tempor incididunt ut labore et dolore magna aliqua. <br /> Ut
          enim ad minim veniam, quis nostrud exercitation ullamco <br /> laboris
          nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
      <DragCarouselSlider />
    </div>
  );
};

export default Home;
