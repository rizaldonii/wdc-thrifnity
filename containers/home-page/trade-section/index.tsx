"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Recycle,
  SearchCheck,
  Scale,
  HandshakeIcon,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { trades } from "@/data/trades";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tradeFeatures = [
  {
    title: "Find Your Match",
    description:
      "Browse items and find the perfect exchange match for your clothes",
    icon: <SearchCheck className="w-6 h-6" />,
    color: "from-primary to-primary/70",
  },
  {
    title: "Fair Exchange",
    description:
      "Trade items of similar value and condition with other fashion lovers",
    icon: <Scale className="w-6 h-6" />,
    color: "from-secondary to-primary",
  },
  {
    title: "Direct Swap",
    description:
      "Meet up safely or use our secure shipping service for exchanges",
    icon: <HandshakeIcon className="w-6 h-6" />,
    color: "from-primary/70 to-secondary",
  },
];

// Helper function to get recent completed trades
const getRecentTrades = (limit = 3) => {
  return trades
    .filter((trade) => trade.completedAt)
    .sort(
      (a, b) =>
        new Date(b.completedAt ?? 0).getTime() -
        new Date(a.completedAt ?? 0).getTime()
    )
    .slice(0, limit);
};

// Helper function to get newest trades
const getNewestTrades = (limit = 3) => {
  return trades
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, limit);
};

// Helper function to get active trades
const getActiveTrades = (limit = 3) => {
  return trades
    .filter((trade) => trade.status === "pending")
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, limit);
};

// Statistics for display
const activeTrades = trades.filter(
  (trade) => trade.status === "pending"
).length;
const successfulTrades = trades.filter(
  (trade) => trade.status === "completed"
).length;

