"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn, formatCurrency } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTheme } from "next-themes";
import { products } from "@/data/products";
import { ShoppingBag, SlidersHorizontal } from "lucide-react";

export default function AllProducts() {
  const [visibleProducts, setVisibleProducts] = useState(12);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const toggleFavorite = useCallback((productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const loadMore = useCallback(async () => {
    setIsLoading(true);
    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    setVisibleProducts((prev) => prev + 12);
    setIsLoading(false);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
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

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const headerItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  if (products.length === 0) {
    return (
      <section
        className="py-12 md:py-16 px-4"
        aria-labelledby="products-heading"
      >
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 id="products-heading" className="text-2xl font-semibold mb-4">
              No products available
            </h2>
            <p className="text-muted-foreground">
              Check back later for new products.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "py-12 md:py-16 px-4",
        isDark ? "bg-background/50" : "bg-background"
      )}
      aria-labelledby="products-heading"
    >
      <div className="container mx-auto">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-8 mb-8"
        >
          <motion.div variants={headerItemVariants} className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div
                className={cn(
                  "p-2 rounded-lg",
                  isDark
                    ? "bg-primary/10 text-primary/90"
                    : "bg-primary/5 text-primary"
                )}
              >
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h2
                id="products-heading"
                className={cn(
                  "text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight",
                  "bg-clip-text text-transparent",
                  isDark
                    ? "bg-gradient-to-r from-primary via-primary/90 to-primary/80"
                    : "bg-gradient-to-r from-primary to-primary/80"
                )}
              >
                All Products
              </h2>
            </div>
            <p
              className={cn(
                "text-sm md:text-base",
                "text-muted-foreground",
                "max-w-md",
                isDark && "text-muted-foreground/80"
              )}
            >
              Discover unique pre-loved fashion pieces curated just for you
            </p>
          </motion.div>

          <motion.div
            variants={headerItemVariants}
            className={cn(
              "flex items-center gap-4 px-4 py-2 rounded-full",
              isDark
                ? "bg-background/50 border border-border/50 backdrop-blur-sm"
                : "bg-muted/50"
            )}
          >
            <div className="hidden md:flex items-center gap-2">
              <SlidersHorizontal
                className={cn(
                  "w-4 h-4",
                  isDark ? "text-muted-foreground/70" : "text-muted-foreground"
                )}
              />
              <span
                className={cn(
                  "text-sm font-medium",
                  isDark ? "text-muted-foreground/70" : "text-muted-foreground"
                )}
              >
                Showing
              </span>
            </div>
            <p
              className={cn(
                "text-sm md:text-base font-medium tabular-nums",
                isDark ? "text-foreground/90" : "text-foreground"
              )}
            >
              {Math.min(visibleProducts, products.length)}
              <span className="text-muted-foreground/70 mx-1">/</span>
              {products.length}
              <span className="ml-1 text-muted-foreground/70">items</span>
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="wait">
            {products.slice(0, visibleProducts).map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                layout
                className="h-full"
              >
                <Card
                  className={cn(
                    "group overflow-hidden h-full flex flex-col",
                    "transition-shadow duration-300",
                    "hover:shadow-lg hover:shadow-primary/5",
                    isDark ? "bg-card/50 backdrop-blur-sm" : "bg-card"
                  )}
                >
                  <CardContent className="p-0 flex-1 flex flex-col">
                    <Link
                      href={`/products/${product.slug}`}
                      className="relative block aspect-square"
                    >
                      <div className="relative aspect-square w-full overflow-hidden">
                        <Image
                          src={
                            product.images[0]?.url ||
                            "/images/products/placeholder.webp"
                          }
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover transition-all duration-300 group-hover:scale-105"
                          priority={product.id === products[0].id}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {product.isNew && (
                          <Badge
                            variant="secondary"
                            className={cn(
                              "absolute top-2 left-2",
                              "backdrop-blur-sm",
                              isDark
                                ? "bg-background/50 text-primary"
                                : "bg-background/80"
                            )}
                          >
                            New Arrival
                          </Badge>
                        )}
                      </div>
                    </Link>

                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium line-clamp-1 text-base group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {product.category?.main || "Uncategorized"}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={cn(
                            "shrink-0 ml-2",
                            "transition-transform duration-300",
                            "hover:scale-110"
                          )}
                          onClick={() => toggleFavorite(product.id)}
                          aria-label={`${
                            favorites.includes(product.id)
                              ? "Remove from"
                              : "Add to"
                          } favorites`}
                        >
                          <Heart
                            className={cn(
                              "w-5 h-5 transition-colors duration-300",
                              favorites.includes(product.id)
                                ? "fill-primary text-primary"
                                : "text-muted-foreground"
                            )}
                          />
                        </Button>
                      </div>
                      <div className="flex justify-between items-center mt-auto pt-2 border-t border-border/50">
                        <div className="font-semibold text-lg text-primary">
                          {formatCurrency(product.price)}
                        </div>
                        <Badge
                          variant="outline"
                          className={cn(
                            "capitalize",
                            isDark ? "border-primary/20" : "border-primary/30"
                          )}
                        >
                          {product.condition}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {visibleProducts < products.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-10 md:mt-12"
          >
            <Button
              variant="outline"
              size={isMobile ? "default" : "lg"}
              onClick={loadMore}
              className={cn(
                "min-w-[200px]",
                "transition-all duration-300",
                isDark ? "hover:bg-primary/20" : "hover:bg-primary/10",
                "disabled:opacity-50"
              )}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                "Load More Products"
              )}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
