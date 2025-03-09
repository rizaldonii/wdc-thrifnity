"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Bookmark,
  Eye,
  ArrowLeft,
  ArrowRight,
  X,
  ImageIcon,
  Scissors,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Tailor, PortfolioItem } from "@/types/tailor";

interface TailorPortfolioProps {
  tailor: Tailor;
}

export default function TailorPortfolio({ tailor }: TailorPortfolioProps) {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("masonry");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Extract unique categories
  const categories = [
    "all",
    ...new Set(tailor.portfolio.map((item) => item.category)),
  ];

  // Filter portfolio items by category
  const filteredPortfolio =
    selectedCategory === "all"
      ? tailor.portfolio
      : tailor.portfolio.filter((item) => item.category === selectedCategory);

  // Handle modal navigation
  const navigatePortfolio = (direction: "next" | "prev") => {
    if (!selectedItem) return;

    const currentIndex = filteredPortfolio.findIndex(
      (item) => item.id === selectedItem.id
    );
    let newIndex;

    if (direction === "next") {
      newIndex = (currentIndex + 1) % filteredPortfolio.length;
    } else {
      newIndex =
        (currentIndex - 1 + filteredPortfolio.length) %
        filteredPortfolio.length;
    }

    setSelectedItem(filteredPortfolio[newIndex]);
    setCurrentImageIndex(0); // Reset image index when changing items
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return;

      if (e.key === "ArrowRight") {
        navigatePortfolio("next");
      } else if (e.key === "ArrowLeft") {
        navigatePortfolio("prev");
      } else if (e.key === "Escape") {
        setSelectedItem(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem, filteredPortfolio]);

  // Reset loading state when selected item changes
  useEffect(() => {
    if (selectedItem) {
      setIsLoading(true);
    }
  }, [selectedItem]);

  // Get all images for the current item
  const getItemImages = (item: PortfolioItem) => {
    const images = [item.image];
    if (item.before) images.push(item.before);
    if (item.after) images.push(item.after);
    return images.filter(Boolean) as string[];
  };

  // Navigate between images in fullscreen mode
  const navigateImages = (direction: "next" | "prev") => {
    if (!selectedItem) return;

    const images = getItemImages(selectedItem);
    if (images.length <= 1) return;

    if (direction === "next") {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    } else {
      setCurrentImageIndex(
        (prev) => (prev - 1 + images.length) % images.length
      );
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Portfolio</h2>
            <p className="text-muted-foreground mt-1">
              Browse {tailor.name}'s latest work and creations
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex border rounded-md p-1">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setViewMode("grid")}
              >
                <span className="sr-only">Grid view</span>
                <div className="grid grid-cols-2 gap-0.5">
                  <div className="w-1.5 h-1.5 rounded-sm bg-current"></div>
                  <div className="w-1.5 h-1.5 rounded-sm bg-current"></div>
                  <div className="w-1.5 h-1.5 rounded-sm bg-current"></div>
                  <div className="w-1.5 h-1.5 rounded-sm bg-current"></div>
                </div>
              </Button>
              <Button
                variant={viewMode === "masonry" ? "secondary" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setViewMode("masonry")}
              >
                <span className="sr-only">Masonry view</span>
                <div className="flex gap-0.5">
                  <div className="w-1 h-3.5 rounded-sm bg-current"></div>
                  <div className="w-1 h-2 rounded-sm bg-current"></div>
                  <div className="w-1 h-3 rounded-sm bg-current"></div>
                </div>
              </Button>
            </div>

            <Badge variant="outline" className="px-3 py-1">
              {filteredPortfolio.length} items
            </Badge>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="relative">
          <div className="overflow-x-auto pb-2 -mx-1 px-1">
            <Tabs
              defaultValue="all"
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              className="w-full"
            >
              <TabsList className="inline-flex h-10 bg-muted/50 p-1 rounded-full">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="rounded-full px-4 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </div>

      {filteredPortfolio.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`mt-8 ${
            viewMode === "masonry"
              ? "columns-1 sm:columns-2 md:columns-3 gap-6"
              : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          }`}
        >
          {filteredPortfolio.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className={`${
                viewMode === "masonry" ? "mb-6 break-inside-avoid" : "h-full"
              }`}
            >
              <div
                className="group relative bg-muted/5 rounded-xl cursor-pointer overflow-hidden border border-muted/10 hover:border-muted/20 transition-colors duration-300"
                onClick={() => setSelectedItem(item)}
              >
                {/* Fixed aspect ratio container */}
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Gradient overlay - always visible but stronger on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-300" />

                  {/* Content container with fixed height and scroll */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    {/* Top action buttons */}
                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(`${item.title} bookmarked!`);
                        }}
                      >
                        <Bookmark className="h-4 w-4" />
                        <span className="sr-only">Bookmark</span>
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedItem(item);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                    </div>

                    {/* Info section with max height and fade */}
                    <div className="relative z-10 transition-transform duration-300 transform translate-y-0 group-hover:translate-y-0">
                      <div className="space-y-2">
                        <h3 className="text-white font-medium text-lg line-clamp-2">
                          {item.title}
                        </h3>
                        <div className="relative">
                          <p className="text-white/90 text-sm line-clamp-2 mb-3">
                            {item.description}
                          </p>
                          {/* Fade out effect for text */}
                          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-black/80 to-transparent" />
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge
                            variant="secondary"
                            className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                          >
                            {item.category}
                          </Badge>
                          {item.before && item.after && (
                            <Badge
                              variant="outline"
                              className="bg-black/30 text-white border-white/20 hover:bg-black/40 backdrop-blur-sm"
                            >
                              Before & After
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-16 bg-muted/30 rounded-xl mt-8">
          <div className="inline-flex items-center justify-center p-3 bg-muted rounded-full mb-4">
            <Scissors className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No portfolio items found</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            No portfolio items found in the "{selectedCategory}" category. Try
            selecting a different category.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setSelectedCategory("all")}
          >
            View all work
          </Button>
        </div>
      )}

      {/* Portfolio Item Modal */}
      <Dialog
        open={!!selectedItem}
        onOpenChange={(open) => !open && setSelectedItem(null)}
      >
        <DialogContent className="sm:max-w-4xl p-0 overflow-hidden bg-background/95 backdrop-blur-sm">
          {selectedItem && (
            <div className="flex flex-col max-h-[90vh]">
              <div className="p-4 sm:p-6 flex items-center justify-between border-b">
                <div>
                  <DialogTitle className="text-xl">
                    {selectedItem.title}
                  </DialogTitle>
                  <DialogDescription className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 mr-1.5" />
                    {selectedItem.date}
                  </DialogDescription>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => navigatePortfolio("prev")}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Previous</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => navigatePortfolio("next")}
                  >
                    <ArrowRight className="h-4 w-4" />
                    <span className="sr-only">Next</span>
                  </Button>
                  <DialogClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close</span>
                    </Button>
                  </DialogClose>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                {isFullscreen ? (
                  <div className="relative h-full flex items-center justify-center">
                    <div className="relative w-full max-h-[70vh]">
                      {selectedItem &&
                        getItemImages(selectedItem)[currentImageIndex] && (
                          <Image
                            src={
                              getItemImages(selectedItem)[currentImageIndex] ||
                              "/placeholder.svg"
                            }
                            alt={`${selectedItem.title} image ${
                              currentImageIndex + 1
                            }`}
                            width={1200}
                            height={800}
                            className="object-contain mx-auto max-h-[70vh] w-auto"
                            onLoad={() => setIsLoading(false)}
                          />
                        )}

                      {/* Navigation arrows */}
                      {getItemImages(selectedItem).length > 1 && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/20 hover:bg-black/40 text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigateImages("prev");
                            }}
                          >
                            <ChevronLeft className="h-6 w-6" />
                            <span className="sr-only">Previous image</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/20 hover:bg-black/40 text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigateImages("next");
                            }}
                          >
                            <ChevronRight className="h-6 w-6" />
                            <span className="sr-only">Next image</span>
                          </Button>
                        </>
                      )}

                      {/* Image counter */}
                      {getItemImages(selectedItem).length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                          {currentImageIndex + 1} /{" "}
                          {getItemImages(selectedItem).length}
                        </div>
                      )}

                      {/* Exit fullscreen button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white"
                        onClick={() => setIsFullscreen(false)}
                      >
                        Exit Fullscreen
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mt-2">
                      {selectedItem.before && selectedItem.after ? (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">Before</p>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 text-xs"
                                  onClick={() => {
                                    setCurrentImageIndex(0);
                                    setIsFullscreen(true);
                                  }}
                                >
                                  <Eye className="h-3.5 w-3.5 mr-1" />
                                  Fullscreen
                                </Button>
                              </div>
                              <div className="relative aspect-square rounded-lg overflow-hidden border">
                                <Image
                                  src={
                                    selectedItem.before || "/placeholder.svg"
                                  }
                                  alt={`${selectedItem.title} before`}
                                  fill
                                  className="object-cover"
                                  onLoad={() => setIsLoading(false)}
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">After</p>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 text-xs"
                                  onClick={() => {
                                    setCurrentImageIndex(1);
                                    setIsFullscreen(true);
                                  }}
                                >
                                  <Eye className="h-3.5 w-3.5 mr-1" />
                                  Fullscreen
                                </Button>
                              </div>
                              <div className="relative aspect-square rounded-lg overflow-hidden border">
                                <Image
                                  src={selectedItem.after || "/placeholder.svg"}
                                  alt={`${selectedItem.title} after`}
                                  fill
                                  className="object-cover"
                                  onLoad={() => setIsLoading(false)}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="bg-muted/30 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">
                              Transformation Details
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {selectedItem.description}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="relative aspect-video rounded-lg overflow-hidden border">
                            <Image
                              src={selectedItem.image || "/placeholder.svg"}
                              alt={selectedItem.title}
                              fill
                              className="object-cover"
                              onLoad={() => setIsLoading(false)}
                            />
                            <Button
                              variant="secondary"
                              size="sm"
                              className="absolute bottom-3 right-3 bg-black/50 hover:bg-black/70 text-white"
                              onClick={() => {
                                setCurrentImageIndex(0);
                                setIsFullscreen(true);
                              }}
                            >
                              <Eye className="h-3.5 w-3.5 mr-1.5" />
                              Fullscreen
                            </Button>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            <Badge variant="secondary">
                              {selectedItem.category}
                            </Badge>
                            <Badge variant="outline" className="bg-primary/5">
                              Custom Work
                            </Badge>
                          </div>

                          <div className="bg-muted/30 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">
                              Project Details
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {selectedItem.description}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Bookmark className="h-4 w-4 mr-1.5" />
                          Save
                        </Button>
                        <Button variant="outline" size="sm">
                          <ImageIcon className="h-4 w-4 mr-1.5" />
                          More Like This
                        </Button>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigatePortfolio("prev")}
                          className="hidden sm:flex"
                        >
                          Previous
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigatePortfolio("next")}
                          className="hidden sm:flex"
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
