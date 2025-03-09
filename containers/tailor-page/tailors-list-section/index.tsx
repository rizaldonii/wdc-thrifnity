"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Clock,
  MapPin,
  Check,
  Filter,
  ArrowUpDown,
  Search,
} from "lucide-react";
import { tailors } from "@/data/tailors";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tailor } from "@/types/tailor";

// Extract unique specialties and tags for filtering
const allSpecialties = Array.from(
  new Set(tailors.flatMap((tailor) => tailor.specialty))
);

const allTags = Array.from(new Set(tailors.flatMap((tailor) => tailor.tags)));

interface TailorsListProps {
  searchQuery?: string;
}

export default function TailorsList({ searchQuery = "" }: TailorsListProps) {
  const [filteredTailors, setFilteredTailors] = useState<Tailor[]>(tailors);
  const [activeFilters, setActiveFilters] = useState<{
    specialty: string | null;
    tag: string | null;
    rating: number | null;
    sortBy: "rating" | "reviews" | "experience" | null;
    search: string | null;
  }>({
    specialty: null,
    tag: null,
    rating: null,
    sortBy: null,
    search: null,
  });

  // Update search filter when searchQuery changes
  useEffect(() => {
    if (searchQuery) {
      setActiveFilters((prev) => ({ ...prev, search: searchQuery }));
    }
  }, [searchQuery]);

  // Effect to apply filters and sorting
  useEffect(() => {
    let result = [...tailors];

    // Apply search filter
    if (activeFilters.search) {
      const searchTerm = activeFilters.search.toLowerCase();
      result = result.filter(
        (tailor) =>
          tailor.name.toLowerCase().includes(searchTerm) ||
          tailor.location.city.toLowerCase().includes(searchTerm) ||
          tailor.location.province.toLowerCase().includes(searchTerm) ||
          tailor.specialty.some((spec) =>
            spec.toLowerCase().includes(searchTerm)
          ) ||
          tailor.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
          tailor.description.toLowerCase().includes(searchTerm)
      );
    }

    // Apply specialty filter
    if (activeFilters.specialty) {
      result = result.filter((tailor) =>
        tailor.specialty.includes(activeFilters.specialty!)
      );
    }

    // Apply tag filter
    if (activeFilters.tag) {
      result = result.filter((tailor) =>
        tailor.tags.includes(activeFilters.tag!)
      );
    }

    // Apply rating filter
    if (activeFilters.rating) {
      result = result.filter(
        (tailor) => tailor.rating >= activeFilters.rating!
      );
    }

    // Apply sorting
    if (activeFilters.sortBy) {
      result.sort((a, b) => {
        switch (activeFilters.sortBy) {
          case "rating":
            return b.rating - a.rating;
          case "reviews":
            return b.totalReviews - a.totalReviews;
          case "experience":
            return b.experience - a.experience;
          default:
            return 0;
        }
      });
    }

    setFilteredTailors(result);
  }, [activeFilters]);

  // Reset all filters
  const resetFilters = () => {
    setActiveFilters({
      specialty: null,
      tag: null,
      rating: null,
      sortBy: null,
      search: null,
    });
  };

  // Container animation for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Child item animations
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Tailors Near You
              {activeFilters.search && (
                <span className="text-primary">
                  {" "}
                  matching "{activeFilters.search}"
                </span>
              )}
            </h2>
            <p className="text-muted-foreground">
              {filteredTailors.length} tailors found
              {activeFilters.specialty ||
              activeFilters.tag ||
              activeFilters.rating ||
              activeFilters.search
                ? " with your filters"
                : ""}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {/* Active search filter badge */}
            {activeFilters.search && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Search className="h-3 w-3" />
                {activeFilters.search}
                <button
                  className="ml-1 hover:bg-secondary-foreground/10 rounded-full p-1"
                  onClick={() =>
                    setActiveFilters((prev) => ({ ...prev, search: null }))
                  }
                >
                  <span className="sr-only">Remove search filter</span>×
                </button>
              </Badge>
            )}

            {/* Specialty filter */}
            <Select
              onValueChange={(value: string) =>
                setActiveFilters((prev) => ({
                  ...prev,
                  specialty: value === "all" ? null : value,
                }))
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                {allSpecialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Tag filter */}
            <Select
              onValueChange={(value) =>
                setActiveFilters((prev) => ({
                  ...prev,
                  tag: value === "all" ? null : value,
                }))
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tags" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                {allTags.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Rating filter */}
            <Select
              onValueChange={(value) =>
                setActiveFilters((prev) => ({
                  ...prev,
                  rating: value === "all" ? null : Number(value),
                }))
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Min Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Rating</SelectItem>
                <SelectItem value="4.5">4.5+</SelectItem>
                <SelectItem value="4">4.0+</SelectItem>
                <SelectItem value="3.5">3.5+</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  Sort by
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() =>
                    setActiveFilters((prev) => ({ ...prev, sortBy: "rating" }))
                  }
                >
                  Highest Rating
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    setActiveFilters((prev) => ({ ...prev, sortBy: "reviews" }))
                  }
                >
                  Most Reviews
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    setActiveFilters((prev) => ({
                      ...prev,
                      sortBy: "experience",
                    }))
                  }
                >
                  Most Experience
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Reset filters */}
            {(activeFilters.specialty ||
              activeFilters.tag ||
              activeFilters.rating ||
              activeFilters.sortBy ||
              activeFilters.search) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="text-muted-foreground"
              >
                Reset
              </Button>
            )}
          </div>
        </div>

        {/* Tailors list */}
        {filteredTailors.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredTailors.map((tailor) => (
              <motion.div key={tailor.id} variants={itemVariants}>
                <Link href={`/tailors/${tailor.slug}`}>
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="relative w-full h-44">
                      <Image
                        src={tailor.coverImage || "/placeholder.svg"}
                        alt={tailor.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {tailor.isVerified && (
                        <Badge
                          variant="secondary"
                          className="absolute top-3 right-3 flex items-center gap-1"
                        >
                          <Check className="h-3 w-3" /> Verified
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-background flex-shrink-0">
                          <Image
                            src={tailor.avatar || "/placeholder.svg"}
                            alt={tailor.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                            {tailor.name}
                          </h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>
                              {tailor.location.city}, {tailor.location.province}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {tailor.description}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1 fill-yellow-500" />
                          <span className="font-bold mr-1">
                            {tailor.rating.toFixed(1)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({tailor.totalReviews})
                          </span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{tailor.stats.averageResponseTime}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {tailor.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="font-normal"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {tailor.tags.length > 3 && (
                          <Badge
                            variant="outline"
                            className="font-normal bg-background/50"
                          >
                            +{tailor.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Filter className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium mb-2">No tailors found</h3>
            <p className="text-muted-foreground mb-6">
              {activeFilters.search
                ? `No results for "${activeFilters.search}". Try a different search term or adjust your filters.`
                : "Try adjusting your filters or search criteria"}
            </p>
            <Button onClick={resetFilters}>Reset all filters</Button>
          </div>
        )}
      </div>
    </section>
  );
}
