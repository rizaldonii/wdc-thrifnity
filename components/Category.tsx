"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { type FC, useState, useEffect } from "react";
import {
  ChevronRight,
  Filter,
  LayoutGrid,
  List,
  Search,
  ShoppingBag,
  Shirt,
  PenIcon as Pants,
  SaladIcon as Dress,
  PocketIcon as Jacket,
  SunMoon,
  Sparkles,
  X,
  SlidersHorizontal,
  Check,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  icon: string;
  itemCount: number;
}

interface CategoriesProps {
  categories: Category[];
}

const Categories: FC<CategoriesProps> = ({ categories }) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [sortOrder, setSortOrder] = useState<"name" | "items">("name");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Set mounted to true on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter categories based on search query
  const filteredCategories = categories
    .filter((category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "name") {
        return a.name.localeCompare(b.name);
      } else {
        return b.itemCount - a.itemCount;
      }
    });

  // Get icon component based on category name
  const getCategoryIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "tops":
        return <Shirt className="w-6 h-6" />;
      case "bottoms":
        return <Pants className="w-6 h-6" />;
      case "dresses":
        return <Dress className="w-6 h-6" />;
      case "outerwear":
        return <Jacket className="w-6 h-6" />;
      default:
        return <ShoppingBag className="w-6 h-6" />;
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const filterVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section className="py-16 px-4 mt-8 sm:px-6 lg:px-8 shadow-md transition-colors duration-300">
      {" "}
      <div className="max-w-7xl mx-auto">
        <div className="relative mb-16">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute -left-4 top-1/2 w-40 h-40 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl transform -translate-y-1/2 animate-pulse"
              style={{ animationDuration: "15s" }}
            />
            <div
              className="absolute -right-4 top-1/3 w-40 h-40 bg-secondary/10 dark:bg-secondary/20 rounded-full blur-3xl transform -translate-y-1/3 animate-pulse"
              style={{ animationDuration: "20s" }}
            />
            <div
              className="absolute left-1/4 bottom-0 w-32 h-32 bg-success/10 dark:bg-success/20 rounded-full blur-3xl animate-pulse"
              style={{ animationDuration: "25s" }}
            />
          </div>
          {/* Header Content */}
          <div className="relative text-center space-y-8">
            {/* Decorative elements */}
            <div className="absolute -top-8 left-1/4 w-24 h-24 bg-gradient-to-r from-[var(--color-primary)]/30 to-transparent rounded-full blur-2xl animate-pulse" />
            <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-l from-[var(--color-secondary-dark)]/60 to-transparent rounded-full blur-3xl animate-pulse" />

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative inline-block"
            >
              <span className="inline-flex items-center gap-2.5 px-5 py-2 text-sm font-medium text-[var(--text-primary)] dark:text-[var(--text-primary-light)] bg-[var(--background-start-rgb)] dark:bg-[var(--background-end-rgb)]/60 backdrop-blur-sm rounded-full mb-4 shadow-lg border border-[var(--color-accent)]/20 dark:border-[var(--color-secondary)]/30">
                {" "}
                <Sparkles className="w-4 h-4" />
                <span className="tracking-wider">TRENDING COLLECTIONS</span>
                <Sparkles className="w-4 h-4" />
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative text-4xl md:text-6xl font-bold"
            >
              <span className="bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] dark:from-[var(--color-primary)] dark:to-[var(--color-secondary)] bg-clip-text text-transparent">
                Explore Our Categories
              </span>
              <div className="absolute -right-4 -top-4 w-12 h-12 bg-[var(--color-primary)]/10 dark:bg-[var(--color-primary)]/20 rounded-full blur-xl" />
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[var(--text-secondary)] dark:text-[var(--text-secondary)] max-w-2xl mx-auto text-lg leading-relaxed"
            >
              Discover our thoughtfully curated collection of sustainable
              fashion pieces,
              <br className="hidden md:block" />
              where style meets consciousness in perfect harmony
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-4"
            ></motion.div>
          </div>

          {/* Controls Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 flex flex-col space-y-4"
          >
            {/* Search and Filter Row */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Search Bar */}
              <div className="relative w-full sm:w-72 md:w-96">
                <div
                  className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
                    isSearchFocused
                      ? "shadow-lg transform scale-[1.02]"
                      : "hover:ring-opacity-50"
                  } bg-primary dark:bg-primary-dark border border-accent dark:border-secondary`}
                >
                  <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="w-full py-3 px-5 pr-12 focus:outline-none placeholder-text-subtle bg-transparent text-primary dark:text-primary-light"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {searchQuery ? (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="p-1 rounded-full hover:bg-accent dark:hover:bg-secondary/20"
                      >
                        <X
                          className={`w-4 h-4 ${
                            isSearchFocused
                              ? "text-primary dark:text-primary-light"
                              : "text-text-subtle dark:text-text-subtle"
                          } transition-colors duration-200`}
                        />
                      </button>
                    ) : (
                      <Search
                        className={`w-5 h-5 ${
                          isSearchFocused
                            ? "text-primary dark:text-primary-light"
                            : "text-text-subtle dark:text-text-subtle"
                        } transition-colors duration-200`}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Filter and View Controls */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                {/* Filter Button */}
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                    isFilterOpen
                      ? "bg-[var(--color-primary)] dark:bg-[var(--color-primary-light)] text-[var(--text-on-primary)]"
                      : "bg-[var(--color-primary-light)] dark:bg-[var(--color-primary-dark)] hover:bg-[var(--color-primary)] dark:hover:bg-[var(--color-secondary)] text-[var(--text-primary)] dark:text-[var(--text-primary)]"
                  }`}
                  aria-expanded={isFilterOpen}
                  aria-controls="filter-panel"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="text-sm font-medium">Filter</span>
                </button>

                {/* View Toggle */}
                <div className="flex items-center rounded-lg p-1 bg-[var(--background-start-rgb)] dark:bg-[var(--background-end-rgb)]">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 ${
                      viewMode === "grid"
                        ? "bg-[var(--color-primary-light)] dark:bg-[var(--color-primary)] text-[var(--text-on-primary)] shadow-sm"
                        : "bg-transparent text-[var(--text-secondary)] dark:text-[var(--text-secondary)]"
                    }`}
                    aria-label="Grid view"
                    aria-pressed={viewMode === "grid"}
                  >
                    <LayoutGrid className="w-4 h-4" />
                    <span className="text-sm font-medium">Grid</span>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 ${
                      viewMode === "list"
                        ? "bg-[var(--color-primary-light)] dark:bg-[var(--color-primary)] text-[var(--text-on-primary)] shadow-sm"
                        : "bg-transparent text-[var(--text-secondary)] dark:text-[var(--text-secondary)]"
                    }`}
                    aria-label="List view"
                    aria-pressed={viewMode === "list"}
                  >
                    <List className="w-4 h-4" />
                    <span className="text-sm font-medium">List</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Panel */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  id="filter-panel"
                  variants={filterVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="rounded-xl p-4 shadow-md overflow-hidden bg-[var(--background-start-rgb)] dark:bg-[var(--color-accent)] border border-[var(--color-accent)] dark:border-[var(--color-secondary)]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-[var(--text-primary)] dark:text-[var(--text-primary)]">
                        Sort by
                      </h4>
                      <div className="flex mt-2 space-x-2">
                        <button
                          onClick={() => setSortOrder("name")}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 ${
                            sortOrder === "name"
                              ? "bg-[var(--color-primary-light)] dark:bg-[var(--color-primary)] text-[var(--text-on-primary)]"
                              : "bg-[var(--color-accent)] dark:bg-[var(--color-secondary-dark)] text-[var(--text-primary)] dark:text-[var(--text-primary)] opacity-80"
                          }`}
                        >
                          {sortOrder === "name" && (
                            <Check className="w-3 h-3" />
                          )}
                          Name
                        </button>
                        <button
                          onClick={() => setSortOrder("items")}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 ${
                            sortOrder === "items"
                              ? "bg-[var(--color-primary-light)] dark:bg-[var(--color-primary)] text-[var(--text-on-primary)]"
                              : "bg-[var(--color-accent)] dark:bg-[var(--color-secondary-dark)] text-[var(--text-primary)] dark:text-[var(--text-primary)] opacity-80"
                          }`}
                        >
                          {sortOrder === "items" && (
                            <Check className="w-3 h-3" />
                          )}
                          Most Items
                        </button>
                      </div>
                    </div>

                    <div className="self-end">
                      <p className="text-sm text-[var(--text-muted)] dark:text-[var(--text-muted)]">
                        Showing {filteredCategories.length} of{" "}
                        {categories.length} categories
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
        {/* Category Grid View */}
        {viewMode === "grid" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredCategories.map((category) => (
              <motion.div key={category.id} variants={itemVariants}>
                <Link
                  href={`/category/${category.slug}`}
                  className="group block relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-[var(--background-start-rgb)] dark:bg-[var(--color-accent)]"
                >
                  <div className="aspect-[4/5] relative">
                    <Image
                      src={category.imageUrl || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      quality={90}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-secondary-dark)]/80 via-[var(--color-secondary)]/40 to-transparent opacity-70 group-hover:opacity-75 transition-opacity" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity bg-gradient-to-tr from-[var(--color-primary)]/30 to-transparent" />

                    {/* Category Icon Badge */}
                    <div className="absolute top-4 right-4 p-2.5 rounded-full shadow-lg transform -rotate-12 group-hover:rotate-0 transition-all duration-300 group-hover:scale-110 bg-[var(--background-start-rgb)]/90 dark:bg-[var(--color-secondary)]/90">
                      <span className="text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                        {getCategoryIcon(category.name)}
                      </span>
                    </div>

                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <div className="transform group-hover:translate-y-0 translate-y-2 transition-transform duration-500">
                        <h3 className="text-xl font-bold text-[var(--text-on-primary)] mb-1 group-hover:translate-x-1 transition-transform">
                          {category.name}
                        </h3>
                        <div className="flex items-center justify-between mt-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--background-start-rgb)]/20 text-[var(--text-on-primary)] backdrop-blur-sm">
                            {category.itemCount} items
                          </span>
                          <span className="p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 shadow-lg bg-[var(--color-primary)] dark:bg-[var(--color-primary-light)] text-[var(--text-on-primary)]">
                            <ChevronRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Category List View */}
        {viewMode === "list" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-5"
          >
            {filteredCategories.map((category) => (
              <motion.div key={category.id} variants={itemVariants}>
                <Link
                  href={`/category/${category.slug}`}
                  className="group flex flex-col sm:flex-row items-center overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 bg-[var(--background-start-rgb)] dark:bg-[var(--color-accent)] border border-[var(--color-accent)] dark:border-[var(--color-secondary)]"
                >
                  <div className="relative w-full sm:w-56 h-52 sm:h-40">
                    <Image
                      src={category.imageUrl || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 224px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-secondary-dark)]/60 via-[var(--color-secondary)]/30 to-transparent sm:bg-gradient-to-t" />

                    {/* Category Indicator */}
                    <div className="absolute top-4 left-4 p-2.5 rounded-full shadow-md transition-colors duration-300 bg-[var(--background-start-rgb)]/90 dark:bg-[var(--color-secondary)]/90">
                      <span className="transition-colors duration-300 text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                        {getCategoryIcon(category.name)}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 p-6 sm:p-5 flex flex-col justify-between relative">
                    {/* Subtle decorative element */}
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl -mr-16 -mt-16 opacity-5 bg-[var(--color-primary-light)] dark:bg-[var(--color-primary)]" />

                    <div className="relative">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-[var(--text-primary)] dark:text-[var(--text-primary)]">
                          {category.name}
                        </h3>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--color-primary)]/10 dark:bg-[var(--color-primary)]/20 text-[var(--text-primary)] dark:text-[var(--text-primary)]">
                          {category.itemCount} items
                        </span>
                      </div>
                      <p className="mt-2 text-[var(--text-secondary)] dark:text-[var(--text-secondary)]">
                        Browse our selection of sustainable{" "}
                        {category.name.toLowerCase()} for every occasion
                      </p>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-xs text-[var(--text-muted)] dark:text-[var(--text-muted)]">
                        New arrivals weekly
                      </span>
                      <span className="inline-flex items-center font-medium text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                        Explore collection
                        <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty state */}
        {filteredCategories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 px-4 rounded-2xl shadow-sm bg-[var(--background-start-rgb)] dark:bg-[var(--color-accent)] border border-[var(--color-accent)] dark:border-[var(--color-secondary)]"
          >
            <div className="inline-flex justify-center items-center w-20 h-20 rounded-full mb-6 bg-[var(--color-accent)] dark:bg-[var(--color-secondary)]">
              <Filter className="w-10 h-10 text-[var(--text-subtle)] dark:text-[var(--text-subtle)]" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--text-primary)] dark:text-[var(--text-primary)]">
              No categories found
            </h3>
            <p className="mt-3 max-w-md mx-auto text-[var(--text-secondary)] dark:text-[var(--text-secondary)]">
              We couldn't find any categories matching your search. Try
              adjusting your search terms or browse all categories.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-6 inline-flex items-center px-6 py-3 rounded-full shadow-sm font-medium text-sm transition-colors border-transparent bg-[var(--color-primary)] dark:bg-[var(--color-primary-light)] text-[var(--text-on-primary)]"
            >
              Clear search
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Categories;
