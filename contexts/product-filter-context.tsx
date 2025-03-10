"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Product, ProductCategory, ClothingCondition } from "@/types/product";
import { products as allProducts } from "@/data/products";

type PriceRange = [number, number];

interface FilterState {
  searchQuery: string;
  category: string;
  condition: string;
  priceRange: PriceRange;
  sizes: string[];
  freeShipping: boolean;
  sustainable: boolean;
  handmade: boolean;
  vintage: boolean;
}

interface ProductFilterContextType {
  filters: FilterState;
  filteredProducts: Product[];
  updateSearchQuery: (query: string) => void;
  updateCategory: (category: string) => void;
  updateCondition: (condition: string) => void;
  updatePriceRange: (range: PriceRange) => void;
  toggleSize: (size: string) => void;
  toggleFilter: (
    filter: "freeShipping" | "sustainable" | "handmade" | "vintage"
  ) => void;
  resetFilters: () => void;
}

const initialFilters: FilterState = {
  searchQuery: "",
  category: "All",
  condition: "All",
  priceRange: [0, 1000],
  sizes: [],
  freeShipping: false,
  sustainable: false,
  handmade: false,
  vintage: false,
};

const ProductFilterContext = createContext<
  ProductFilterContextType | undefined
>(undefined);

export function ProductFilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // Filter products based on current filters
  const filteredProducts = allProducts.filter((product) => {
    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(query);
      const matchesDescription = product.description
        .toLowerCase()
        .includes(query);
      const matchesBrand = product.brand.toLowerCase().includes(query);
      const matchesTags = product.tags.some((tag) =>
        tag.toLowerCase().includes(query)
      );

      if (!(matchesName || matchesDescription || matchesBrand || matchesTags)) {
        return false;
      }
    }

    // Category filter
    if (
      filters.category !== "All" &&
      product.category?.main !== filters.category
    ) {
      return false;
    }

    // Condition filter
    if (
      filters.condition !== "All" &&
      product.condition !== filters.condition
    ) {
      return false;
    }

    // Price range filter
    if (
      product.price < filters.priceRange[0] * 1000 ||
      product.price > filters.priceRange[1] * 1000
    ) {
      return false;
    }

    // Size filter
    if (
      filters.sizes.length > 0 &&
      !filters.sizes.some((size) =>
        product.availableSizes.includes(size as any)
      )
    ) {
      return false;
    }

    // Additional filters could be implemented here
    // For now, we'll just return true for these as they're placeholders

    return true;
  });

  const updateSearchQuery = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  const updateCategory = useCallback((category: string) => {
    setFilters((prev) => ({ ...prev, category }));
  }, []);

  const updateCondition = useCallback((condition: string) => {
    setFilters((prev) => ({ ...prev, condition }));
  }, []);

  const updatePriceRange = useCallback((range: PriceRange) => {
    setFilters((prev) => ({ ...prev, priceRange: range }));
  }, []);

  const toggleSize = useCallback((size: string) => {
    setFilters((prev) => {
      if (prev.sizes.includes(size)) {
        return { ...prev, sizes: prev.sizes.filter((s) => s !== size) };
      } else {
        return { ...prev, sizes: [...prev.sizes, size] };
      }
    });
  }, []);

  const toggleFilter = useCallback(
    (filter: "freeShipping" | "sustainable" | "handmade" | "vintage") => {
      setFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  return (
    <ProductFilterContext.Provider
      value={{
        filters,
        filteredProducts,
        updateSearchQuery,
        updateCategory,
        updateCondition,
        updatePriceRange,
        toggleSize,
        toggleFilter,
        resetFilters,
      }}
    >
      {children}
    </ProductFilterContext.Provider>
  );
}

export function useProductFilter() {
  const context = useContext(ProductFilterContext);
  if (context === undefined) {
    throw new Error(
      "useProductFilter must be used within a ProductFilterProvider"
    );
  }
  return context;
}
