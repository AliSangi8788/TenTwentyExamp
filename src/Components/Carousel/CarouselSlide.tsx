import React, { useState } from "react";
import HoverCircle from "../HoverCircle";

interface SlideProps {
  slide: {
    id: number;
    image: string;
    client: string;
    location: string;
  };
  style: React.CSSProperties;
  isActive: boolean;
}

const CarouselSlide: React.FC<SlideProps> = ({ slide, style, isActive }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className={`relative w-full h-full bg-white overflow-hidden transform-gpu ${
        isActive ? "shadow-lg" : "shadow-md"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={style}
    >
      {/* Image */}
      <div
        className="w-full h-full bg-cover bg-center relative transition-all duration-500"
        style={{ backgroundImage: `url(${slide.image})` }}
      >
        {/* Hover circle effect */}
        <HoverCircle isVisible={isHovering} position={mousePos} />
      </div>
    </div>
  );
};

export default CarouselSlide;
