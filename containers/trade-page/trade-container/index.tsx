"use client";
import TradeHero from "../trade-hero";
import AllTrades from "../all-trades";

export default function TradeContainer() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <TradeHero />

      {/* All Trades Section */}
      <AllTrades />
    </div>
  );
}
