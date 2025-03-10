"use client";

import HeroSlider from "@/containers/product-page/hero-slider-section";
import FeaturedProducts from "@/containers/product-page/featured-products-section";
import PromoProducts from "@/containers/product-page/promo-products-section";
import AllProducts from "@/containers/product-page/all-product-section";

export default function Products() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSlider />
      <FeaturedProducts />
      <PromoProducts />
      <AllProducts />
    </main>
  );
}
