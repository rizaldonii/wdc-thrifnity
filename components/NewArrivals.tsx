"use client";

import React from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  isNew: boolean;
  category: string;
}

interface NewArrivalsProps {
  products: Product[];
}

const NewArrivals: React.FC<NewArrivalsProps> = ({ products }) => {
  return (
    <section className="py-12">
      <div className="mb-12 relative">
        {/* Decorative elements */}
        <div className="absolute -top-4 left-0 w-20 h-20 bg-gradient-to-r from-[var(--color-primary)]/20 to-transparent rounded-full blur-2xl" />
        <div className="absolute top-1/2 right-0 w-24 h-24 bg-gradient-to-l from-[var(--color-secondary)]/30 to-transparent rounded-full blur-3xl" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-primary)]/10 dark:bg-[var(--color-primary)]/20 text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] dark:bg-[var(--color-primary-light)] mr-2 animate-pulse" />
                Just Arrived
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] dark:from-[var(--color-primary)] dark:to-[var(--color-secondary)] bg-clip-text text-transparent">
              New Arrivals
            </h2>
            <p className="mt-2 text-[var(--text-secondary)] dark:text-[var(--text-secondary)]">
              Our latest sustainable fashion finds just for you
            </p>
          </div>

          <Link
            href="/products"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-primary)] dark:bg-[var(--color-primary-light)] text-[var(--text-on-primary)] hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
          >
            View All
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 transform transition-transform group-hover:translate-x-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
