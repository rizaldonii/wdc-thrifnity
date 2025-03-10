"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  ShieldCheck,
  Truck,
  LockKeyhole,
  CheckCircle2,
  Building,
  Globe,
  ChevronDown,
  ChevronRight,
  Clock,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const cart = useCart();
  const [isHydrated, setIsHydrated] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [step, setStep] = useState(1);
  const [cardType, setCardType] = useState("");
  const router = useRouter();

  // Sample data for card detecton
  const detectCardType = (number: string) => {
    const visaPattern = /^4/;
    const mastercardPattern = /^5[1-5]/;
    const amexPattern = /^3[47]/;

    const value = number.replace(/\s+/g, "");

    if (visaPattern.test(value)) return "visa";
    if (mastercardPattern.test(value)) return "mastercard";
    if (amexPattern.test(value)) return "amex";
    return "";
  };

  const handleCardNumberChange = (e: { target: { value: any } }) => {
    const number = e.target.value;
    setCardType(detectCardType(number));

    // Format card number with spaces
    let formattedValue = number.replace(/\s/g, "").replace(/\D/g, "");

    // Add space every 4 digits
    formattedValue = formattedValue.replace(/(\d{4})(?=\d)/g, "$1 ");

    // Update the input value
    e.target.value = formattedValue;
  };

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

  const shippingMethods = [
    {
      id: "standard",
      name: "Standard Shipping",
      price: remainingForFreeShipping > 0 ? 4.99 : 0,
      time: "3-5 business days",
      isFree: remainingForFreeShipping <= 0,
    },
    {
      id: "express",
      name: "Express Shipping",
      price: 9.99,
      time: "1-2 business days",
    },
    {
      id: "overnight",
      name: "Overnight Shipping",
      price: 19.99,
      time: "Next business day",
    },
  ];

  const getShippingPrice = () => {
    const method = shippingMethods.find((m) => m.id === shippingMethod);
    return method ? method.price : 0;
  };

  const calculateTotal = () => {
    const subtotal = cart.summary.subtotal;
    const shipping = getShippingPrice();
    const tax = subtotal * 0.08; // Assuming 8% tax rate
    return (subtotal + shipping + tax).toFixed(2);
  };

  return (
    <main className="min-h-screen py-12 bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Breadcrumb with enhanced styling */}
          <div className="flex justify-between items-center mb-8">
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
            >
              <span className="bg-neutral-100 dark:bg-neutral-800 p-2 rounded-full group-hover:bg-primary/10 transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </span>
              <span>Back to Cart</span>
            </Link>
          </div>

          {/* Checkout Header */}
          <div className="flex items-center gap-3 mb-10">
            <div className="bg-primary/10 p-3 rounded-full">
              <CreditCard className="w-8 h-8 text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-4xl font-light tracking-tight">Checkout</h1>
              <p className="text-muted-foreground mt-1">
                Complete your purchase securely
              </p>
            </div>
          </div>

          {/* Checkout Steps Indicator */}
          <div className="mb-8">
            <div className="flex justify-between max-w-xl mx-auto">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-full mb-2 border-2",
                    step >= 1
                      ? "bg-primary text-white border-primary"
                      : "border-muted-foreground text-muted-foreground"
                  )}
                >
                  {step > 1 ? <CheckCircle2 className="w-5 h-5" /> : "1"}
                </div>
                <span className="text-xs font-medium">Shipping</span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div
                  className={cn(
                    "h-1 w-full",
                    step >= 2 ? "bg-primary" : "bg-muted-foreground/30"
                  )}
                ></div>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-full mb-2 border-2",
                    step >= 2
                      ? "bg-primary text-white border-primary"
                      : "border-muted-foreground text-muted-foreground"
                  )}
                >
                  {step > 2 ? <CheckCircle2 className="w-5 h-5" /> : "2"}
                </div>
                <span className="text-xs font-medium">Payment</span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div
                  className={cn(
                    "h-1 w-full",
                    step >= 3 ? "bg-primary" : "bg-muted-foreground/30"
                  )}
                ></div>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-full mb-2 border-2",
                    step >= 3
                      ? "bg-primary text-white border-primary"
                      : "border-muted-foreground text-muted-foreground"
                  )}
                >
                  3
                </div>
                <span className="text-xs font-medium">Review</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {step === 1 && (
                <Card className="border-none shadow-xl rounded-2xl overflow-hidden bg-white dark:bg-neutral-800">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-medium mb-6">
                      Shipping Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john.doe@example.com"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="+1 (555) 123-4567"
                          className="mt-1"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="address1">Address Line 1</Label>
                        <Input
                          id="address1"
                          placeholder="123 Main St"
                          className="mt-1"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="address2">
                          Address Line 2 (Optional)
                        </Label>
                        <Input
                          id="address2"
                          placeholder="Apt 4B"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          placeholder="New York"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          placeholder="10001"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State/Province</Label>
                        <div className="relative mt-1">
                          <select
                            id="state"
                            className="w-full h-10 pl-3 pr-10 rounded-md border border-input bg-transparent text-sm"
                          >
                            <option value="">Select State</option>
                            <option value="NY">New York</option>
                            <option value="CA">California</option>
                            <option value="TX">Texas</option>
                          </select>
                          <ChevronDown className="absolute top-1/2 right-3 transform -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <div className="relative mt-1">
                          <select
                            id="country"
                            className="w-full h-10 pl-3 pr-10 rounded-md border border-input bg-transparent text-sm"
                          >
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="UK">United Kingdom</option>
                          </select>
                          <ChevronDown className="absolute top-1/2 right-3 transform -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mb-8">
                      <Checkbox id="saveAddress" />
                      <Label htmlFor="saveAddress" className="text-sm">
                        Save this address for future orders
                      </Label>
                    </div>

                    <h3 className="text-lg font-medium mb-4">
                      Shipping Method
                    </h3>

                    <RadioGroup
                      defaultValue="standard"
                      value={shippingMethod}
                      onValueChange={setShippingMethod}
                      className="space-y-3"
                    >
                      {shippingMethods.map((method) => (
                        <div
                          key={method.id}
                          className={cn(
                            "flex items-center justify-between p-4 rounded-xl border cursor-pointer",
                            shippingMethod === method.id
                              ? "border-primary bg-primary/5"
                              : "border-neutral-200 dark:border-neutral-700"
                          )}
                          onClick={() => setShippingMethod(method.id)}
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value={method.id} id={method.id} />
                            <div>
                              <Label
                                htmlFor={method.id}
                                className="font-medium cursor-pointer"
                              >
                                {method.name}
                              </Label>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {method.time}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            {method.isFree ? (
                              <span className="text-green-500 font-medium">
                                Free
                              </span>
                            ) : (
                              <span>${method.price.toFixed(2)}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </RadioGroup>

                    <div className="mt-8 flex justify-end">
                      <Button
                        onClick={() => setStep(2)}
                        className="px-8 py-6 rounded-xl"
                        size="lg"
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 2 && (
                <Card className="border-none shadow-xl rounded-2xl overflow-hidden bg-white dark:bg-neutral-800">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-medium mb-6">Payment Method</h2>

                    <Tabs
                      defaultValue="card"
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                    >
                      <TabsList className="grid grid-cols-3 mb-6">
                        <TabsTrigger
                          value="card"
                          className="data-[state=active]:bg-primary/10"
                        >
                          <CreditCard className="w-4 h-4 mr-2" />
                          Credit Card
                        </TabsTrigger>
                        <TabsTrigger
                          value="paypal"
                          className="data-[state=active]:bg-primary/10"
                        >
                          <span className="font-medium mr-2">P</span>
                          PayPal
                        </TabsTrigger>
                        <TabsTrigger
                          value="applepay"
                          className="data-[state=active]:bg-primary/10"
                        >
                          <span className="font-medium mr-2">A</span>
                          Apple Pay
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="card" className="space-y-4 mt-2">
                        <div>
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input
                            id="cardName"
                            placeholder="John Doe"
                            className="mt-1"
                          />
                        </div>

                        <div className="relative">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <div className="relative mt-1">
                            <Input
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                              onChange={handleCardNumberChange}
                              className="pr-12"
                            />
                            {cardType && (
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                {cardType === "visa" && (
                                  <span className="font-bold text-blue-500">
                                    VISA
                                  </span>
                                )}
                                {cardType === "mastercard" && (
                                  <span className="font-bold text-red-500">
                                    MC
                                  </span>
                                )}
                                {cardType === "amex" && (
                                  <span className="font-bold text-blue-400">
                                    AMEX
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiration">Expiration Date</Label>
                            <Input
                              id="expiration"
                              placeholder="MM/YY"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvc">CVC/CVV</Label>
                            <div className="relative mt-1">
                              <Input
                                id="cvc"
                                placeholder="123"
                                maxLength={4}
                                className="mt-1"
                              />
                              <LockKeyhole className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 mt-4">
                          <Checkbox id="saveCard" />
                          <Label htmlFor="saveCard" className="text-sm">
                            Save card for future purchases
                          </Label>
                        </div>
                      </TabsContent>

                      <TabsContent value="paypal">
                        <div className="p-8 text-center">
                          <div className="rounded-xl p-8 bg-blue-50 dark:bg-blue-900/20 mb-4 inline-block">
                            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                              Pay
                            </span>
                            <span className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                              Pal
                            </span>
                          </div>
                          <p className="text-muted-foreground mb-4">
                            Click the button below to log in to your PayPal
                            account and complete your purchase.
                          </p>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full py-6">
                            Continue with PayPal
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="applepay">
                        <div className="p-8 text-center">
                          <div className="rounded-xl p-8 bg-neutral-50 dark:bg-neutral-800 mb-4 inline-block">
                            <span className="text-2xl">Apple Pay</span>
                          </div>
                          <p className="text-muted-foreground mb-4">
                            Click the button below to complete your purchase
                            with Apple Pay.
                          </p>
                          <Button className="bg-black hover:bg-neutral-800 text-white rounded-full py-6">
                            Continue with Apple Pay
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-4 mt-6 flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-green-500" />
                      <p className="text-sm text-muted-foreground">
                        Your payment information is encrypted and secure. We
                        never store your full card details.
                      </p>
                    </div>

                    <div className="mt-8 flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="px-6 rounded-xl"
                      >
                        Back to Shipping
                      </Button>
                      <Button
                        onClick={() => setStep(3)}
                        className="px-8 py-6 rounded-xl"
                        size="lg"
                      >
                        Review Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 3 && (
                <Card className="border-none shadow-xl rounded-2xl overflow-hidden bg-white dark:bg-neutral-800">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-medium mb-6">
                      Review Your Order
                    </h2>

                    <div className="space-y-6">
                      <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">Shipping Address</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-primary"
                            onClick={() => setStep(1)}
                          >
                            Edit
                          </Button>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>John Doe</p>
                          <p>123 Main St, Apt 4B</p>
                          <p>New York, NY 10001</p>
                          <p>United States</p>
                          <p>john.doe@example.com</p>
                        </div>
                      </div>

                      <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">Payment Method</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-primary"
                            onClick={() => setStep(2)}
                          >
                            Edit
                          </Button>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {paymentMethod === "card" && (
                            <div className="flex items-center gap-2">
                              <CreditCard className="w-4 h-4" />
                              <span>Credit Card ending in 3456</span>
                            </div>
                          )}
                          {paymentMethod === "paypal" && (
                            <div className="flex items-center gap-2">
                              <span className="font-bold">PayPal</span>
                              <span>john.doe@example.com</span>
                            </div>
                          )}
                          {paymentMethod === "applepay" && (
                            <div className="flex items-center gap-2">
                              <span className="font-bold">Apple Pay</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">Shipping Method</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-primary"
                            onClick={() => setStep(1)}
                          >
                            Edit
                          </Button>
                        </div>
                        <div className="text-sm text-muted-foreground flex justify-between">
                          <div className="flex items-center gap-2">
                            <Truck className="w-4 h-4" />
                            <span>
                              {
                                shippingMethods.find(
                                  (m) => m.id === shippingMethod
                                )?.name
                              }{" "}
                              -
                              {
                                shippingMethods.find(
                                  (m) => m.id === shippingMethod
                                )?.time
                              }
                            </span>
                          </div>
                          <span>
                            {shippingMethods.find(
                              (m) => m.id === shippingMethod
                            )?.isFree
                              ? "Free"
                              : `$${shippingMethods
                                  .find((m) => m.id === shippingMethod)
                                  ?.price.toFixed(2)}`}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-4">Order Items</h3>
                        <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                          {cart.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex gap-4 pb-4 border-b dark:border-neutral-700"
                            >
                              <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                                <Image
                                  src={
                                    item.product.images?.[0]?.url ||
                                    "/placeholder.jpg"
                                  }
                                  alt={item.product.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <h4 className="font-medium">
                                    {item.product.name}
                                  </h4>
                                  <span>
                                    $
                                    {(
                                      item.product.price * item.quantity
                                    ).toFixed(2)}
                                  </span>
                                </div>
                                <div className="text-sm text-muted-foreground mt-1">
                                  {item.selectedSize && (
                                    <span>Size: {item.selectedSize} · </span>
                                  )}
                                  <span>
                                    Qty: {item.quantity} × $
                                    {item.product.price.toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <a href="#" className="text-primary hover:underline">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-primary hover:underline">
                          Privacy Policy
                        </a>
                      </Label>
                    </div>

                    <div className="mt-8 flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => setStep(2)}
                        className="px-6 rounded-xl"
                      >
                        Back to Payment
                      </Button>
                      <Button
                        className="px-8 py-6 rounded-xl"
                        size="lg"
                        onClick={() => {
                          // Here you would typically:
                          // 1. Submit the order to your backend
                          // 2. Process the payment
                          // 3. Then navigate on success
                          router.push("/order-success");
                        }}
                      >
                        Place Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="border-none shadow-xl rounded-2xl overflow-hidden sticky top-6 bg-white dark:bg-neutral-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-medium mb-6">Order Summary</h3>

                  {/* Products Summary */}
                  <div className="max-h-40 overflow-y-auto mb-4 pr-2">
                    {cart.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm py-2"
                      >
                        <span className="text-muted-foreground">
                          {item.quantity} × {item.product.name}
                        </span>
                        <span className="font-medium">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">
                        ${cart.summary.subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      {shippingMethods.find((m) => m.id === shippingMethod)
                        ?.isFree ? (
                        <span className="text-green-500 font-medium">Free</span>
                      ) : (
                        <span className="font-medium">
                          $
                          {shippingMethods
                            .find((m) => m.id === shippingMethod)
                            ?.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (8%)</span>
                      <span className="font-medium">
                        ${(cart.summary.subtotal * 0.08).toFixed(2)}
                      </span>
                    </div>

                    <div className="pt-3 mt-3 border-t dark:border-neutral-700">
                      <div className="flex justify-between font-medium text-lg">
                        <span>Total</span>
                        <span>${calculateTotal()}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 text-right">
                        Including tax & shipping
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="relative">
                      <Input placeholder="Enter promo code" className="pr-24" />
                      <Button className="absolute right-0 top-0 h-full rounded-l-none text-xs px-4">
                        Apply
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Currency</span>
                    </div>
                    <select className="bg-transparent text-sm font-medium border-none focus:outline-none focus:ring-0">
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              {/* Security Info */}
              <Card className="border-none shadow-xl rounded-2xl overflow-hidden bg-white dark:bg-neutral-800">
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-green-50 dark:bg-green-900/20">
                        <ShieldCheck className="w-4 h-4 text-green-500" />
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">Secure Checkout</p>
                        <p className="text-muted-foreground text-xs">
                          Your data is protected with 256-bit encryption
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/20">
                        <Building className="w-4 h-4 text-blue-500" />
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">Trusted by Millions</p>
                        <p className="text-muted-foreground text-xs">
                          Over 10,000 verified customer reviews
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-purple-50 dark:bg-purple-900/20">
                        <Truck className="w-4 h-4 text-purple-500" />
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">Free Returns</p>
                        <p className="text-muted-foreground text-xs">
                          30-day money back guarantee
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <div className="flex items-center justify-center gap-3 my-4">
                <div className="h-6 w-10 bg-neutral-100 dark:bg-neutral-800 rounded"></div>
                <div className="h-6 w-10 bg-neutral-100 dark:bg-neutral-800 rounded"></div>
                <div className="h-6 w-10 bg-neutral-100 dark:bg-neutral-800 rounded"></div>
                <div className="h-6 w-10 bg-neutral-100 dark:bg-neutral-800 rounded"></div>
                <div className="h-6 w-10 bg-neutral-100 dark:bg-neutral-800 rounded"></div>
              </div>
            </div>
          </div>

          {/* Featured Products - Only show on mobile */}
          <div className="mt-16 lg:hidden">
            <h3 className="text-xl font-medium mb-6">You Might Also Like</h3>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map((item) => (
                <Card
                  key={item}
                  className="border-none shadow-md rounded-xl overflow-hidden"
                >
                  <div className="aspect-square relative bg-neutral-100 dark:bg-neutral-800">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      Product Image
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <h4 className="font-medium truncate">
                      Featured Product {item}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Category
                    </p>
                    <p className="font-medium">$49.99</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Customer Support */}
          <div className="mt-16 text-center">
            <h3 className="text-lg font-medium mb-2">
              Need Help With Your Order?
            </h3>
            <p className="text-muted-foreground mb-4">
              Our customer support team is here to help
            </p>
            <Button variant="outline" className="rounded-full">
              <span className="mr-2">Contact Support</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
