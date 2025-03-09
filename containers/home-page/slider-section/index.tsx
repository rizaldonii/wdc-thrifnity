"use client";

import type React from "react";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  PauseCircle,
  PlayCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SliderProps {
  autoPlayInterval?: number;
  height?: string;
}

export default function Slider({
  autoPlayInterval = 5000,
  height = "600px",
}: SliderProps) {
  const sliderData = [
    {
      id: 1,
      imageUrl: "/slider/slide1.jpg",
      title: "Welcome to Thrifnity",
      description: "Your Sustainable Fashion Destination",
    },
    {
      id: 2,
      imageUrl: "/slider/slide2.jpg",
      title: "Shop Sustainably",
      description: "Discover our curated collection of second-hand fashion",
    },
    {
      id: 3,
      imageUrl: "/slider/slide3.jpg",
      title: "Join Our Community",
      description: "Trade and repair your clothes with us",
      ctaText: "Join Now",
    },
  ];

  // Memperbaiki: Menggunakan sliderData sebagai slides
  const slides = sliderData;

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  // Handle automatic sliding with progress indicator
  const resetProgressTimer = useCallback(() => {
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(0);

    if (!isPaused) {
      progressRef.current = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 100 / (autoPlayInterval / 100);
          return Math.min(newProgress, 100);
        });
      }, 100);
    }
  }, [autoPlayInterval, isPaused]);

  // Handle slide transitions
  const handleSlideChange = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentSlide(index);
      resetProgressTimer();

      // Reset transitioning state after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 700);
    },
    [isTransitioning, resetProgressTimer]
  );

  // Next slide function
  const nextSlide = useCallback(() => {
    handleSlideChange(
      currentSlide === slides.length - 1 ? 0 : currentSlide + 1
    );
  }, [currentSlide, handleSlideChange, slides.length]);

  // Previous slide function
  const prevSlide = useCallback(() => {
    handleSlideChange(
      currentSlide === 0 ? slides.length - 1 : currentSlide - 1
    );
  }, [currentSlide, handleSlideChange, slides.length]);

  // Setup autoplay
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isPaused) {
      timerRef.current = setInterval(nextSlide, autoPlayInterval);
      resetProgressTimer();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isPaused, nextSlide, autoPlayInterval, resetProgressTimer]);

  // Progress bar effect
  useEffect(() => {
    if (progress >= 100) {
      nextSlide();
    }
  }, [progress, nextSlide]);

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextSlide, prevSlide]);

  // Toggle autoplay
  const toggleAutoplay = () => {
    setIsPaused(!isPaused);
  };

  return (
    <section
      className="relative w-full overflow-hidden rounded-xl shadow-xl"
      style={{ height }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <div className="h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute h-full w-full transition-all duration-700 ${
              currentSlide === index
                ? "opacity-100 translate-x-0 z-10"
                : index < currentSlide
                ? "opacity-0 -translate-x-full z-0"
                : "opacity-0 translate-x-full z-0"
            }`}
          >
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={slide.imageUrl || "/placeholder.svg"}
                alt={slide.title}
                fill
                className="object-cover transform transition-transform duration-10000 hover:scale-105"
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

              {/* Content with animation */}
              <div
                className={`absolute inset-0 flex flex-col items-center justify-end pb-20 px-8 md:px-16 text-white transition-all duration-1000 ${
                  currentSlide === index
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 text-center md:text-left max-w-4xl leading-tight">
                  {slide.title}
                </h2>
                <p className="text-base md:text-xl text-white/90 text-center max-w-2xl mb-6">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <Button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/10 backdrop-blur-md text-white p-3 rounded-full hover:bg-background/30 transition-all transform hover:scale-110 z-20 group"
        aria-label="Previous slide"
        disabled={isTransitioning}
        variant="ghost"
        size="icon"
      >
        <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-1" />
      </Button>
      <Button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/10 backdrop-blur-md text-white p-3 rounded-full hover:bg-background/30 transition-all transform hover:scale-110 z-20 group"
        aria-label="Next slide"
        disabled={isTransitioning}
        variant="ghost"
        size="icon"
      >
        <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
      </Button>

      {/* Control Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent pt-8 pb-2 z-20">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Dots/Progress Navigation */}
          <div className="flex-1 flex items-center justify-center gap-2 mx-auto">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className="group relative py-2"
                aria-label={`Go to slide ${index + 1}`}
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "w-12 bg-white"
                      : "w-6 bg-white/40 group-hover:bg-white/60"
                  }`}
                />

                {currentSlide === index && (
                  <span
                    className="absolute top-0 left-0 h-full bg-white/80 rounded-full transition-all duration-100"
                    style={{
                      width: `${progress}%`,
                      maxWidth: "100%",
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Pause/Play Button */}
          <Button
            onClick={toggleAutoplay}
            className="bg-white/10 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/30 transition-all ml-2"
            aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
            variant="ghost"
            size="icon"
          >
            {isPaused ? (
              <PlayCircle className="w-5 h-5" />
            ) : (
              <PauseCircle className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Current slide indicator */}
      <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-md text-white text-sm px-3 py-1 rounded-full z-20">
        {currentSlide + 1} / {slides.length}
      </div>
    </section>
  );
}
