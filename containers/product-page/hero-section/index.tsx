"use client";

import type React from "react";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  TrendingUp,
  Clock,
  PercentCircle,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categories } from "@/data/categories";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useProductFilter } from "@/context/product-filter-context";

const conditions = ["All", "New", "Like New", "Excellent", "Good", "Fair"];
const popularSearches = [
  "Vintage Denim",
  "Summer Dresses",
  "Luxury Bags",
  "Eco-friendly",
  "Minimalist",
  "Y2K Fashion",
];

export default function Hero() {
  const {
    filters,
    updateSearchQuery,
    updateCategory,
    updateCondition,
    updatePriceRange,
    toggleSize,
    toggleFilter,
  } = useProductFilter();

  const [activeTab, setActiveTab] = useState("trending");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches).slice(0, 5));
      } catch (e) {
        console.error("Failed to parse recent searches", e);
      }
    }
  }, []);

  // Save recent searches to localStorage when they change
  useEffect(() => {
    if (recentSearches.length > 0) {
      localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
    }
  }, [recentSearches]);

  // Handle search submission
  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        // Add to recent searches if not already there
        if (!recentSearches.includes(searchQuery)) {
          setRecentSearches((prev) => [searchQuery, ...prev].slice(0, 5));
        }

        // Update the global filter state
        updateSearchQuery(searchQuery);
      }
    },
    [searchQuery, recentSearches, updateSearchQuery]
  );

  // Clear search query
  const clearSearch = useCallback(() => {
    setSearchQuery("");
    updateSearchQuery("");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [updateSearchQuery]);

  // Format price with currency
  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price * 1000); // Multiply by 1000 to convert to IDR
  }, []);

  // Toggle advanced filters
  const toggleAdvancedFilters = useCallback(() => {
    setShowAdvancedFilters((prev) => !prev);
  }, []);

  // Set search query from popular or recent searches
  const setSearch = useCallback((term: string) => {
    setSearchQuery(term);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Handle category change
  const handleCategoryChange = useCallback(
    (value: string) => {
      updateCategory(value);
    },
    [updateCategory]
  );

  // Handle condition change
  const handleConditionChange = useCallback(
    (value: string) => {
      updateCondition(value);
    },
    [updateCondition]
  );

  // Handle price range change
  const handlePriceRangeChange = useCallback(
    (value: [number, number]) => {
      updatePriceRange(value);
    },
    [updatePriceRange]
  );

  // Handle size toggle
  const handleSizeToggle = useCallback(
    (size: string) => {
      toggleSize(size);
    },
    [toggleSize]
  );

  // Handle checkbox filter toggle
  const handleFilterToggle = useCallback(
    (filter: "freeShipping" | "sustainable" | "handmade" | "vintage") => {
      toggleFilter(filter);
    },
    [toggleFilter]
  );

  return (
    <section
      className="relative py-12 md:py-20 lg:py-24 px-4 bg-gradient-to-b from-muted/30 to-background overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background decoration - reduced number of animations for better performance */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -left-20 -top-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            x: [0, 10, 0],
            y: [0, 15, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 12,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -right-20 -bottom-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
          animate={{
            x: [0, -15, 0],
            y: [0, -10, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 15,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <h1
            id="hero-heading"
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight"
          >
            Discover Unique{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent relative">
              Pre-loved Fashion
              <motion.svg
                className="absolute -bottom-2 left-0 w-full"
                height="6"
                viewBox="0 0 100 6"
                preserveAspectRatio="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <path
                  d="M0,3 C30,3 70,3 100,3"
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" gradientTransform="rotate(90)">
                    <stop
                      offset="0%"
                      stopColor="var(--primary)"
                      stopOpacity="0.3"
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--primary)"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>
              </motion.svg>
            </span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse through our curated collection of sustainable fashion pieces,
            each with its own story to tell and a new life waiting to begin.
          </p>
        </div>

        {/* Search and Filter Card */}
        <div className="max-w-4xl mx-auto relative">
          <div className="bg-background rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl p-5 md:p-8 border border-muted">
            {/* Tabs above search */}
            <div className="mb-5 md:mb-6">
              <Tabs
                defaultValue="trending"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-3 mb-2">
                  <TabsTrigger
                    value="trending"
                    className="flex items-center gap-1.5"
                  >
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span className={isMobile ? "text-xs" : ""}>Trending</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="newArrivals"
                    className="flex items-center gap-1.5"
                  >
                    <Clock className="h-3.5 w-3.5" />
                    <span className={isMobile ? "text-xs" : ""}>
                      New Arrivals
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="discounted"
                    className="flex items-center gap-1.5"
                  >
                    <PercentCircle className="h-3.5 w-3.5" />
                    <span className={isMobile ? "text-xs" : ""}>On Sale</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Search Bar with animated focus */}
            <form onSubmit={handleSearch} className="mb-5 md:mb-6">
              <div className="relative group">
                <Search
                  className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${
                    isSearchFocused ? "text-primary" : "text-muted-foreground"
                  }`}
                  aria-hidden="true"
                />
                <Input
                  ref={searchInputRef}
                  placeholder="What are you looking for today?"
                  className="pl-12 py-5 md:py-6 text-base md:text-lg bg-muted/30 border-muted focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  aria-label="Search products"
                />
                {searchQuery && (
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="absolute right-[5.5rem] top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                    onClick={clearSearch}
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  Search
                </Button>
              </div>
            </form>

            {/* Recent and Popular searches */}
            <div className="mb-5 md:mb-6">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-muted-foreground">
                  Popular searches:
                </p>
                {recentSearches.length > 0 && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        Recent searches
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-2">
                      <div className="space-y-1">
                        {recentSearches.map((term, index) => (
                          <Button
                            key={`recent-${index}`}
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-sm h-8"
                            onClick={() => {
                              setSearch(term);
                              updateSearchQuery(term);
                            }}
                          >
                            <Clock className="mr-2 h-3.5 w-3.5" />
                            {term}
                          </Button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <Badge
                    key={term}
                    variant="outline"
                    className="hover:bg-primary/10 cursor-pointer transition-colors"
                    onClick={() => {
                      setSearch(term);
                      updateSearchQuery(term);
                    }}
                  >
                    {term}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Basic Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <div className="col-span-1 sm:col-span-2">
                <Select
                  defaultValue="All"
                  value={filters.category}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger
                    className="w-full bg-muted/30 rounded-xl h-10 md:h-12"
                    aria-label="Select category"
                  >
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select
                  defaultValue="All"
                  value={filters.condition}
                  onValueChange={handleConditionChange}
                >
                  <SelectTrigger
                    className="w-full bg-muted/30 rounded-xl h-10 md:h-12"
                    aria-label="Select condition"
                  >
                    <SelectValue placeholder="Condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((condition) => (
                      <SelectItem key={condition} value={condition}>
                        {condition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Button
                  variant={showAdvancedFilters ? "secondary" : "default"}
                  className="w-full h-10 md:h-12 rounded-xl"
                  onClick={toggleAdvancedFilters}
                  aria-expanded={showAdvancedFilters}
                  aria-controls="advanced-filters"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {showAdvancedFilters ? "Hide Filters" : "More Filters"}
                </Button>
              </div>
            </div>

            {/* Advanced Filters */}
            <AnimatePresence>
              {showAdvancedFilters && (
                <motion.div
                  id="advanced-filters"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-5 md:pt-6 mt-5 md:mt-6 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                      {/* Price Range */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-medium">Price Range</h3>
                          <p className="text-sm text-muted-foreground">
                            {formatPrice(filters.priceRange[0])} -{" "}
                            {formatPrice(filters.priceRange[1])}
                          </p>
                        </div>
                        <Slider
                          defaultValue={[0, 500]}
                          max={1000}
                          step={10}
                          value={filters.priceRange}
                          onValueChange={handlePriceRangeChange}
                          aria-label="Price range"
                        />
                      </div>

                      {/* Size Filter */}
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">Size</h3>
                        <div className="flex flex-wrap gap-2">
                          {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                            <Badge
                              key={size}
                              variant={
                                filters.sizes.includes(size)
                                  ? "default"
                                  : "outline"
                              }
                              className={`hover:bg-primary/10 cursor-pointer transition-colors py-1.5 px-3 ${
                                filters.sizes.includes(size)
                                  ? "bg-primary text-primary-foreground"
                                  : ""
                              }`}
                              onClick={() => handleSizeToggle(size)}
                            >
                              {size}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Additional Filters */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5 md:mt-6">
                      <Button
                        variant={filters.freeShipping ? "default" : "outline"}
                        size="sm"
                        className="justify-start"
                        onClick={() => handleFilterToggle("freeShipping")}
                      >
                        <input
                          type="checkbox"
                          id="free-shipping"
                          className="mr-2"
                          checked={filters.freeShipping}
                          onChange={() => {}}
                          aria-label="Free shipping"
                        />
                        <label htmlFor="free-shipping">Free Shipping</label>
                      </Button>
                      <Button
                        variant={filters.sustainable ? "default" : "outline"}
                        size="sm"
                        className="justify-start"
                        onClick={() => handleFilterToggle("sustainable")}
                      >
                        <input
                          type="checkbox"
                          id="sustainable"
                          className="mr-2"
                          checked={filters.sustainable}
                          onChange={() => {}}
                          aria-label="Sustainable"
                        />
                        <label htmlFor="sustainable">Sustainable</label>
                      </Button>
                      <Button
                        variant={filters.handmade ? "default" : "outline"}
                        size="sm"
                        className="justify-start"
                        onClick={() => handleFilterToggle("handmade")}
                      >
                        <input
                          type="checkbox"
                          id="handmade"
                          className="mr-2"
                          checked={filters.handmade}
                          onChange={() => {}}
                          aria-label="Handmade"
                        />
                        <label htmlFor="handmade">Handmade</label>
                      </Button>
                      <Button
                        variant={filters.vintage ? "default" : "outline"}
                        size="sm"
                        className="justify-start"
                        onClick={() => handleFilterToggle("vintage")}
                      >
                        <input
                          type="checkbox"
                          id="vintage"
                          className="mr-2"
                          checked={filters.vintage}
                          onChange={() => {}}
                          aria-label="Vintage"
                        />
                        <label htmlFor="vintage">Vintage (20+ years)</label>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
