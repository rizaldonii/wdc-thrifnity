"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useProductFilter } from "@/contexts/product-filter-context";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchHeaderProps {
  currentSort: string;
  onSortChange: (value: string) => void;
  initialQuery: string;
}

export default function SearchHeader({
  currentSort,
  onSortChange,
  initialQuery,
}: SearchHeaderProps) {
  const { filters, filteredProducts, updateSearchQuery, resetFilters } =
    useProductFilter();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchInput, setSearchInput] = useState(initialQuery);
  const [debouncedInput, setDebouncedInput] = useState(initialQuery);

  // Initialize search query from URL
  useEffect(() => {
    if (initialQuery) {
      updateSearchQuery(initialQuery);
    }
  }, [initialQuery, updateSearchQuery]);

  // Handle search input change with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInput(searchInput);
      updateSearchQuery(searchInput);

      // Update URL with search query
      const params = new URLSearchParams(searchParams.toString());
      if (searchInput) {
        params.set("q", searchInput);
      } else {
        params.delete("q");
      }
      router.push(`${pathname}?${params.toString()}`);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput, updateSearchQuery, router, pathname, searchParams]);

  // Get active filter count
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.category !== "All") count++;
    if (filters.condition !== "All") count++;
    if (filters.sizes.length > 0) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) count++;
    if (filters.freeShipping) count++;
    if (filters.sustainable) count++;
    if (filters.handmade) count++;
    if (filters.vintage) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Search Products</h1>

        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground whitespace-nowrap">
            {filteredProducts.length} results
          </p>

          <Select value={currentSort} onValueChange={onSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search products by name, brand, or description..."
          className="pl-10 pr-10"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        {searchInput && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
            onClick={() => setSearchInput("")}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>

      {/* Active filters */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>

          {filters.category !== "All" && (
            <Badge variant="secondary" className="rounded-full">
              Category: {filters.category}
            </Badge>
          )}

          {filters.condition !== "All" && (
            <Badge variant="secondary" className="rounded-full">
              Condition: {filters.condition}
            </Badge>
          )}

          {(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) && (
            <Badge variant="secondary" className="rounded-full">
              Price: Rp {filters.priceRange[0] * 1000} - Rp{" "}
              {filters.priceRange[1] * 1000}
            </Badge>
          )}

          {filters.sizes.length > 0 && (
            <Badge variant="secondary" className="rounded-full">
              Sizes: {filters.sizes.join(", ")}
            </Badge>
          )}

          {filters.freeShipping && (
            <Badge variant="secondary" className="rounded-full">
              Free Shipping
            </Badge>
          )}

          {filters.sustainable && (
            <Badge variant="secondary" className="rounded-full">
              Sustainable
            </Badge>
          )}

          {filters.handmade && (
            <Badge variant="secondary" className="rounded-full">
              Handmade
            </Badge>
          )}

          {filters.vintage && (
            <Badge variant="secondary" className="rounded-full">
              Vintage
            </Badge>
          )}

          <Button
            variant="outline"
            size="sm"
            className="h-7 rounded-full text-xs"
            onClick={resetFilters}
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
