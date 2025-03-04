"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";

const Quote = () => {
  const controls = useAnimation();
  const [isMounted, setIsMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    setIsMounted(true);
    const startAnimation = async () => {
      await controls.start("visible");
    };
    startAnimation();
  }, [controls]);

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const quoteVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  };

  // Skip SSR animation flash
  if (!isMounted) return null;

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="relative bg-gradient-to-br from-accent to-accent-hover dark:from-secondary-dark dark:to-secondary py-24 px-6 mt-12 overflow-hidden rounded-xl shadow-sm"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -left-8 -top-8 w-48 h-48 rounded-full bg-primary-light dark:bg-primary blur-md" />
        <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-secondary-light dark:bg-secondary blur-md" />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-primary dark:bg-primary-light blur-md" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-secondary-dark dark:text-accent mb-12 tracking-wider"
        >
          SUSTAINABLE FASHION
        </motion.h2>

        <div className="relative">
          <motion.blockquote
            variants={quoteVariants}
            className="text-xl md:text-2xl italic text-secondary dark:text-accent-hover leading-relaxed px-8 md:px-12"
          >
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 text-6xl text-primary dark:text-primary-light opacity-50"
            >
              "
            </span>
            Beauty is within every woman, fashion is simply the art that reveals
            it to the world with elegance and grace.
            <span
              aria-hidden="true"
              className="absolute bottom-0 right-0 text-6xl text-primary dark:text-primary-light opacity-50"
            >
              "
            </span>
          </motion.blockquote>

          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden mb-4 ring-4 ring-accent dark:ring-secondary shadow-lg transition-all">
              <Image
                src="/images/lindsay-black.jpg"
                alt="Lindsay Black"
                width={96}
                height={96}
                className="object-cover"
                priority
              />
            </div>
            <div className="space-y-1">
              <p className="text-secondary-dark dark:text-accent font-semibold tracking-wider">
                LINDSAY BLACK
              </p>
              <p className="text-sm text-secondary dark:text-accent-hover">
                Fashion Sustainability Expert
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Quote;
