"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useProductFilter } from "@/context/product-filter-context";

export default function AllProducts() {
  const { filteredProducts } = useProductFilter();
  const [visibleProducts, setVisibleProducts] = useState(12);
  const [favorites, setFavorites] = useState<string[]>([]);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const toggleFavorite = useCallback((productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const loadMore = useCallback(() => {
    setVisibleProducts((prev) => prev + 12);
  }, []);

  // Optimize animations for performance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Display message when no products match the filters
  if (filteredProducts.length === 0) {
    return (
      <section
        className="py-12 md:py-16 px-4"
        aria-labelledby="products-heading"
      >
        <div className="container mx-auto text-center">
          <h2 id="products-heading" className="text-2xl font-semibold mb-4">
            No products found
          </h2>
          <p className="text-muted-foreground mb-8">
            Try adjusting your search or filter criteria to find what you're
            looking for.
          </p>
          <Image
            src="/placeholder.svg?height=200&width=200"
            alt="No products found"
            width={200}
            height={200}
            className="mx-auto opacity-50"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 px-4" aria-labelledby="products-heading">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 id="products-heading" className="text-2xl font-semibold">
            {filteredProducts.length} Products
          </h2>
          <p className="text-sm text-muted-foreground">
            Showing {Math.min(visibleProducts, filteredProducts.length)} of{" "}
            {filteredProducts.length} products
          </p>
        </div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProducts.slice(0, visibleProducts).map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              layout
              className="h-full"
            >
              <Card className="group overflow-hidden h-full flex flex-col">
                <CardContent className="p-0 flex-1 flex flex-col">
                  {/* Product Image */}
                  <Link
                    href={`/products/${product.id}`}
                    aria-label={`View details for ${product.name}`}
                    className="relative block aspect-square"
                  >
                    <div className="relative aspect-square w-full">
                      <Image
                        src={
                          product.images[0]?.url ||
                          "/images/products/placeholder.webp" ||
                          "/placeholder.svg"
                        }
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        priority={product.id === filteredProducts[0].id}
                      />
                      {product.isNew && (
                        <Badge
                          variant="secondary"
                          className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm"
                        >
                          New Arrival
                        </Badge>
                      )}
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium line-clamp-1 text-base">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {product.category?.main || "Uncategorized"}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0 ml-2"
                        onClick={() => toggleFavorite(product.id)}
                        aria-label={
                          favorites.includes(product.id)
                            ? `Remove ${product.name} from favorites`
                            : `Add ${product.name} to favorites`
                        }
                        aria-pressed={favorites.includes(product.id)}
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            favorites.includes(product.id)
                              ? "fill-primary text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      </Button>
                    </div>
                    <div className="flex justify-between items-center mt-auto">
                      <div className="font-semibold">
                        {formatCurrency(product.price)}
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {product.condition}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button */}
        {visibleProducts < filteredProducts.length && (
          <div className="text-center mt-10 md:mt-12">
            <Button
              variant="outline"
              size={isMobile ? "default" : "lg"}
              onClick={loadMore}
              className="min-w-[200px]"
            >
              Load More Products
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
