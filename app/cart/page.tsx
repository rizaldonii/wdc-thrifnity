"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CartItem, useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronRight,
  Clock,
  CreditCard,
  Gift,
  Heart,
  Minus,
  Package,
  Plus,
  ShoppingBag,
  Truck,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const cart = useCart();
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Handle hydration
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  // Calculate the remaining amount for free shipping
  const freeShippingThreshold = 100;
  const remainingForFreeShipping = Math.max(
    0,
    freeShippingThreshold - cart.summary.subtotal
  );
  const shippingProgressPercentage = Math.min(
    100,
    (cart.summary.subtotal / freeShippingThreshold) * 100
  );

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -10, transition: { duration: 0.2 } },
  };

  return (
    <main className="min-h-screen py-12 bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Breadcrumb  styling */}
          <div className="flex justify-between items-center mb-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
            >
              <span className="bg-neutral-100 dark:bg-neutral-800 p-2 rounded-full group-hover:bg-primary/10 transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </span>
              <span>Continue Shopping</span>
            </Link>
            <Link
              href="/wishlist"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <Heart className="w-4 h-4" />
              <span>Wishlist</span>
            </Link>
          </div>

          {/* Cart Header  */}
          <div className="flex items-center gap-3 mb-10">
            <div className="bg-primary/10 p-3 rounded-full">
              <ShoppingBag className="w-8 h-8 text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-4xl font-light tracking-tight">
                Your Shopping Bag
              </h1>
              <p className="text-muted-foreground mt-1">
                Review and modify your items before checkout
              </p>
            </div>
            {cart.items.length > 0 && (
              <Badge
                variant="outline"
                className="ml-auto rounded-full px-3 py-1 font-medium bg-primary/10 text-primary border-primary/20"
              >
                {cart.items.length} {cart.items.length === 1 ? "item" : "items"}
              </Badge>
            )}
          </div>

          {cart.items.length === 0 ? (
            <Card className="border-none shadow-xl rounded-2xl overflow-hidden bg-white dark:bg-neutral-800">
              <CardContent className="flex flex-col items-center py-24 px-6">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className={cn(
                    "p-8 rounded-full mb-8",
                    isDark ? "bg-neutral-700" : "bg-neutral-100"
                  )}
                >
                  <ShoppingBag
                    className="w-16 h-16 text-primary"
                    strokeWidth={1.5}
                  />
                </motion.div>
                <h2 className="text-3xl font-light mb-4">Your bag is empty</h2>
                <p className="text-muted-foreground text-center max-w-md mb-10">
                  Looks like you haven't added anything to your bag yet.
                  Discover our latest collection and find something you'll love.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="px-10 py-6 rounded-full text-lg"
                >
                  <Link href="/products">Explore Collection</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items List  */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-none shadow-xl rounded-2xl overflow-hidden bg-white dark:bg-neutral-800">
                  <CardContent className="p-0">
                    <div className="p-6 border-b dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800">
                      <h2 className="font-medium text-xl">Items in Your Bag</h2>
                    </div>
                    <AnimatePresence>
                      <div className="divide-y dark:divide-neutral-700">
                        {cart.items.map((item: CartItem) => (
                          <motion.div
                            key={item.id}
                            layout
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="p-6 hover:bg-neutral-50 dark:hover:bg-neutral-750 transition-colors"
                          >
                            <div className="flex gap-6">
                              {/* Product Image  styling */}
                              <div className="relative w-32 h-40 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-700 group">
                                <Image
                                  src={
                                    item.product.images?.[0]?.url ||
                                    "/placeholder.jpg"
                                  }
                                  alt={item.product.name}
                                  fill
                                  className="object-cover transition-transform group-hover:scale-105"
                                />
                              </div>

                              {/* Product Details  layout */}
                              <div className="flex-1 flex flex-col">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="font-medium text-lg">
                                      {item.product.name}
                                    </h3>
                                    <div className="mt-2 space-y-1">
                                      {item.selectedSize && (
                                        <div className="flex items-center gap-2">
                                          <span className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-700 rounded text-xs font-medium">
                                            Size: {item.selectedSize}
                                          </span>
                                        </div>
                                      )}
                                      <p className="text-sm text-muted-foreground mt-1">
                                        Item Price:{" "}
                                        <span className="font-medium">
                                          Rp{item.product.price.toFixed(2)}
                                        </span>
                                      </p>
                                      <div className="flex items-center text-xs text-muted-foreground mt-2">
                                        <Clock className="w-3 h-3 mr-1" />
                                        Expected delivery: 3-5 business days
                                      </div>
                                    </div>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full h-8 w-8 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
                                    onClick={() => cart.removeItem(item.id)}
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex justify-between items-end mt-auto pt-4">
                                  <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium">
                                      Quantity:
                                    </span>
                                    <div className="flex items-center border rounded-full overflow-hidden shadow-sm">
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 rounded-none text-muted-foreground"
                                        onClick={() =>
                                          cart.updateQuantity(
                                            item.id,
                                            Math.max(1, item.quantity - 1)
                                          )
                                        }
                                      >
                                        <Minus className="w-3 h-3" />
                                      </Button>
                                      <span className="w-10 text-center text-sm font-medium">
                                        {item.quantity}
                                      </span>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 rounded-none text-muted-foreground"
                                        onClick={() =>
                                          cart.updateQuantity(
                                            item.id,
                                            item.quantity + 1
                                          )
                                        }
                                      >
                                        <Plus className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-xs text-muted-foreground mb-1">
                                      Total
                                    </p>
                                    <p className="font-medium text-lg">
                                      Rp
                                      {(
                                        item.product.price * item.quantity
                                      ).toFixed(2)}
                                    </p>
                                  </div>
                                </div>

                                {/* New Actions Row */}
                                <div className="mt-4 pt-4 border-t dark:border-neutral-700 flex gap-4">
                                  <button className="text-xs text-primary flex items-center gap-1 hover:underline">
                                    <Heart className="w-3 h-3" />
                                    Save for later
                                  </button>
                                  <button className="text-xs text-primary flex items-center gap-1 hover:underline">
                                    <Gift className="w-3 h-3" />
                                    Add gift wrapping
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </AnimatePresence>
                  </CardContent>
                </Card>

                {/* Recommended Items Section */}
                <Card className="border-none shadow-xl rounded-2xl overflow-hidden bg-white dark:bg-neutral-800">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-4">
                      You May Also Like
                    </h3>
                    <div className="grid grid-cols-4 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="group cursor-pointer">
                          <div className="aspect-square rounded-xl bg-neutral-100 dark:bg-neutral-700 overflow-hidden relative mb-2">
                            <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-600 animate-pulse"></div>
                          </div>
                          <h4 className="text-sm font-medium truncate">
                            Recommended Product {i}
                          </h4>
                          <p className="text-sm text-primary">Rp49.999</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Cart Summary  design */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="border-none shadow-xl rounded-2xl overflow-hidden sticky top-6 bg-white dark:bg-neutral-800">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-6">Order Summary</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">
                          Rp{cart.summary.subtotal.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Shipping</span>
                        {remainingForFreeShipping > 0 ? (
                          <span className="font-medium">
                            Rp{cart.summary.shipping.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-green-500 font-medium">
                            Free
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax</span>
                        <span className="font-medium">
                          Rp{cart.summary.tax.toFixed(2)}
                        </span>
                      </div>
                      <Separator className="my-4" />
                      <div className="flex justify-between font-medium text-xl">
                        <span>Total</span>
                        <span>Rp{cart.summary.total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Free shipping progress */}
                    {remainingForFreeShipping > 0 && (
                      <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-900/30">
                        <div className="flex items-center gap-2 mb-3">
                          <Truck className="w-4 h-4 text-green-600 dark:text-green-400" />
                          <p className="text-sm font-medium text-green-800 dark:text-green-400">
                            Almost there for free shipping!
                          </p>
                        </div>
                        <p className="text-sm mb-3 text-green-700 dark:text-green-300">
                          Add{" "}
                          <span className="font-bold">
                            Rp{remainingForFreeShipping.toFixed(2)}
                          </span>{" "}
                          more to qualify
                        </p>
                        <div className="w-full h-2 bg-green-200 dark:bg-green-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 dark:bg-green-400 transition-all duration-500"
                            style={{ width: `${shippingProgressPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <Button
                      className="w-full py-6 rounded-xl text-base font-medium mt-6 mb-8"
                      size="lg"
                      onClick={() => router.push("/payment")}
                    >
                      Checkout Now
                    </Button>

                    <Card className="border-none overflow-hidden bg-white dark:bg-neutral-800">
                      <CardContent className="p-6">
                        <div className="space-y-5">
                          <div className="flex gap-4 items-start">
                            <div className="bg-primary/10 p-2 rounded-full">
                              <Truck className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium">Free Shipping</h4>
                              <p className="text-sm text-muted-foreground">
                                On all orders over Rp100.000
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-4 items-start">
                            <div className="bg-primary/10 p-2 rounded-full">
                              <Package className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium">Easy Returns</h4>
                              <p className="text-sm text-muted-foreground">
                                30 days return policy
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-4 items-start">
                            <div className="bg-primary/10 p-2 rounded-full">
                              <CreditCard className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium">Secure Payment</h4>
                              <p className="text-sm text-muted-foreground">
                                Your payment is safe us
                              </p>
                            </div>
                          </div>
                        </div>

                        <Link
                          href="/customer-support"
                          className="flex justify-between items-center mt-6 p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-xl text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                        >
                          <span>Need help your order?</span>
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </CardContent>
                    </Card>

                    <div className="mt-6 text-center">
                      <div className="flex justify-center gap-2 mb-2">
                        <div className="w-10 h-6 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                        <div className="w-10 h-6 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                        <div className="w-10 h-6 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        We accept credit cards, PayPal, and Apple Pay
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping and Returns Info  UI */}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
