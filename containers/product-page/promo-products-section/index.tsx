"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, TagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/products";
import { formatCurrency, cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Filter products on sale
const promoProducts = products.filter(
  (product) => product.isOnSale && product.originalPrice
);

export default function PromoProducts() {
  const { theme, resolvedTheme } = useTheme();

  // Gunakan resolvedTheme untuk mendapatkan tema yang benar-benar diterapkan
  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = currentTheme === "dark";

  // If no promo products, don't render the section
  if (promoProducts.length === 0) {
    return null;
  }

  const useCountdown = (targetDate: Date) => {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);

        if (distance < 0) {
          clearInterval(timer);
          setTimeLeft("EXPIRED");
        }
      }, 1000);

      return () => clearInterval(timer);
    }, [targetDate]);

    return timeLeft;
  };

  const endDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days from now
  const timeLeft = useCountdown(endDate);

  // Calculate discount percentage
  const calculateDiscount = (price: number, originalPrice: number) => {
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  return (
    <section
      className={cn(
        "py-12 md:py-16 px-4",
        isDark ? "bg-muted/10" : "bg-muted/30"
      )}
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <div className="flex items-center gap-2 mb-2">
              <TagIcon
                className={cn(
                  "h-6 w-6",
                  isDark ? "text-primary/90" : "text-primary"
                )}
              />
              <h2
                className={cn(
                  "text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight",
                  "bg-clip-text text-transparent",
                  isDark
                    ? "bg-gradient-to-r from-primary via-primary/90 to-primary/80"
                    : "bg-gradient-to-r from-primary to-primary/80"
                )}
              >
                Special Offers
              </h2>
            </div>
            <p
              className={cn(
                "text-base md:text-lg",
                "max-w-md",
                isDark ? "text-muted-foreground/80" : "text-muted-foreground"
              )}
            >
              Limited-time discounts on selected items just for you
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={cn(
              "flex items-center gap-3 px-4 py-2 rounded-full",
              isDark
                ? "bg-background/50 border border-primary/20 backdrop-blur-sm"
                : "bg-background shadow-sm"
            )}
          >
            <Clock
              className={cn(
                "h-5 w-5",
                isDark ? "text-primary/90" : "text-primary"
              )}
            />
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "text-sm font-medium",
                  isDark ? "text-foreground/80" : "text-foreground"
                )}
              >
                Ends in:
              </span>
              <span
                className={cn(
                  "font-mono text-sm md:text-base font-bold tabular-nums",
                  isDark ? "text-primary/90" : "text-primary"
                )}
              >
                {timeLeft}
              </span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {promoProducts.slice(0, 4).map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card
                className={cn(
                  "h-full overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300",
                  isDark
                    ? "bg-card/90 border-muted/20"
                    : "bg-card border-muted/10"
                )}
              >
                <CardContent className="p-0 h-full flex flex-col">
                  <Link href={`/products/${product.slug}`} className="block">
                    <div className="relative aspect-square w-full overflow-hidden group">
                      <Image
                        src={
                          product.images[0]?.url ||
                          "/placeholder.svg?height=300&width=300"
                        }
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {product.originalPrice && (
                        <Badge
                          className={cn(
                            "absolute top-2 right-2",
                            isDark
                              ? "bg-red-500/90 text-white border-red-400/20 backdrop-blur-sm"
                              : "bg-red-500 text-white border-transparent"
                          )}
                        >
                          {calculateDiscount(
                            product.price,
                            product.originalPrice
                          )}
                          % OFF
                        </Badge>
                      )}
                    </div>
                  </Link>
                  <div className="p-4 flex-1 flex flex-col">
                    <Link href={`/products/${product.slug}`} className="group">
                      <h3
                        className={cn(
                          "font-semibold text-lg mb-1 line-clamp-1 transition-colors",
                          isDark
                            ? "group-hover:text-primary/90"
                            : "group-hover:text-primary"
                        )}
                      >
                        {product.name}
                      </h3>
                    </Link>
                    <p
                      className={cn(
                        "text-sm mb-3 line-clamp-2 flex-grow",
                        isDark
                          ? "text-muted-foreground/80"
                          : "text-muted-foreground"
                      )}
                    >
                      {product.description}
                    </p>
                    <div className="flex items-end gap-2 mb-3">
                      <span
                        className={cn(
                          "font-bold text-lg",
                          isDark ? "text-primary/90" : "text-primary"
                        )}
                      >
                        {formatCurrency(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span
                          className={cn(
                            "text-sm line-through",
                            isDark
                              ? "text-muted-foreground/60"
                              : "text-muted-foreground"
                          )}
                        >
                          {formatCurrency(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/products/${product.slug}`}
                      className="mt-auto"
                    >
                      <Button
                        className={cn(
                          "w-full",
                          isDark ? "bg-primary/90 hover:bg-primary/80" : ""
                        )}
                      >
                        Shop Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
