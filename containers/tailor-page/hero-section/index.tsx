"use client";

import { motion } from "framer-motion";
import { Search, Scissors, Ruler, MapPin, Shirt } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, FormEvent } from "react";

interface HeroProps {
  onSearch: (query: string) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  // Popular search categories with icons
  const popularCategories = [
    { name: "Wedding Specialist", icon: <Scissors className="w-4 h-4 mr-1" /> },
    { name: "Traditional Wear", icon: <Shirt className="w-4 h-4 mr-1" /> },
    { name: "Custom Suits", icon: <Ruler className="w-4 h-4 mr-1" /> },
    { name: "Near Me", icon: <MapPin className="w-4 h-4 mr-1" /> },
  ];

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  const handleCategoryClick = (category: string) => {
    setSearchInput(category);
    onSearch(category);
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-background to-background/95">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-70" />
        <div className="absolute top-24 right-24 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />

        {/* Decorative elements */}
        <motion.div
          className="absolute top-20 left-1/4 text-primary/20"
          animate={{
            rotate: [0, 10, 0, -10, 0],
            scale: [1, 1.05, 1, 0.95, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "easeInOut",
          }}
        >
          <Scissors className="w-24 h-24" />
        </motion.div>

        <motion.div
          className="absolute bottom-40 right-1/4 text-secondary/20"
          animate={{
            rotate: [0, -15, 0, 15, 0],
            scale: [1, 0.95, 1, 1.05, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "easeInOut",
          }}
        >
          <Shirt className="w-16 h-16" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
              Trusted by 10,000+ customers
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent mb-6 leading-tight">
              Find Your Perfect Tailor
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Connect with skilled tailors who can bring your fashion vision to
              life — from precise alterations to bespoke creations that fit you
              perfectly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-xl mx-auto"
          >
            <form onSubmit={handleSearch}>
              <motion.div
                className={`relative transition-all duration-300 ${
                  searchFocused ? "scale-105 shadow-lg" : "shadow-md"
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <Input
                  type="text"
                  placeholder="Search for tailors by name, location, or specialty..."
                  className="w-full h-14 pl-14 pr-4 rounded-full border-2 border-primary/20 focus:border-primary/50 focus:ring-primary/20 focus:ring-2"
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/60" />
                <Button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full h-10 px-6"
                  size="sm"
                >
                  Search
                </Button>
              </motion.div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 text-sm"
          >
            <span className="py-2 text-muted-foreground/70 font-medium">
              Popular:
            </span>
            {popularCategories.map((category, index) => (
              <motion.button
                key={category.name}
                className="px-4 py-2 rounded-full bg-secondary/10 hover:bg-secondary/20 text-secondary-foreground/80 hover:text-secondary-foreground transition-colors flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                onClick={() => handleCategoryClick(category.name)}
                type="button"
              >
                {category.icon}
                {category.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Success stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="pt-8 grid grid-cols-3 gap-4 max-w-2xl mx-auto border-t border-border/40"
          >
            {[
              { value: "2,500+", label: "Active Tailors" },
              { value: "15,000+", label: "Happy Customers" },
              { value: "97%", label: "Satisfaction Rate" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
