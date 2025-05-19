import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Navbar/Navbar";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "From our Farms to your hands",
    subtitle: "Welcome To TenTwenty Farms",
    image: "/Images/image.png",
  },
  {
    id: 2,
    title: "From our Farms to your hands",
    subtitle: "Welcome To TenTwenty Farms",
    image: "/Images/image1.png",
  },
  {
    id: 3,
    title: "From our Farms to your hands",
    subtitle: "Welcome To TenTwenty Farms",
    image: "/Images/image2.png",
  },
];

const HeroSlider: React.FC = () => {
  const [current, setCurrent] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const duration = 4000; // 5 seconds

  useEffect(() => {
    const animateProgress = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const percentage = Math.min((elapsed / duration) * 100, 100);
      setProgress(percentage);

      if (percentage < 100) {
        animationRef.current = requestAnimationFrame(animateProgress);
      } else {
        handleNext();
      }
    };

    animationRef.current = requestAnimationFrame(animateProgress);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      startTimeRef.current = 0;
    };
  }, [current]);

  const handleNext = () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    setProgress(0);
    startTimeRef.current = 0;
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div>
      <div className="relative w-full h-[600px] md:h-[900px] overflow-hidden">
        <div className="absolute top-4 left-4 right-4 inset-0 z-10">
          <Navbar />
        </div>
        <AnimatePresence mode="wait">
          {/* Background image — next image immediately visible */}
          <motion.div
            key={`background-${slides[current].id}`}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${slides[current].image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          {/* Animated overlay image — previous image animating out */}
          <motion.div
            key={`overlay-${slides[current].id}`}
            className="absolute inset-0"
            initial={{ clipPath: "inset(50% 0 50% 0)" }}
            animate={{ clipPath: "inset(0% 0 0% 0)" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{
              backgroundImage: `url(${slides[current].image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="w-full h-full flex items-center justify-start text-left text-white px-4 md:px-28">
              <div className="w-full md:w-[45%]">
                <p className="font-wroksans font-normal leading-[140%] tracking-normal text-sm md:text-base">
                  {slides[current].subtitle}
                </p>
                <h1 className="font-wroksans text-3xl md:text-[64px] font-normal leading-[140%] tracking-normal">
                  {slides[current].title}
                </h1>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Next Button with Smooth Progress Border */}
        <div className="absolute bottom-8 md:bottom-16 left-4 md:left-28 z-10">
          <button
            type="button"
            onClick={handleNext}
            className="relative w-[100px] h-[100px] md:w-[138px] md:h-[138px] text-black font-semibold rounded-none flex items-center justify-center cursor-pointer"
          >
            <span
              className={`font-wroksans text-white h-[70px] w-[70px] md:h-[96px] md:w-[96px] flex justify-center items-center bg-cover bg-center bg-no-repeat text-sm md:text-base`}
              style={{
                backgroundImage: `url(${
                  slides[(current + 1) % slides.length].image
                })`,
              }}
            >
              Next
            </span>
            <div
              className="absolute top-0 left-0 w-full h-full pointer-events-none transition-none z-10"
              style={{
                borderWidth: "8px",
                borderStyle: "solid",
                borderColor: "transparent",
                borderImage: `conic-gradient(from -45deg,#EEF4F9 ${progress}%, transparent ${progress}%) 1`,
                borderImageSlice: 1,
              }}
            />
            <div
              className="absolute top-0 left-0 w-[95%] h-[95%] m-0.5 pointer-events-none transition-none z-0"
              style={{
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "#EEF4F9",
              }}
            />
          </button>
        </div>
        <div className="absolute bottom-16 md:bottom-28 left-16 md:left-72 z-10 flex items-center gap-x-4">
          <p className="font-wroksans text-[#EEF4F9] text-sm md:text-base">0{current + 1}</p>
          <div className="border-t border-[#EEF4F9] w-[60px] md:w-[103px]"></div>
          <p className="font-wroksans text-[#EEF4F9] text-sm md:text-base">0{slides.length}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