export default function Trade() {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <Badge
            variant="outline"
            className="bg-primary/10 text-primary border-primary/20 backdrop-blur-sm px-4 py-1.5 mb-6"
          >
            <span className="relative flex h-2 w-2 mr-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="tracking-wider font-medium">SWAP & STYLE</span>
            <Recycle className="w-4 h-4 ml-2 text-primary animate-pulse" />
          </Badge>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Exchange Your Fashion,{" "}
            <span className="relative inline-block">
              <span className="absolute -inset-1 bg-primary/10 rounded-lg blur"></span>
              <span className="relative bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Find New Style
              </span>
            </span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our fashion exchange community. Swap your pre-loved clothing
            with other fashion enthusiasts and refresh your wardrobe
            sustainably.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {tradeFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-10 rounded-full blur-xl`}
                    />
                    <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10">
                      {React.cloneElement(feature.icon, {
                        className: "text-primary",
                      })}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Updated Trades Section with Tabs */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Community Trades</h3>
            <p className="text-muted-foreground mb-6">
              See what's happening in our fashion exchange community right now
            </p>

            <Tabs defaultValue="newest" className="mx-auto max-w-4xl">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="newest" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Newest Trades</span>
                </TabsTrigger>
                <TabsTrigger value="active">Active Trades</TabsTrigger>
                <TabsTrigger value="successful">Successful Trades</TabsTrigger>
              </TabsList>

              {/* Newest Trades Tab */}
              <TabsContent value="newest" className="space-y-6">
                <div className="grid md:grid-cols-3 gap-8">
                  {getNewestTrades(3).map((trade, index) => (
                    <motion.div
                      key={trade.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="group overflow-hidden">
                        <CardContent className="p-6">
                          {/* Time Badge */}
                          <div className="flex justify-between items-center mb-4">
                            <Badge
                              variant="outline"
                              className="text-xs flex items-center gap-1 bg-primary/5"
                            >
                              <Clock className="w-3 h-3" />
                              {new Date(trade.createdAt).toLocaleDateString(
                                "id-ID",
                                {
                                  day: "numeric",
                                  month: "short",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </Badge>
                            <Badge
                              variant={
                                trade.status === "pending"
                                  ? "outline"
                                  : "secondary"
                              }
                              className="text-xs capitalize"
                            >
                              {trade.status}
                            </Badge>
                          </div>

                          {/* Trade Participants */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <div className="relative">
                                <Image
                                  src={
                                    trade.initiator.user.avatar ||
                                    "/images/avatars/placeholder.png"
                                  }
                                  alt={trade.initiator.user.name}
                                  width={32}
                                  height={32}
                                  className="rounded-full"
                                />
                                <div className="absolute -right-1 -bottom-1 w-3 h-3 bg-primary rounded-full border-2 border-background" />
                              </div>
                              <div className="text-sm">
                                <div className="font-medium">
                                  {trade.initiator.user.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Offered
                                </div>
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                            <div className="flex items-center gap-2">
                              <div className="text-sm text-right">
                                <div className="font-medium">
                                  {trade.recipient.user.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Received
                                </div>
                              </div>
                              <div className="relative">
                                <Image
                                  src={
                                    trade.recipient.user.avatar ||
                                    "/images/avatars/placeholder.png"
                                  }
                                  alt={trade.recipient.user.name}
                                  width={32}
                                  height={32}
                                  className="rounded-full"
                                />
                                <div className="absolute -right-1 -bottom-1 w-3 h-3 bg-primary rounded-full border-2 border-background" />
                              </div>
                            </div>
                          </div>

                          {/* Traded Items */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="aspect-square relative rounded-lg overflow-hidden">
                                <Image
                                  src={
                                    trade.initiator.offeredProduct?.images?.[0]
                                      ?.url ||
                                    "/images/products/placeholder.webp"
                                  }
                                  alt={trade.initiator.offeredProduct.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="text-sm truncate">
                                {trade.initiator.offeredProduct.name}
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                {trade.initiator.offeredProduct.condition}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="aspect-square relative rounded-lg overflow-hidden">
                                <Image
                                  src={
                                    trade.recipient.requestedProduct
                                      ?.images?.[0]?.url ||
                                    "/images/products/placeholder.webp"
                                  }
                                  alt={trade.recipient.requestedProduct.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="text-sm truncate">
                                {trade.recipient.requestedProduct.name}
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                {trade.recipient.requestedProduct.condition}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Active Trades Tab */}
              <TabsContent value="active" className="space-y-6">
                <div className="grid md:grid-cols-3 gap-8">
                  {getActiveTrades(3).map((trade, index) => (
                    <motion.div
                      key={trade.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="group overflow-hidden">
                        <CardContent className="p-6">
                          {/* Time Badge */}
                          <div className="flex justify-between items-center mb-4">
                            <Badge
                              variant="outline"
                              className="text-xs flex items-center gap-1 bg-primary/5"
                            >
                              <Clock className="w-3 h-3" />
                              Updated{" "}
                              {new Date(trade.updatedAt).toLocaleDateString(
                                "id-ID",
                                {
                                  day: "numeric",
                                  month: "short",
                                }
                              )}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="text-xs capitalize"
                            >
                              Active
                            </Badge>
                          </div>

                          {/* Trade Participants */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <div className="relative">
                                <Image
                                  src={
                                    trade.initiator.user.avatar ||
                                    "/images/avatars/placeholder.png"
                                  }
                                  alt={trade.initiator.user.name}
                                  width={32}
                                  height={32}
                                  className="rounded-full"
                                />
                                <div className="absolute -right-1 -bottom-1 w-3 h-3 bg-primary rounded-full border-2 border-background" />
                              </div>
                              <div className="text-sm">
                                <div className="font-medium">
                                  {trade.initiator.user.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Offered
                                </div>
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                            <div className="flex items-center gap-2">
                              <div className="text-sm text-right">
                                <div className="font-medium">
                                  {trade.recipient.user.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Received
                                </div>
                              </div>
                              <div className="relative">
                                <Image
                                  src={
                                    trade.recipient.user.avatar ||
                                    "/images/avatars/placeholder.png"
                                  }
                                  alt={trade.recipient.user.name}
                                  width={32}
                                  height={32}
                                  className="rounded-full"
                                />
                                <div className="absolute -right-1 -bottom-1 w-3 h-3 bg-primary rounded-full border-2 border-background" />
                              </div>
                            </div>
                          </div>

                          {/* Traded Items */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="aspect-square relative rounded-lg overflow-hidden">
                                <Image
                                  src={
                                    trade.initiator.offeredProduct?.images?.[0]
                                      ?.url ||
                                    "/images/products/placeholder.webp"
                                  }
                                  alt={trade.initiator.offeredProduct.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="text-sm truncate">
                                {trade.initiator.offeredProduct.name}
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                {trade.initiator.offeredProduct.condition}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="aspect-square relative rounded-lg overflow-hidden">
                                <Image
                                  src={
                                    trade.recipient.requestedProduct
                                      ?.images?.[0]?.url ||
                                    "/images/products/placeholder.webp"
                                  }
                                  alt={trade.recipient.requestedProduct.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="text-sm truncate">
                                {trade.recipient.requestedProduct.name}
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                {trade.recipient.requestedProduct.condition}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Successful Trades Tab */}
              <TabsContent value="successful" className="space-y-6">
                <div className="grid md:grid-cols-3 gap-8">
                  {getRecentTrades(3).map((trade, index) => (
                    <motion.div
                      key={trade.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="group overflow-hidden">
                        <CardContent className="p-6">
                          {/* Completed Badge */}
                          <div className="flex justify-between items-center mb-4">
                            <Badge
                              variant="outline"
                              className="text-xs flex items-center gap-1 bg-green-100"
                            >
                              <Clock className="w-3 h-3" />
                              Completed{" "}
                              {trade.completedAt &&
                                new Date(trade.completedAt).toLocaleDateString(
                                  "id-ID",
                                  {
                                    day: "numeric",
                                    month: "short",
                                  }
                                )}
                            </Badge>
                            <Badge
                              variant="secondary"
                              className="text-xs capitalize bg-green-200 text-green-800"
                            >
                              Successful
                            </Badge>
                          </div>

                          {/* Trade Participants */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <div className="relative">
                                <Image
                                  src={
                                    trade.initiator.user.avatar ||
                                    "/images/avatars/placeholder.png"
                                  }
                                  alt={trade.initiator.user.name}
                                  width={32}
                                  height={32}
                                  className="rounded-full"
                                />
                                <div className="absolute -right-1 -bottom-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                              </div>
                              <div className="text-sm">
                                <div className="font-medium">
                                  {trade.initiator.user.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Offered
                                </div>
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                            <div className="flex items-center gap-2">
                              <div className="text-sm text-right">
                                <div className="font-medium">
                                  {trade.recipient.user.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Received
                                </div>
                              </div>
                              <div className="relative">
                                <Image
                                  src={
                                    trade.recipient.user.avatar ||
                                    "/images/avatars/placeholder.png"
                                  }
                                  alt={trade.recipient.user.name}
                                  width={32}
                                  height={32}
                                  className="rounded-full"
                                />
                                <div className="absolute -right-1 -bottom-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                              </div>
                            </div>
                          </div>

                          {/* Traded Items */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="aspect-square relative rounded-lg overflow-hidden">
                                <Image
                                  src={
                                    trade.initiator.offeredProduct?.images?.[0]
                                      ?.url ||
                                    "/images/products/placeholder.webp"
                                  }
                                  alt={trade.initiator.offeredProduct.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="text-sm truncate">
                                {trade.initiator.offeredProduct.name}
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                {trade.initiator.offeredProduct.condition}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="aspect-square relative rounded-lg overflow-hidden">
                                <Image
                                  src={
                                    trade.recipient.requestedProduct
                                      ?.images?.[0]?.url ||
                                    "/images/products/placeholder.webp"
                                  }
                                  alt={trade.recipient.requestedProduct.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="text-sm truncate">
                                {trade.recipient.requestedProduct.name}
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                {trade.recipient.requestedProduct.condition}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-8 p-4 rounded-full bg-background border border-border/50">
            <div className="px-4">
              <div className="text-2xl font-bold text-primary mb-1">
                {activeTrades}+
              </div>
              <div className="text-sm text-muted-foreground">
                Active Traders
              </div>
            </div>
            <div className="h-12 w-px bg-border/50" />
            <div className="px-4">
              <div className="text-2xl font-bold text-primary mb-1">
                {successfulTrades}+
              </div>
              <div className="text-sm text-muted-foreground">
                Successful Swaps
              </div>
            </div>
            <Button asChild size="lg" className="rounded-full group">
              <Link href="/trade" className="gap-2">
                Start Swapping
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
