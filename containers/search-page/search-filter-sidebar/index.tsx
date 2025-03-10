"use client";

import { useState } from "react";
import { useProductFilter } from "@/contexts/product-filter-context";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SearchFilterSidebar() {
  const {
    filters,
    updateCategory,
    updateCondition,
    updatePriceRange,
    toggleSize,
    toggleFilter,
    resetFilters,
  } = useProductFilter();

  // For price range slider
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(
    filters.priceRange
  );

  // Handle price range change
  const handlePriceRangeChange = (values: number[]) => {
    const range: [number, number] = [values[0], values[1]];
    setLocalPriceRange(range);
  };

  // Apply price range when slider is released
  const handlePriceRangeCommit = () => {
    updatePriceRange(localPriceRange);
  };

  // Available sizes
  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

  // Available categories
  const categories = [
    "All",
    "Tops",
    "Bottoms",
    "Dresses",
    "Outerwear",
    "Accessories",
    "Shoes",
  ];

  // Available conditions
  const conditions = ["All", "New", "Like New", "Very Good", "Good", "Fair"];

  return (
    <div className="bg-card rounded-lg border p-4 sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">Filters</h2>
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          Reset
        </Button>
      </div>

      <Accordion
        type="multiple"
        defaultValue={["category", "price", "condition", "size", "additional"]}
        className="space-y-2"
      >
        {/* Category Filter */}
        <AccordionItem value="category" className="border-b">
          <AccordionTrigger className="py-2">Category</AccordionTrigger>
          <AccordionContent>
            <Select value={filters.category} onValueChange={updateCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range Filter */}
        <AccordionItem value="price" className="border-b">
          <AccordionTrigger className="py-2">Price Range</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div className="pt-4">
              <Slider
                defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
                max={1000}
                step={10}
                value={[localPriceRange[0], localPriceRange[1]]}
                onValueChange={handlePriceRangeChange}
                onValueCommit={handlePriceRangeCommit}
                className="mb-6"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="border rounded-md px-3 py-1 w-[45%]">
                <p className="text-xs text-muted-foreground">Min</p>
                <p className="font-medium">Rp {localPriceRange[0] * 1000}</p>
              </div>
              <div className="border rounded-md px-3 py-1 w-[45%]">
                <p className="text-xs text-muted-foreground">Max</p>
                <p className="font-medium">Rp {localPriceRange[1] * 1000}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Condition Filter */}
        <AccordionItem value="condition" className="border-b">
          <AccordionTrigger className="py-2">Condition</AccordionTrigger>
          <AccordionContent>
            <Select value={filters.condition} onValueChange={updateCondition}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                {conditions.map((condition) => (
                  <SelectItem key={condition} value={condition}>
                    {condition}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>

        {/* Size Filter */}
        <AccordionItem value="size" className="border-b">
          <AccordionTrigger className="py-2">Size</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2 pt-2">
              {availableSizes.map((size) => (
                <Badge
                  key={size}
                  variant={filters.sizes.includes(size) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleSize(size)}
                >
                  {size}
                </Badge>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Additional Filters */}
        <AccordionItem value="additional" className="border-b">
          <AccordionTrigger className="py-2">
            Additional Filters
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="free-shipping"
                  checked={filters.freeShipping}
                  onCheckedChange={() => toggleFilter("freeShipping")}
                />
                <Label htmlFor="free-shipping">Free Shipping</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sustainable"
                  checked={filters.sustainable}
                  onCheckedChange={() => toggleFilter("sustainable")}
                />
                <Label htmlFor="sustainable">Sustainable</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="handmade"
                  checked={filters.handmade}
                  onCheckedChange={() => toggleFilter("handmade")}
                />
                <Label htmlFor="handmade">Handmade</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="vintage"
                  checked={filters.vintage}
                  onCheckedChange={() => toggleFilter("vintage")}
                />
                <Label htmlFor="vintage">Vintage</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
