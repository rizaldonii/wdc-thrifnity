"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle2,
  Package,
  Truck,
  Calendar,
  MapPin,
  Receipt,
  ArrowRight,
  Mail,
  Home,
  PhoneCall,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function OrderSuccessPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // You would typically get this from your backend/API
  const orderDetails = {
    orderNumber: "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    orderDate: new Date().toLocaleDateString(),
    estimatedDelivery: new Date(
      Date.now() + 5 * 24 * 60 * 60 * 1000
    ).toLocaleDateString(),
    shippingAddress: {
      name: "John Doe",
      address: "123 Main St, Apt 4B",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
    },
    paymentMethod: "Credit Card (•••• 4567)",
    items: [
      {
        id: 1,
        name: "Premium Wireless Headphones",
        price: "$149.99",
        quantity: 1,
        image: "/api/placeholder/100/100",
      },
      {
        id: 2,
        name: "Smart Watch Series 5",
        price: "$299.99",
        quantity: 1,
        image: "/api/placeholder/100/100",
      },
    ],
    subtotal: "$449.98",
    shipping: "$0.00",
    tax: "$36.00",
    total: "$485.98",
    trackingNumber: "TRK7893214560",
  };

  const orderSteps = [
    { status: "Processing", completed: true, current: false },
    { status: "Confirmed", completed: true, current: true },
    { status: "Shipped", completed: false, current: false },
    { status: "Delivered", completed: false, current: false },
  ];

  return (
    <main className="min-h-screen py-12 bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Success Message */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className={cn(
                "w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center",
                "bg-green-100 dark:bg-green-900/30"
              )}
            >
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </motion.div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
              Order Confirmed!
            </h1>
            <p className="text-lg text-muted-foreground">
              Thank you for your purchase. We've received your order and are
              getting it ready.
            </p>
            <Badge variant="outline" className="mt-4 px-3 py-1 text-sm">
              Order #{orderDetails.orderNumber}
            </Badge>
          </div>

          {/* Order Progress */}
          <Card className="border-none shadow-lg rounded-xl overflow-hidden bg-white dark:bg-neutral-800/50 backdrop-blur-sm mb-8">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative mt-2 mb-6">
                <Progress value={50} className="h-2" />
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                {orderSteps.map((step, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex flex-col items-center",
                      step.completed || step.current
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center mb-2",
                        step.completed || step.current
                          ? "bg-primary/10 border-2 border-primary"
                          : "bg-muted border-2 border-muted-foreground/30"
                      )}
                    >
                      {step.completed ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <span className="text-xs font-medium">{index + 1}</span>
                      )}
                    </div>
                    <span className="text-xs font-medium">{step.status}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Order Details Card */}
            <Card className="border-none shadow-lg rounded-xl overflow-hidden bg-white dark:bg-neutral-800/50 backdrop-blur-sm md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Order Details</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Items */}
                  <div>
                    <h3 className="font-medium mb-4">
                      Items ({orderDetails.items.length})
                    </h3>
                    <div className="space-y-4">
                      {orderDetails.items.map((item) => (
                        <div key={item.id} className="flex gap-4 items-center">
                          <div className="rounded-lg overflow-hidden w-16 h-16 bg-neutral-100 dark:bg-neutral-700 flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Summary */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-muted-foreground">Subtotal</p>
                      <p>{orderDetails.subtotal}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-muted-foreground">Shipping</p>
                      <p>{orderDetails.shipping}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-muted-foreground">Tax</p>
                      <p>{orderDetails.tax}</p>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                      <p>Total</p>
                      <p className="text-lg">{orderDetails.total}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping & Payment Info */}
            <div className="space-y-6">
              <Card className="border-none shadow-lg rounded-xl overflow-hidden bg-white dark:bg-neutral-800/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    Delivery Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Truck className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Estimated Delivery
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {orderDetails.estimatedDelivery}
                        </p>
                        <Badge variant="outline" className="mt-2 text-xs">
                          Tracking: {orderDetails.trackingNumber}
                        </Badge>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <MapPin className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Shipping Address</p>
                        <div className="text-sm text-muted-foreground">
                          <p>{orderDetails.shippingAddress.name}</p>
                          <p>{orderDetails.shippingAddress.address}</p>
                          <p>
                            {orderDetails.shippingAddress.city},{" "}
                            {orderDetails.shippingAddress.state}{" "}
                            {orderDetails.shippingAddress.zip}
                          </p>
                          <p>{orderDetails.shippingAddress.country}</p>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Receipt className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Payment Method</p>
                        <p className="text-sm text-muted-foreground">
                          {orderDetails.paymentMethod}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg rounded-xl overflow-hidden bg-white dark:bg-neutral-800/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-primary" />
                      <p className="text-sm">support@example.com</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <PhoneCall className="w-4 h-4 text-primary" />
                      <p className="text-sm">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
            >
              <Link href="/products">
                Continue Shopping
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
