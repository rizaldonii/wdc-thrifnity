import Slider from "@/containers/home-page/slider-section";
import Quote from "@/containers/home-page/quote-section";
import Categories from "@/containers/home-page/categories-section";
import NewArrivals from "@/containers/home-page/new-arrivals-section";
import FeaturedTailors from "@/containers/home-page/featured-tailors-section";
import About from "@/containers/home-page/about-section";
import Trade from "@/containers/home-page/trade-section";

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
        {/* Trade Section */}
        <Trade />
        {/* New Arrivals Section */}
        <NewArrivals />
        {/* Featured Tailors Section */}
        <FeaturedTailors />
        {/* About Section */}
        <About />
      </main>
    </div>
  );
}
