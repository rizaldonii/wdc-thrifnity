"use client";

import { useEffect, useState } from "react";
import {
  Sparkles,
  ChevronRight,
  ArrowDownUp,
  Grid3X3,
  Grid2X2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProductCard from "@/components/ProductCard/index";
import { products } from "@/data/products";
import type { Product } from "@/types/product";

const NewArrivals = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [layout, setLayout] = useState("grid-3");

  // Extract unique categories
  const categories = [
    "all",
    ...new Set(products.filter((p) => p.isNew).map((p) => p.category.main)),
  ];

  useEffect(() => {
    try {
      // Get all new products
      const allNewProducts = products
        .filter((product) => product.isNew)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

      setNewProducts(allNewProducts);
      setFilteredProducts(allNewProducts.slice(0, 6));
    } catch (error) {
      console.error("Error filtering new products:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Filter products when category or sort changes
  useEffect(() => {
    let result = [...newProducts];

    // Apply category filter
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category.main === activeCategory);
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    setFilteredProducts(result.slice(0, 6));
  }, [activeCategory, sortBy, newProducts]);

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
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative py-20 px-4 md:px-6 bg-gradient-to-b from-background to-background/50">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-60" />
      </div>
      <div className="container mx-auto">
        {/* Header Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-center max-w-3xl mx-auto relative"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative inline-block mb-6"
          >
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/20 backdrop-blur-sm px-4 py-1.5 font-medium"
            >
              <span className="relative flex h-2 w-2 mr-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="tracking-wider">NEW COLLECTION</span>
              <Sparkles className="w-4 h-4 ml-2 text-primary animate-pulse" />
            </Badge>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative mb-6"
          >
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Discover Our{" "}
              <span className="relative inline-block">
                <span className="absolute -inset-1 bg-primary/10 rounded-lg blur"></span>
                <span className="relative bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  New Arrivals
                </span>
              </span>
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8"
          >
            Experience our latest sustainable fashion pieces,{" "}
            <br className="hidden md:block" />
            thoughtfully curated for the conscious and stylish you.
          </motion.p>

          {/* Enhanced Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center gap-12 mt-8 pt-8 border-t border-border/50"
          >
            {[
              { label: "New Items", value: newProducts.length, icon: "✨" },
              { label: "Categories", value: categories.length - 1, icon: "🏷️" }, // -1 for "all"
              { label: "Limited Editions", value: "5+", icon: "⭐" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-4 rounded-lg bg-card/50 backdrop-blur-sm shadow-sm border border-border/30"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Filter & Sort Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          {/* Category Tabs */}
          <Tabs
            defaultValue="all"
            className="w-full md:w-auto"
            onValueChange={setActiveCategory}
            value={activeCategory}
          >
            <TabsList className="h-10 w-full md:w-auto grid grid-cols-3 md:flex md:flex-row">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="capitalize"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <ArrowDownUp className="h-4 w-4" />
                  <span className="hidden md:inline">
                    {sortBy === "newest"
                      ? "Newest First"
                      : sortBy === "price-low"
                      ? "Price: Low to High"
                      : sortBy === "price-high"
                      ? "Price: High to Low"
                      : "Highest Rated"}
                  </span>
                  <span className="md:hidden">Sort</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={sortBy}
                  onValueChange={setSortBy}
                >
                  <DropdownMenuRadioItem value="newest">
                    Newest First
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price-low">
                    Price: Low to High
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price-high">
                    Price: High to Low
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="rating">
                    Highest Rated
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Grid Layout Toggle */}
            <div className="flex bg-muted rounded-md p-1">
              <Button
                variant={layout === "grid-3" ? "default" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setLayout("grid-3")}
                aria-label="Three column grid"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={layout === "grid-2" ? "default" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setLayout("grid-2")}
                aria-label="Two column grid"
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 animate-pulse">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-muted rounded-lg h-[400px] relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-muted/90 to-muted/50 animate-pulse" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`grid gap-6 ${
              layout === "grid-3"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 md:grid-cols-2"
            }`}
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))
            ) : (
              <motion.p
                variants={itemVariants}
                className="col-span-full text-center text-muted-foreground py-12 bg-card/50 rounded-lg border border-border/30"
              >
                No products match your current filters. Try changing your
                selection.
              </motion.p>
            )}
          </motion.div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button
            asChild
            size="lg"
            className="px-8 py-6 text-base rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <a href="/products">
              View All New Arrivals
              <ChevronRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default NewArrivals;
