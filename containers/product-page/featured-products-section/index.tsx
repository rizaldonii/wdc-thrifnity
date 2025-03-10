"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingCart,
  Heart,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/products";
import { formatCurrency } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Filter featured products
const featuredProducts = products.filter((product) => product.isFeatured);

export default function FeaturedProducts() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const [visibleItems, setVisibleItems] = useState(0);
  const { theme, resolvedTheme } = useTheme();

  // Gunakan resolvedTheme untuk mendapatkan tema yang benar-benar diterapkan
  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = currentTheme === "dark";

  const itemsToShow = isMobile ? 1 : isTablet ? 2 : 3;

  useEffect(() => {
    setVisibleItems(itemsToShow);
  }, [isMobile, isTablet, itemsToShow]);

  const scrollNext = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const itemWidth = container.scrollWidth / featuredProducts.length;
      const newPosition = Math.min(
        scrollPosition + itemsToShow,
        featuredProducts.length - itemsToShow
      );
      setScrollPosition(newPosition);
      container.scrollTo({
        left: newPosition * itemWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollPrev = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const itemWidth = container.scrollWidth / featuredProducts.length;
      const newPosition = Math.max(scrollPosition - itemsToShow, 0);
      setScrollPosition(newPosition);
      container.scrollTo({
        left: newPosition * itemWidth,
        behavior: "smooth",
      });
    }
  };

  // Calculate discount percentage
  const calculateDiscount = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  // If no featured products, don't render the section
  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <section
      className={`py-12 md:py-16 px-4 bg-gradient-to-b ${
        isDark
          ? "from-background to-background/70"
          : "from-background to-background/50"
      }`}
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 md:mb-0"
          >
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                <span
                  className={cn(
                    "bg-clip-text text-transparent bg-gradient-to-r",
                    isDark
                      ? "from-primary/90 via-primary/80 to-primary/70"
                      : "from-primary to-primary/80"
                  )}
                >
                  Featured Products
                </span>
              </h2>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <Sparkles
                  className={cn(
                    "w-5 h-5",
                    isDark ? "text-primary/90" : "text-primary"
                  )}
                />
              </motion.div>
            </div>
            <p className="text-base md:text-lg text-muted-foreground tracking-wide">
              Handpicked items we think you&apos;ll{" "}
              <span className="text-primary font-medium">love</span>
            </p>
          </motion.div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground hidden md:block">
              Showing {scrollPosition + 1}-
              {Math.min(scrollPosition + visibleItems, featuredProducts.length)}
              of {featuredProducts.length}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={scrollPrev}
                disabled={scrollPosition === 0}
                aria-label="Previous featured products"
                className={`rounded-full transition-colors ${
                  isDark
                    ? "hover:bg-primary/90 hover:text-primary-foreground"
                    : "hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={scrollNext}
                disabled={
                  scrollPosition >= featuredProducts.length - itemsToShow
                }
                aria-label="Next featured products"
                className={`rounded-full transition-colors ${
                  isDark
                    ? "hover:bg-primary/90 hover:text-primary-foreground"
                    : "hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div
          ref={containerRef}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 md:gap-6 pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="min-w-[280px] sm:min-w-[320px] md:min-w-[350px] flex-shrink-0 snap-start"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <Card
                className={`h-full overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border-0 ${
                  isDark ? "bg-card/90" : "bg-card"
                }`}
              >
                <CardContent className="p-0">
                  <Link href={`/products/${product.slug}`} className="block">
                    <div className="relative aspect-[4/5] w-full overflow-hidden group">
                      <Image
                        src={
                          product.images[0]?.url ||
                          "/placeholder.svg?height=400&width=300"
                        }
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Show secondary image on hover if available */}
                      {product.images[1]?.url &&
                        hoveredProduct === product.id && (
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Image
                              src={product.images[1].url}
                              alt={`${product.name} - alternate view`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                      <div className="absolute top-2 left-2 flex flex-col gap-2">
                        <Badge
                          className={cn(
                            "backdrop-blur-sm",
                            isDark
                              ? "bg-primary/80 text-primary-foreground border-primary/20"
                              : "bg-primary text-primary-foreground border-transparent"
                          )}
                        >
                          Featured
                        </Badge>
                        {product.isNew && (
                          <Badge
                            variant="secondary"
                            className={cn(
                              "backdrop-blur-sm",
                              isDark
                                ? "bg-secondary/80 text-secondary-foreground border-secondary/20"
                                : "bg-secondary/90 text-secondary-foreground"
                            )}
                          >
                            New Arrival
                          </Badge>
                        )}
                        {product.originalPrice &&
                          product.originalPrice > product.price && (
                            <Badge
                              className={cn(
                                "backdrop-blur-sm",
                                isDark
                                  ? "bg-red-500/80 text-white border-red-400/20"
                                  : "bg-red-500 text-white border-transparent"
                              )}
                            >
                              {calculateDiscount(
                                product.originalPrice,
                                product.price
                              )}
                              % OFF
                            </Badge>
                          )}
                      </div>

                      {/* Quick action buttons */}
                      <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="icon"
                          variant="secondary"
                          className={`rounded-full backdrop-blur-sm h-8 w-8 ${
                            isDark
                              ? "bg-background/60 hover:bg-background/80"
                              : "bg-background/80 hover:bg-background"
                          }`}
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                  <div className="p-4">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : isDark
                              ? "fill-muted/30 text-muted-foreground/50"
                              : "fill-muted text-muted-foreground"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">
                        ({product.totalReviews})
                      </span>
                    </div>
                    <Link
                      href={`/products/${product.slug}`}
                      className="block group"
                    >
                      <h3
                        className={`font-semibold text-lg mb-1 line-clamp-1 transition-colors ${
                          isDark
                            ? "group-hover:text-primary/90"
                            : "group-hover:text-primary"
                        }`}
                      >
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="font-bold text-lg flex items-center gap-2">
                        {product.originalPrice &&
                        product.originalPrice > product.price ? (
                          <>
                            <span
                              className={
                                isDark ? "text-primary/90" : "text-primary"
                              }
                            >
                              {formatCurrency(product.price)}
                            </span>
                            <span className="text-sm text-muted-foreground line-through">
                              {formatCurrency(product.originalPrice)}
                            </span>
                          </>
                        ) : (
                          <span>{formatCurrency(product.price)}</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/products/${product.slug}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className={`rounded-full ${
                              isDark
                                ? "hover:bg-primary/80 hover:text-primary-foreground"
                                : "hover:bg-primary hover:text-primary-foreground"
                            }`}
                          >
                            View
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          className={`rounded-full ${
                            isDark ? "bg-primary/90 hover:bg-primary/80" : ""
                          }`}
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" /> Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-6 gap-1">
          {Array.from({
            length: Math.ceil(featuredProducts.length / itemsToShow),
          }).map((_, index) => {
            const isActive = index === Math.floor(scrollPosition / itemsToShow);
            return (
              <button
                key={index}
                onClick={() => {
                  if (containerRef.current) {
                    const container = containerRef.current;
                    const itemWidth =
                      container.scrollWidth / featuredProducts.length;
                    const newPosition = index * itemsToShow;
                    setScrollPosition(newPosition);
                    container.scrollTo({
                      left: newPosition * itemWidth,
                      behavior: "smooth",
                    });
                  }
                }}
                className={`h-2 rounded-full transition-all ${
                  isActive
                    ? `w-6 ${isDark ? "bg-primary/90" : "bg-primary"}`
                    : `w-2 ${isDark ? "bg-muted/50" : "bg-muted"}`
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
