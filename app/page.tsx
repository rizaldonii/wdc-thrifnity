import Slider from "@/containers/home-page/slider-section";
import Quote from "@/containers/home-page/quote-section";
import Categories from "@/containers/home-page/categories-section";
import NewArrivals from "@/containers/home-page/new-arrivals-section";
import CTA from "@/containers/home-page/cta-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        {/* Slider Section */}
        <Slider autoPlayInterval={5000} />
        {/* Quote Section */}
        <Quote />
        {/* Categories Section */}
        <Categories />
        {/* New Arrivals Section */}
        <NewArrivals />
        {/* CTA Section */}
        <CTA />
      </main>
    </div>
  );
}
