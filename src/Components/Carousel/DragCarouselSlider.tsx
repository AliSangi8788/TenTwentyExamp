import React, { useState, useEffect, useRef } from "react";
import CarouselSlide from "./CarouselSlide";

// Types
interface Slide {
  id: number;
  image: string;
  client: string;
  location: string;
}

interface SlideStyle {
  transform: string;
  zIndex: number;
  opacity: number;
  transition: string;
  filter: string;
}

const DragCarouselSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const autoPlayRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const transitionTimeoutRef = useRef<number | null>(null);

  const dragThreshold: number = 40;
  const transitionDuration: number = 800;

  // Sample slide data with client info
  const slides: Slide[] = [
    {
      id: 1,
      image: "/Images/image3.png",
      client: "Client 1",
      location: "Dubai, United Arab Emirates",
    },
    {
      id: 2,
      image: "/Images/image4.png",
      client: "Client 2",
      location: "London, United Kingdom",
    },
    {
      id: 3,
      image: "/Images/image5.png",
      client: "Client 3",
      location: "Tokyo, Japan",
    },
  ];

  // Create infinite loop by duplicating slides
  const infiniteSlides: Slide[] = [...slides, ...slides, ...slides];
  const totalSlides: number = infiniteSlides.length;

  const startAutoPlay = (): void => {
    autoPlayRef.current = setInterval(() => {
      if (!isDragging && !isTransitioning) {
        handleSlideChange(1);
      }
    }, 4000);
  };

  const stopAutoPlay = (): void => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => {
      stopAutoPlay();
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [isDragging, isTransitioning]);

  const handleSlideChange = (direction: number): void => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + direction + totalSlides) % totalSlides);
    
    // Clear any existing timeout
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }

    // Set new timeout for reset
    transitionTimeoutRef.current = window.setTimeout(() => {
      const newIndex = (currentIndex + direction + totalSlides) % totalSlides;
      
      if (newIndex >= slides.length * 2) {
        setCurrentIndex(slides.length);
      } else if (newIndex < slides.length) {
        setCurrentIndex(slides.length * 2 - 1);
      }
      
      setIsTransitioning(false);
    }, transitionDuration);
  };

  // Mouse drag handlers with improved sensitivity
  const handleMouseDown = (e: React.MouseEvent): void => {
    setIsDragging(true);
    setDragStart(e.clientX);
    stopAutoPlay();
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent): void => {
    if (!isDragging) return;
    const offset = e.clientX - dragStart;
    setDragOffset(offset * 0.8);
  };

  const handleMouseUp = (): void => {
    if (!isDragging) return;

    if (Math.abs(dragOffset) > dragThreshold) {
      handleSlideChange(dragOffset > 0 ? -1 : 1);
    }

    setIsDragging(false);
    setDragOffset(0);
    startAutoPlay();
  };

  // Touch handlers with improved mobile experience
  const handleTouchStart = (e: React.TouchEvent): void => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
    stopAutoPlay();
  };

  const handleTouchMove = (e: React.TouchEvent): void => {
    if (!isDragging) return;
    const offset = e.touches[0].clientX - dragStart;
    setDragOffset(offset * 0.8);
  };

  const handleTouchEnd = (): void => {
    handleMouseUp();
  };

  // Enhanced slide positioning with refined perspective effect
  const getSlideStyle = (index: number): SlideStyle => {
    const position = index - currentIndex;
    const absPosition = Math.abs(position);

    // Responsive spacing with improved scaling
    const baseTranslateX = window.innerWidth < 768 ? 300 : 480;
    const baseMargin = window.innerWidth < 768 ? 25 : 40;
    const baseScale = window.innerWidth < 768 ? 0.85 : 1;

    let translateX: number = position * baseTranslateX;
    let scale: number = baseScale;
    let zIndex: number = 0;
    let opacity: number = 1;
    let rotateY: number = 0;
    let rotateZ: number = 0;
    let blur: number = 0;

    if (absPosition === 0) {
      // Center slide
      scale = baseScale;
      zIndex = 3;
      translateX += dragOffset;
      blur = 0;
    } else if (absPosition === 1) {
      // Adjacent slides
      scale = baseScale * 0.95;
      zIndex = 2;
      opacity = 0.9;
      rotateY = position > 0 ? 20 : -20;
      rotateZ = position > 0 ? 5 : -5;
      translateX += dragOffset * 0.5;
      translateX += position > 0 ? baseMargin : -baseMargin;
      blur = 0.5;
    } else if (absPosition === 2) {
      // Outer slides
      scale = baseScale * 0.8;
      zIndex = 1;
      opacity = 0.7;
      rotateY = position > 0 ? 30 : -30;
      rotateZ = position > 0 ? 5 : -5;
      translateX += dragOffset * 0.3;
      blur = 1;
    } else {
      // Hidden slides
      scale = baseScale * 0.6;
      zIndex = 0;
      opacity = 0;
      rotateY = position > 0 ? 40 : -40;
      rotateZ = position > 0 ? 5 : -5;
      blur = 2;
    }

    return {
      transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
      zIndex: zIndex,
      opacity: opacity,
      filter: `blur(${blur}px)`,
      transition: isDragging 
        ? "none" 
        : `all ${transitionDuration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
    };
  };

  return (
    <div className="relative w-full h-[600px] md:h-[930px] overflow-hidden">
      {/* Carousel Container */}
      <div
        ref={containerRef}
        className="relative h-full flex items-center justify-center perspective-[2000px]"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ 
          cursor: isDragging ? "grabbing" : "grab",
          transformStyle: "preserve-3d"
        }}
      >
        {/* Slides */}
        {infiniteSlides.map((slide: Slide, index: number) => (
          <div
            key={`${slide.id}-${Math.floor(index / slides.length)}`}
            className={`absolute top-10 md:top-20 w-[280px] md:w-[435px] h-[400px] md:h-[620px] select-none will-change-transform ${
              index === currentIndex ? "" : "mt-16 md:mt-28"
            }`}
            style={getSlideStyle(index)}
          >
            <CarouselSlide
              slide={slide}
              style={{}}
              isActive={index === currentIndex}
            />
          </div>
        ))}
      </div>

      {/* Slide Details with smooth transitions */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        {(() => {
          const normalizedIndex: number = currentIndex % slides.length;
          const currentSlide: Slide = slides[normalizedIndex];
          return (
            <div className="p-3 md:p-6 transition-all duration-500 ease-out">
              <h2 className="text-2xl md:text-4xl font-wroksans text-black mb-1 md:mb-2 transform transition-all duration-500">
                {currentSlide.client}
              </h2>
              <p className="text-lg md:text-2xl font-wroksans text-[#7A7777] mb-2 md:mb-3 transform transition-all duration-500">
                {currentSlide.location}
              </p>
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default DragCarouselSlider;
