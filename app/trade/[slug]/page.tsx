"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { trades } from "@/data/trades";
import { Loader2 } from "lucide-react";
import type { Trade } from "@/types/trade";
import TradeDetails from "@/containers/trade-show/trade-details";
import TradeActions from "@/containers/trade-show/trade-actions";
import NotFound from "@/app/not-found";

export default function TradeShowPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [trade, setTrade] = useState<Trade | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch with a small delay
    const fetchTrade = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        const foundTrade = trades.find((t) => t.slug === slug);
        setTrade(foundTrade || null);
      } catch (error) {
        console.error("Error fetching trade:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrade();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading trade details...</span>
      </div>
    );
  }

  if (!trade) {
    return <NotFound />;
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trade Details (2/3 width on desktop) */}
          <div className="lg:col-span-2 space-y-8">
            <TradeDetails trade={trade} />
          </div>

          {/* Trade Actions (1/3 width on desktop) */}
          <div className="lg:col-span-1">
            <TradeActions trade={trade} onTradeUpdate={setTrade} />
          </div>
        </div>
      </div>
    </main>
  );
}
