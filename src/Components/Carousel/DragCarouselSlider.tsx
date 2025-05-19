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
}

const DragCarouselSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const autoPlayRef = useRef<number | null>(null);

  const dragThreshold: number = 50;

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
      if (!isDragging) {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }
    }, 3000);
  };

  const stopAutoPlay = (): void => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [isDragging, totalSlides]);

  // Handle infinite scroll reset
  useEffect(() => {
    if (currentIndex >= slides.length * 2) {
      setTimeout(() => setCurrentIndex(slides.length), 50);
    } else if (currentIndex < slides.length) {
      setTimeout(() => setCurrentIndex(slides.length * 2 - 1), 50);
    }
  }, [currentIndex, slides.length]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent): void => {
    setIsDragging(true);
    setDragStart(e.clientX);
    stopAutoPlay();
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent): void => {
    if (!isDragging) return;
    const offset = e.clientX - dragStart;
    setDragOffset(offset);
  };

  const handleMouseUp = (): void => {
    if (!isDragging) return;

    if (Math.abs(dragOffset) > dragThreshold) {
      if (dragOffset > 0) {
        // Dragged right - go to previous
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
      } else {
        // Dragged left - go to next
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }
    }

    setIsDragging(false);
    setDragOffset(0);
    startAutoPlay();
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent): void => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
    stopAutoPlay();
  };

  const handleTouchMove = (e: React.TouchEvent): void => {
    if (!isDragging) return;
    const offset = e.touches[0].clientX - dragStart;
    setDragOffset(offset);
  };

  const handleTouchEnd = (): void => {
    handleMouseUp();
  };

  // Calculate slide positions with perspective effect
  const getSlideStyle = (index: number): SlideStyle => {
    const position = index - currentIndex;
    const absPosition = Math.abs(position);

    // Responsive spacing based on screen size
    const baseTranslateX = window.innerWidth < 768 ? 320 : 520;
    const baseMargin = window.innerWidth < 768 ? 30 : 50;
    const baseScale = window.innerWidth < 768 ? 0.8 : 1;

    let translateX: number = position * baseTranslateX;
    let scale: number = baseScale;
    let zIndex: number = 0;
    let opacity: number = 1;
    let rotateY: number = 0;
    let rotateZ: number = 0;

    if (absPosition === 0) {
      // Center slide
      scale = baseScale;
      zIndex = 3;
      translateX += dragOffset;
    } else if (absPosition === 1) {
      // Adjacent slides - more pronounced rotation and margin
      scale = baseScale;
      zIndex = 2;
      opacity = 1;
      rotateY = position > 0 ? 25 : -25;
      rotateZ = position > 0 ? 10 : -10;
      translateX += dragOffset * 0.5;
      translateX += position > 0 ? baseMargin : -baseMargin;
    } else if (absPosition === 2) {
      // Outer slides
      scale = baseScale * 0.65;
      zIndex = 1;
      opacity = 0.6;
      rotateY = position > 0 ? 35 : -35;
      rotateZ = position > 0 ? 8 : -8;
      translateX += dragOffset * 0.3;
    } else {
      // Hidden slides
      scale = baseScale * 0.5;
      zIndex = 0;
      opacity = 0;
      rotateY = position > 0 ? 45 : -45;
      rotateZ = position > 0 ? 10 : -10;
    }

    return {
      transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
      zIndex: zIndex,
      opacity: opacity,
      transition: isDragging ? "none" : "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
    };
  };

  return (
    <div className="relative w-full h-[600px] md:h-[930px] overflow-hidden">
      {/* Carousel Container */}
      <div
        className="relative h-full flex items-center justify-center perspective-1000"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        {/* Slides */}
        {infiniteSlides.map((slide: Slide, index: number) => (
          <div
            key={`${slide.id}-${Math.floor(index / slides.length)}`}
            className={`absolute top-10 md:top-20 w-[280px] md:w-[435px] h-[400px] md:h-[620px] select-none ${
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

      {/* Slide Details - replacing indicators */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        {(() => {
          const normalizedIndex: number = currentIndex % slides.length;
          const currentSlide: Slide = slides[normalizedIndex];
          return (
            <div className="p-3 md:p-6">
              <h2 className="text-2xl md:text-4xl font-wroksans text-black mb-1 md:mb-2">
                {currentSlide.client}
              </h2>
              <p className="text-lg md:text-2xl font-wroksans text-[#7A7777] mb-2 md:mb-3">
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
