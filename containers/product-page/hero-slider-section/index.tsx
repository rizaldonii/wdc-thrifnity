"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import {
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

// Enhanced slider content with more properties
const slides = [
  {
    id: "slide1",
    image: {
      light: "/shop/summer collection.jpg",
      dark: "/shop/summer collection.jpg",
    },
    mobileImage: {
      light: "/shop/summer collection.jpg",
      dark: "/shop/summer collection.jpg",
    },
    title: "Summer Collection",
    subtitle: "Discover our latest arrivals for the season",
    description:
      "Refresh your wardrobe with our vibrant and comfortable pieces perfect for sunny days.",
    buttonText: "Shop Now",
    buttonLink: "/products?category=summer",
    secondaryButtonText: "View Lookbook",
    secondaryButtonLink: "/lookbook/summer",
    align: "left",
    overlayOpacity: {
      light: 20,
      dark: 40,
    },
  },
  {
    id: "slide2",
    image: {
      light: "/shop/exclusive discounts.jpg",
      dark: "/shop/exclusive discounts.jpg",
    },
    mobileImage: {
      light: "/shop/exclusive discounts.jpg",
      dark: "/shop/exclusive discounts.jpg",
    },
    title: "Exclusive Discounts",
    subtitle: "Up to 50% off on selected items",
    description:
      "Limited time offers on premium brands. Don't miss out on these seasonal deals!",
    buttonText: "View Offers",
    buttonLink: "/products?discount=true",
    secondaryButtonText: "Join VIP Club",
    secondaryButtonLink: "/membership",
    align: "center",
    textColor: "white",
    overlayOpacity: {
      light: 30,
      dark: 50,
    },
  },
  {
    id: "slide3",
    image: {
      light: "/shop/eco friendly clothing.jpg",
      dark: "/shop/eco friendly clothing.jpg",
    },
    mobileImage: {
      light: "/shop/eco friendly clothing.jpg",
      dark: "/shop/eco friendly clothing.jpg",
    },
    title: "Sustainable Fashion",
    subtitle: "Eco-friendly clothing for a better tomorrow",
    description:
      "Our eco-conscious collection features ethically sourced materials and sustainable production methods.",
    buttonText: "Explore",
    buttonLink: "/products?tag=sustainable",
    secondaryButtonText: "Our Commitment",
    secondaryButtonLink: "/about/sustainability",
    align: "right",
    textColor: "white",
    overlayOpacity: {
      light: 40,
      dark: 60,
    },
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const sliderRef = useRef(null);
  const { theme } = useTheme();

  // Auto-advance slides
  useEffect(() => {
    if (!autoplay || isHovering) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, isHovering]);

  // Navigation functions
  const nextSlide = useCallback(() => {
    setAutoplay(false); // Pause autoplay when manually navigating
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setAutoplay(false); // Pause autoplay when manually navigating
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = useCallback((index: SetStateAction<number>) => {
    setAutoplay(false); // Pause autoplay when manually navigating
    setCurrentSlide(index);
  }, []);

  const toggleAutoplay = useCallback(() => {
    setAutoplay((prev) => !prev);
  }, []);

  // Touch handlers for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe left
      nextSlide();
    } else if (touchEndX.current - touchStartX.current > 50) {
      // Swipe right
      prevSlide();
    }
  };

  // Mouse enter/leave for pausing autoplay
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  // Resume autoplay after user interaction with longer delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setAutoplay(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: { key: string }) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Improved animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.05,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
  };

  // Content animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.6 },
    }),
  };

  // Track slide direction for animations
  const [[page, direction], setPage] = useState([0, 0]);

  useEffect(() => {
    setPage([currentSlide, currentSlide > page ? 1 : -1]);
  }, [currentSlide, page]);

  // Progress bar animation
  const progressVariants = {
    initial: { width: "0%" },
    animate: { width: "100%", transition: { duration: 5, ease: "linear" } },
  };

  return (
    <section
      ref={sliderRef}
      className={cn(
        "relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden group",
        "bg-background transition-colors duration-300"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={slides[currentSlide].id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
            scale: { duration: 0.5 },
          }}
          className="absolute inset-0"
        >
          {/* Background Images */}
          <div className="relative w-full h-full">
            <div className="hidden md:block">
              <Image
                src={
                  theme === "dark"
                    ? slides[currentSlide].image.dark
                    : slides[currentSlide].image.light
                }
                alt={slides[currentSlide].title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div className="block md:hidden">
              <Image
                src={
                  theme === "dark"
                    ? slides[currentSlide].mobileImage.dark
                    : slides[currentSlide].mobileImage.light
                }
                alt={slides[currentSlide].title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div
              className={cn(
                "absolute inset-0",
                theme === "dark" ? "bg-black" : "bg-black/10"
              )}
              style={{
                opacity:
                  theme === "dark"
                    ? slides[currentSlide].overlayOpacity.dark / 100
                    : slides[currentSlide].overlayOpacity.light / 100,
              }}
            />
          </div>

          {/* Content Styling */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div
                className={cn(
                  "max-w-lg space-y-6",
                  slides[currentSlide].align === "center" &&
                  "mx-auto text-center",
                  slides[currentSlide].align === "right" && "ml-auto text-right"
                )}
              >
                <motion.h2
                  custom={0}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className={cn(
                    "text-3xl md:text-5xl lg:text-6xl font-bold mb-2 tracking-tight",
                    theme === "dark" ? "text-white" : "text-foreground"
                  )}
                >
                  {slides[currentSlide].title}
                </motion.h2>

                <motion.p
                  custom={1}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className={cn(
                    "text-lg md:text-xl lg:text-2xl font-medium mb-4",
                    theme === "dark" ? "text-white" : "text-foreground"
                  )}
                >
                  {slides[currentSlide].subtitle}
                </motion.p>

                <motion.p
                  custom={2}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className={cn(
                    "text-base md:text-lg lg:text-xl font-light mb-6",
                    theme === "dark" ? "text-white" : "text-foreground"
                  )}
                >
                  {slides[currentSlide].description}
                </motion.p>

                <motion.div
                  custom={3}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex gap-4"
                >
                  <Link href={slides[currentSlide].buttonLink}>
                    <Button
                      size="lg"
                      variant="default"
                      className={cn(
                        "rounded-full",
                        theme === "dark"
                          ? "bg-white text-black"
                          : "bg-primary text-white"
                      )}
                    >
                      {slides[currentSlide].buttonText}
                    </Button>
                  </Link>

                  <Link href={slides[currentSlide].secondaryButtonLink}>
                    <Button
                      size="lg"
                      variant="outline"
                      className={cn(
                        "rounded-full",
                        theme === "dark"
                          ? "border-white text-white"
                          : "border-foreground text-foreground"
                      )}
                    >
                      {slides[currentSlide].secondaryButtonText}
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute inset-x-0 bottom-10 flex justify-center gap-4 z-10">
        <div className="flex justify-center gap-2 items-center">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "relative h-3 rounded-full transition-all overflow-hidden",
                theme === "dark"
                  ? "hover:bg-white/60"
                  : "hover:bg-foreground/60"
              )}
              style={{
                width: currentSlide === index ? "3rem" : "0.75rem",
                backgroundColor:
                  currentSlide === index
                    ? "transparent"
                    : theme === "dark"
                      ? "rgba(255, 255, 255, 0.3)"
                      : "rgba(0, 0, 0, 0.3)",
              }}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentSlide === index ? "true" : "false"}
            >
              {currentSlide === index && autoplay && !isHovering && (
                <motion.div
                  className={cn(
                    "absolute inset-0",
                    theme === "dark" ? "bg-white" : "bg-foreground"
                  )}
                  variants={progressVariants}
                  initial="initial"
                  animate="animate"
                  key={currentSlide}
                />
              )}
            </button>
          ))}
        </div>

        {/* Control Buttons */}
        <Button
          variant="outline"
          size="icon"
          onClick={toggleAutoplay}
          className={cn(
            "rounded-full h-8 w-8",
            theme === "dark"
              ? "border-white text-white bg-black/20 hover:bg-black/40"
              : "border-foreground text-foreground bg-white/20 hover:bg-white/40",
            "backdrop-blur-sm"
          )}
          aria-label={autoplay ? "Pause slideshow" : "Play slideshow"}
        >
          {autoplay ? <Pause size={14} /> : <Play size={14} />}
        </Button>
      </div>

      {/* Navigation Arrows - Larger, semi-transparent with hover effect */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full h-12 w-12 md:h-14 md:w-14 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-7 w-7" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full h-12 w-12 md:h-14 md:w-14 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="h-7 w-7" />
      </Button>

      {/* Slide Counter */}
      <div className="absolute top-6 right-6 bg-black/30 backdrop-blur-sm text-white rounded-full px-3 py-1 text-sm font-medium">
        {currentSlide + 1} / {slides.length}
      </div>
    </section>
  );
}
