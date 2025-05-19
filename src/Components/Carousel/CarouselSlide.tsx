import React, { useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovering(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMobile) {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleTouchStart = () => {
    if (isMobile && isActive) {
      setIsHovering(true);
    }
  };

  const handleTouchEnd = () => {
    if (isMobile) {
      setIsHovering(false);
    }
  };

  return (
    <div
      className={`relative w-full h-full bg-white overflow-hidden transform-gpu ${
        isActive ? "shadow-lg" : "shadow-md"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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
