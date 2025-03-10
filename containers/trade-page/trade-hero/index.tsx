import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, TrendingUp } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function TradeHero() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // Only access theme after component is mounted to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "dark";

  // Move random state change inside useEffect to be client-side only
  const [trendingItems, setTrendingItems] = useState(3);
  useEffect(() => {
    const interval = setInterval(() => {
      setTrendingItems(Math.floor(Math.random() * 5) + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative flex items-center mb-20"
    >
      <div className="container px-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 dark:bg-pink-500/10"
              >
                <Sparkles className="w-4 h-4 text-pink-500" />
                <span className="text-sm font-medium text-pink-600 dark:text-pink-400">
                  Join 245+ Fashion Enthusiasts
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              >
                <span className="bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
                  Trade & Transform
                </span>
                <br />
                <span className="text-foreground">Your Fashion Story</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-muted-foreground max-w-xl leading-relaxed"
              >
                Join our sustainable fashion revolution. Trade pre-loved pieces,
                discover unique styles, and express yourself through conscious
                fashion choices.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              {categories.map((category, i) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * i }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Badge
                    variant="outline"
                    className="px-4 py-2 rounded-full text-sm font-medium border-2 hover:bg-pink-50 dark:hover:bg-pink-500/10 transition-colors"
                  >
                    {category.name}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 text-white rounded-full text-lg px-8"
              >
                Start Trading <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-2 border-pink-200 dark:border-pink-800 text-lg px-8 hover:bg-pink-50 dark:hover:bg-pink-500/10"
              >
                <TrendingUp className="mr-2 w-5 h-5" /> Explore Trends
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-[400px] hidden lg:block"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={cn(
                "p-8 rounded-3xl shadow-lg",
                // Use static classes for initial render to avoid hydration mismatch
                "bg-gradient-to-br",
                isDark
                  ? "from-pink-500/10 via-purple-500/10 to-indigo-500/10 backdrop-blur-xl border border-pink-500/20"
                  : "from-pink-50 via-purple-50 to-indigo-50 border border-pink-100"
              )}
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-foreground">
                      Active Now
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Real-time community stats
                    </p>
                  </div>
                  <div
                    className={cn(
                      "p-3 rounded-full",
                      isDark ? "bg-pink-500/20" : "bg-pink-100"
                    )}
                  >
                    <Sparkles className="w-6 h-6 text-pink-500" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">
                        Community Members
                      </p>
                      <p className="text-2xl font-bold">245+</p>
                    </div>
                    <div className="h-2 rounded-full bg-pink-100 dark:bg-pink-500/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="h-full rounded-full bg-gradient-to-r from-pink-500 to-indigo-500"
                      />
                    </div>
                  </div>

                  {mounted && (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={trendingItems}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex justify-between items-center p-4 rounded-2xl bg-background/50 backdrop-blur-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-pink-100 dark:bg-pink-500/20">
                            <TrendingUp className="w-4 h-4 text-pink-500" />
                          </div>
                          <p className="text-sm font-medium">Trending Items</p>
                        </div>
                        <p className="text-2xl font-bold text-pink-500">
                          {trendingItems}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Decorative Elements */}
      <div className="absolute -z-10 top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-pink-500/20 to-indigo-500/20 rounded-full blur-3xl opacity-50" />
      <div className="absolute -z-10 bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-3xl opacity-50" />
      <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-pink-500/5 to-indigo-500/5 rounded-full blur-3xl" />
    </motion.div>
  );
}
