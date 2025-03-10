"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          {/* 404 Text */}
          <motion.h1
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className={cn(
              "text-8xl font-bold bg-clip-text text-transparent",
              isDark
                ? "bg-gradient-to-r from-pink-500 to-indigo-500"
                : "bg-gradient-to-r from-pink-600 to-indigo-600"
            )}
          >
            404
          </motion.h1>

          {/* Message */}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Page Not Found</h2>
            <p className="text-muted-foreground">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Decorative Element */}
          <div className="relative py-10">
            <div
              className={cn(
                "w-full h-[1px]",
                isDark
                  ? "bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"
                  : "bg-gradient-to-r from-transparent via-pink-600/50 to-transparent"
              )}
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4">
              <span className="text-muted-foreground">
                Let's get you back on track
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild className="gap-2">
              <Link href="/">
                <Home className="w-4 h-4" />
                Back to Home
              </Link>
            </Button>
            <Button variant="outline" asChild className="gap-2">
              <Link href="/trade">
                <ArrowLeft className="w-4 h-4" />
                View All Trades
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Background Decorative Elements */}
        <div
          className={cn(
            "absolute inset-0 -z-10 overflow-hidden",
            isDark ? "opacity-30" : "opacity-20"
          )}
        >
          <div className="absolute -top-1/2 -right-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-b from-pink-500/30 to-indigo-500/30 blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-t from-indigo-500/30 to-pink-500/30 blur-3xl" />
        </div>
      </div>
    </div>
  );
}
