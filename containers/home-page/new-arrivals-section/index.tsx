"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard/index";
import { products } from "@/data/products";
import type { Product } from "@/types/product";

const NewArrivals = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const filteredProducts = products
        .filter((product) => product.isNew)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 6);

      setNewProducts(filteredProducts);
    } catch (error) {
      console.error("Error filtering new products:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <section className="relative py-16 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-4">
        {/* Header Content */}
        <div className="relative text-center space-y-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative inline-block"
          >
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/20"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 animate-pulse" />
              <span className="tracking-wider">NEW COLLECTION</span>
              <Sparkles className="w-4 h-4 ml-2" />
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative text-4xl md:text-5xl font-bold text-foreground"
          >
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              New Arrivals
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Discover our latest sustainable fashion pieces,
            <br className="hidden md:block" />
            carefully curated for conscious style
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          ></motion.div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 animate-pulse">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-gray-200 rounded-lg h-[300px]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {newProducts.length > 0 ? (
              newProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground py-8">
                No new arrivals at the moment. Check back soon!
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewArrivals;
