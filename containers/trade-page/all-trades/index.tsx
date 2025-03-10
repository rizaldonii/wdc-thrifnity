"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, Filter, Tag, ArrowRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { trades } from "@/data/trades";
import type { Trade } from "@/types/trade";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

export default function AllTrades() {
  const [isMounted, setIsMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filteredTrades, setFilteredTrades] = useState<Trade[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const sortTrades = (tradesToSort: Trade[], sortOption: string) => {
    switch (sortOption) {
      case "newest":
        return [...tradesToSort].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return [...tradesToSort].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      default:
        return tradesToSort;
    }
  };

  // Filter and search trades
  useEffect(() => {
    setIsMounted(true);

    let result = [...trades];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (trade) =>
          // Search in initiator's product
          trade.initiator.offeredProduct.name.toLowerCase().includes(query) ||
          trade.initiator.offeredProduct.brand.toLowerCase().includes(query) ||
          trade.initiator.offeredProduct.description
            ?.toLowerCase()
            .includes(query) ||
          // Search in interested products
          trade.initiator.interestedProducts.some(
            (product) =>
              product.name.toLowerCase().includes(query) ||
              product.brand.toLowerCase().includes(query) ||
              product.description?.toLowerCase().includes(query)
          ) ||
          // Search in user name
          trade.initiator.user.name.toLowerCase().includes(query)
      );
    }

    // Apply brand filter
    if (selectedBrands.length > 0) {
      result = result.filter(
        (trade) =>
          selectedBrands.includes(
            trade.initiator?.offeredProduct?.brand || ""
          ) ||
          trade.initiator?.interestedProducts?.some(
            (product) =>
              product?.brand && selectedBrands.includes(product.brand)
          ) ||
          false
      );
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter((trade) => {
        const initiatorCategory =
          trade.initiator?.offeredProduct?.category?.main;
        const interestedCategories =
          trade.initiator?.interestedProducts
            ?.map((product) => product?.category?.main)
            .filter(Boolean) || [];

        return (
          (initiatorCategory &&
            selectedCategories.includes(initiatorCategory)) ||
          interestedCategories.some(
            (category) => category && selectedCategories.includes(category)
          )
        );
      });
    }

    // Apply size filter
    if (selectedSizes.length > 0) {
      result = result.filter((trade) => {
        const initiatorSizes =
          trade.initiator?.offeredProduct?.availableSizes || [];
        const interestedSizes =
          trade.initiator?.interestedProducts
            ?.flatMap((product) => product?.availableSizes || [])
            .filter(Boolean) || [];

        return (
          initiatorSizes.some(
            (size) => size && selectedSizes.includes(size as string)
          ) ||
          interestedSizes.some(
            (size) => size && selectedSizes.includes(size as string)
          )
        );
      });
    }

    // Apply sorting
    result = sortTrades(result, sortBy);

    setFilteredTrades(result);
  }, [searchQuery, selectedBrands, selectedCategories, selectedSizes, sortBy]);

  // Don't render content until client-side hydration is complete
  // This prevents hydration mismatches
  if (!isMounted) {
    return (
      <div className="mb-16">
        <div className="animate-pulse space-y-8">
          <div className="h-14 bg-muted rounded-2xl w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[400px] bg-muted rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Toggle brand selection
  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Toggle size selection
  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSearchQuery("");
  };

  // Extract unique brands, categories, and sizes for filter options
  const uniqueBrands = Array.from(
    new Set([
      ...trades.map((t) => t.initiator.offeredProduct.brand),
      ...trades.flatMap(
        (t) => t.initiator.interestedProducts?.map((p) => p?.brand) || []
      ),
    ])
  )
    .filter(Boolean)
    .sort();

  const uniqueCategories = Array.from(
    new Set([
      ...trades.map((t) => t.initiator.offeredProduct.category?.main),
      ...trades.flatMap(
        (t) =>
          t.initiator.interestedProducts?.map((p) => p?.category?.main) || []
      ),
    ])
  ).filter(Boolean) as string[];

  const uniqueSizes = Array.from(
    new Set([
      ...trades.flatMap((t) => t.initiator.offeredProduct.availableSizes || []),
      ...trades.flatMap(
        (t) =>
          t.initiator.interestedProducts?.flatMap(
            (p) => p?.availableSizes || []
          ) || []
      ),
    ])
  )
    .filter(Boolean)
    .sort();

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
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <div className="mb-16">
      {/* Search and Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={cn(
          "mb-10 p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center",
          isDark
            ? "bg-gradient-to-r from-pink-500/5 to-indigo-500/5 border border-pink-500/10"
            : "bg-gradient-to-r from-pink-50 to-indigo-50 border border-pink-100"
        )}
      >
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Search by product, brand, or user..."
            className="pl-10 bg-background border-pink-200 dark:border-pink-800 rounded-full h-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap justify-center">
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "rounded-full border-pink-200 dark:border-pink-800",
                  (selectedBrands.length > 0 ||
                    selectedCategories.length > 0 ||
                    selectedSizes.length > 0) &&
                    "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                )}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
                {(selectedBrands.length > 0 ||
                  selectedCategories.length > 0 ||
                  selectedSizes.length > 0) && (
                  <Badge className="ml-2 bg-background text-foreground">
                    {selectedBrands.length +
                      selectedCategories.length +
                      selectedSizes.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="h-8 text-xs"
                  >
                    Clear all
                  </Button>
                </div>

                {/* Brands */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Brands</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {uniqueBrands.slice(0, 6).map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={`brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => toggleBrand(brand)}
                        />
                        <Label htmlFor={`brand-${brand}`} className="text-sm">
                          {brand}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {uniqueBrands.length > 6 && (
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 h-auto mt-1"
                    >
                      Show more
                    </Button>
                  )}
                </div>

                {/* Categories */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Categories</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {uniqueCategories.slice(0, 6).map((category) => (
                      <div
                        key={category}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <Label
                          htmlFor={`category-${category}`}
                          className="text-sm"
                        >
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Sizes</h4>
                  <div className="flex flex-wrap gap-2">
                    {uniqueSizes.map((size) => (
                      <Badge
                        key={size}
                        variant={
                          selectedSizes.includes(size as string)
                            ? "default"
                            : "outline"
                        }
                        className="cursor-pointer"
                        onClick={() => toggleSize(size as string)}
                      >
                        {size}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px] rounded-full border-pink-200 dark:border-pink-800 h-9">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Trades List */}
      {filteredTrades.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <Tag className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-2">No trades found</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            {searchQuery ||
            selectedBrands.length > 0 ||
            selectedCategories.length > 0 ||
            selectedSizes.length > 0
              ? "Try adjusting your filters or search query to find what you're looking for."
              : "There are currently no trade requests. Check back later or create a new trade request."}
          </p>
          <Button asChild>
            <Link href="/trade/create">Create Trade Request</Link>
          </Button>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredTrades.map((trade) => (
            <motion.div key={trade.id} variants={itemVariants}>
              <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                <CardContent className="p-0 h-full flex flex-col">
                  {/* Trade Header */}
                  <div className="p-4 flex justify-between items-center border-b">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={
                            trade.initiator.user.avatar ||
                            "/placeholder.svg?height=32&width=32"
                          }
                          alt={trade.initiator.user.name}
                        />
                        <AvatarFallback>
                          {trade.initiator.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium line-clamp-1">
                          {trade.initiator.user.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(trade.createdAt), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-primary">Trade</Badge>
                  </div>

                  {/* Trade Content */}
                  <div className="flex-1 flex flex-col">
                    {/* Offered Product */}
                    <div className="p-4 border-b">
                      <div className="flex gap-3">
                        <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={
                              trade.initiator.offeredProduct.images?.[0]?.url ??
                              ""
                            }
                            alt={trade.initiator.offeredProduct.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm line-clamp-1">
                            {trade.initiator.offeredProduct.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mb-1">
                            {trade.initiator.offeredProduct.brand} •{" "}
                            {trade.initiator.offeredProduct.condition}
                          </p>
                          <div className="flex items-center gap-1">
                            {trade.initiator.offeredProduct.category?.main && (
                              <Badge
                                variant="outline"
                                className="text-xs px-1.5 py-0"
                              >
                                {trade.initiator.offeredProduct.category.main}
                              </Badge>
                            )}
                            {trade.initiator.offeredProduct
                              .availableSizes?.[0] && (
                              <Badge
                                variant="outline"
                                className="text-xs px-1.5 py-0"
                              >
                                Size:{" "}
                                {
                                  trade.initiator.offeredProduct
                                    .availableSizes[0]
                                }
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Exchange Icon */}
                    <div className="flex justify-center -my-3 relative z-10">
                      <div className="bg-background p-1.5 rounded-full border">
                        <ArrowRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>

                    {/* Interested Products */}
                    <div className="p-4 border-t">
                      {trade.initiator.interestedProducts.length > 0 ? (
                        <div>
                          <p className="text-xs text-muted-foreground mb-2">
                            Interested in:
                          </p>
                          <div className="flex gap-2 overflow-x-auto pb-2">
                            {trade.initiator.interestedProducts?.map(
                              (product, index) => (
                                <div key={index} className="flex-shrink-0 w-16">
                                  <div className="relative w-16 h-16 rounded-md overflow-hidden mb-1">
                                    <Image
                                      src={
                                        product?.images?.[0]?.url ||
                                        "/placeholder.svg?height=64&width=64"
                                      }
                                      alt={product?.name || "Product image"}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <p className="text-xs line-clamp-1">
                                    {product?.name || "Unnamed product"}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-20 text-sm text-muted-foreground">
                          Open to offers
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Trade Footer */}
                  <div className="p-4 border-t mt-auto">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(trade.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <Button size="sm" asChild>
                        <Link href={`/trade/${trade.slug}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
