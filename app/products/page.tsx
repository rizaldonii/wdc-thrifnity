"use client";

import { ProductFilterProvider } from "@/context/product-filter-context";
import AllProducts from "@/containers/product-page/all-product-section";
import Hero from "@/containers/product-page/hero-section";

export default function Products() {
  return (
    <ProductFilterProvider>
      <main className="min-h-screen bg-background">
        <Hero />
        <AllProducts />
      </main>
    </ProductFilterProvider>
  );
}
