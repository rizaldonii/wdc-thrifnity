"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { format } from "date-fns";
import {
  ArrowRight,
  Calendar,
  MapPin,
  Package,
  Truck,
  User,
  ChevronLeft,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Trade } from "@/types/trade";

interface TradeDetailsProps {
  trade: Trade;
}

export default function TradeDetails({ trade }: TradeDetailsProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Format date
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMMM d, yyyy");
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/trade" className="flex items-center">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Trades
          </Link>
        </Button>
      </div>

      {/* Trade ID and Date */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h1 className="text-2xl font-bold">Trade #{trade.id.slice(-6)}</h1>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 mr-1" />
          Created on {formatDate(trade.createdAt)}
        </div>
      </div>

      {/* Trade Products */}
      <div
        className={cn(
          "p-6 rounded-xl",
          isDark
            ? "bg-gradient-to-r from-pink-500/5 to-indigo-500/5 border border-pink-500/10"
            : "bg-gradient-to-r from-pink-50 to-indigo-50 border border-pink-100"
        )}
      >
        {/* Offered Product */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="mb-8">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">Offered Product</CardTitle>
                <Badge variant="outline" className="font-normal">
                  {trade.initiator.offeredProduct.condition}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative aspect-square rounded-md overflow-hidden">
                <Image
                  src={
                    trade.initiator.offeredProduct.images?.[0]?.url ||
                    "/placeholder.svg?height=400&width=400"
                  }
                  alt={trade.initiator.offeredProduct.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  {trade.initiator.offeredProduct.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {trade.initiator.offeredProduct.brand}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {trade.initiator.offeredProduct.category?.main && (
                  <Badge variant="secondary">
                    {trade.initiator.offeredProduct.category.main}
                  </Badge>
                )}
                {trade.initiator.offeredProduct.availableSizes?.map((size) => (
                  <Badge key={size} variant="outline">
                    Size: {size}
                  </Badge>
                ))}
              </div>

              <p className="text-sm">
                {trade.initiator.offeredProduct.description}
              </p>

              <div className="flex items-center gap-2 pt-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={
                      trade.initiator.user?.avatar ||
                      "/placeholder.svg?height=40&width=40"
                    }
                    alt={trade.initiator.user?.name || "Initiator"}
                  />
                  <AvatarFallback>
                    {trade.initiator.user?.name?.[0] || "I"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">
                    {trade.initiator.user.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Offering this item
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Exchange Icon */}
        <div className="flex justify-center my-6">
          <div className="bg-background p-3 rounded-full border shadow-md">
            <ArrowRight className="w-6 h-6 text-primary" />
          </div>
        </div>

        {/* Interested Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Interested In</CardTitle>
            </CardHeader>
            <CardContent>
              {trade.initiator.interestedProducts.length > 0 ? (
                <div className="space-y-6">
                  {trade.initiator.interestedProducts.map((product, index) => (
                    <div
                      key={index}
                      className="flex gap-4 pb-4 border-b last:border-b-0 last:pb-0"
                    >
                      <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={
                            product.images?.[0]?.url ||
                            "/placeholder.svg?height=96&width=96"
                          }
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {product.brand} • {product.condition}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {product.category?.main && (
                            <Badge variant="outline" className="text-xs">
                              {product.category.main}
                            </Badge>
                          )}
                          {product.availableSizes?.[0] && (
                            <Badge variant="outline" className="text-xs">
                              Size: {product.availableSizes[0]}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Open to offers</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Trade Details (if completed) */}
      {trade.completedAt && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Meetup Location */}
          {trade.meetupLocation && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  Meetup Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{trade.meetupLocation.address}</p>
                <p className="text-sm text-muted-foreground">
                  {trade.meetupLocation.city}
                </p>

                <div className="mt-4">
                  <Button size="sm" variant="outline" className="gap-1">
                    <ExternalLink className="w-4 h-4" />
                    View on Map
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Shipping Method */}
          {trade.shippingMethod && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  {trade.shippingMethod.method === "pickup" ? (
                    <User className="w-5 h-5 mr-2 text-primary" />
                  ) : trade.shippingMethod.method === "delivery" ? (
                    <Truck className="w-5 h-5 mr-2 text-primary" />
                  ) : (
                    <Package className="w-5 h-5 mr-2 text-primary" />
                  )}
                  {trade.shippingMethod.method === "pickup"
                    ? "Pickup"
                    : trade.shippingMethod.method === "delivery"
                    ? "Delivery"
                    : "Shipping"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {trade.shippingMethod.courier && (
                    <div>
                      <p className="text-sm text-muted-foreground">Courier</p>
                      <p className="font-medium">
                        {trade.shippingMethod.courier}
                      </p>
                    </div>
                  )}

                  {trade.shippingMethod.trackingNumber && (
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Tracking Number
                      </p>
                      <p className="font-medium">
                        {trade.shippingMethod.trackingNumber}
                      </p>
                    </div>
                  )}

                  {trade.completedAt && (
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Completed On
                      </p>
                      <p className="font-medium">
                        {formatDate(trade.completedAt)}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      )}
    </div>
  );
}
