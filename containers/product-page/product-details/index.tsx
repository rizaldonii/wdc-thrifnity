"use client";

import { SelectItem } from "@/components/ui/select";

import { SelectContent } from "@/components/ui/select";

import { SelectValue } from "@/components/ui/select";

import { SelectTrigger } from "@/components/ui/select";

import { Select } from "@/components/ui/select";

import React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  Share2,
  ShoppingCart,
  Star,
  ChevronRight,
  Check,
  Info,
  Truck,
  RefreshCw,
  Shield,
  MapPin,
  Minus,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Product, ProductColor } from "@/types/product";
import { formatCurrency } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(
    product.images.find((img) => img.isPrimary)?.url || product.images[0]?.url
  );
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
    product.colors[0] || null
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(
    (product.availableSizes[0] as string) || null
  );
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [expandedAccordions, setExpandedAccordions] = useState<string[]>([]);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  // Find the selected variant based on color and size
  const selectedVariant = product.variants.find(
    (v) => v.color.name === selectedColor?.name && v.size === selectedSize
  );

  // Calculate discount percentage if there's an original price
  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  // Handle quantity changes
  const increaseQuantity = () => {
    if (selectedVariant && quantity < selectedVariant.stock) {
      setQuantity(quantity + 1);
    } else if (!selectedVariant) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Toggle favorite status
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Handle accordion toggle
  const toggleAccordion = (value: string) => {
    setExpandedAccordions((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-muted-foreground mb-4 lg:hidden">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link href="/products" className="hover:text-foreground">
            Products
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-foreground font-medium truncate">
            {product.name}
          </span>
        </nav>

        {/* Product Images */}
        <div className="lg:w-3/5">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Thumbnails - Vertical on desktop, horizontal on mobile */}
            <div
              className={`flex ${
                isMobile ? "flex-row overflow-x-auto" : "flex-col"
              } gap-3 ${isMobile ? "order-2 mt-4" : "order-1"}`}
            >
              {product.images.map((image) => (
                <button
                  key={image.id}
                  className={`relative ${
                    isMobile ? "w-20 h-20 flex-shrink-0" : "w-24 h-24"
                  } border rounded-md overflow-hidden ${
                    selectedImage === image.url
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedImage(image.url)}
                  aria-label={`View ${image.alt}`}
                >
                  <Image
                    src={image.url || "/placeholder.svg?height=100&width=100"}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                  {image.views && (
                    <div className="absolute bottom-0 inset-x-0 bg-background/80 text-xs py-0.5 text-center">
                      {image.views}
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div
              className={`relative ${
                isMobile ? "order-1" : "order-2"
              } flex-1 aspect-square md:aspect-[4/5] rounded-lg overflow-hidden bg-muted/20`}
            >
              <Image
                src={selectedImage || "/placeholder.svg?height=600&width=600"}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {product.isNew && (
                <Badge className="absolute top-4 left-4 bg-primary">New</Badge>
              )}
              {product.isOnSale && (
                <Badge className="absolute top-4 right-4 bg-red-500">
                  {discountPercentage}% OFF
                </Badge>
              )}
              {product.isAuthenticated && (
                <Badge
                  variant="outline"
                  className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm"
                >
                  <Shield className="h-3.5 w-3.5 mr-1" /> Authenticated
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <motion.div
          className="lg:w-2/5"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          {/* Desktop Breadcrumbs */}
          <nav className="hidden lg:flex items-center text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link href="/products" className="hover:text-foreground">
              Products
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-foreground font-medium truncate">
              {product.name}
            </span>
          </nav>

          {/* Brand and Title */}
          <div className="mb-4">
            <Link
              href={`/products?brand=${product.brand}`}
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              {product.brand}
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold mt-1">
              {product.name}
            </h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating.toFixed(1)} ({product.totalReviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-2xl md:text-3xl font-bold">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
            {product.isOnSale && (
              <Badge className="ml-2 bg-red-500">
                {discountPercentage}% OFF
              </Badge>
            )}
          </div>

          {/* Short Description */}
          <p className="text-muted-foreground mb-6">{product.description}</p>

          {/* Color Selection */}
          {product.colors.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">
                  Color: {selectedColor?.name}
                </span>
                <span className="text-sm text-muted-foreground">
                  {product.colors.length}{" "}
                  {product.colors.length === 1 ? "option" : "options"}
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <TooltipProvider key={color.name}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            selectedColor?.name === color.name
                              ? "ring-2 ring-primary ring-offset-2"
                              : ""
                          }`}
                          style={{ backgroundColor: color.hex }}
                          onClick={() => setSelectedColor(color)}
                          aria-label={`Select ${color.name} color`}
                        >
                          {selectedColor?.name === color.name && (
                            <Check
                              className={`h-5 w-5 ${
                                isLightColor(color.hex)
                                  ? "text-black"
                                  : "text-white"
                              }`}
                            />
                          )}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{color.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.availableSizes.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Size: {selectedSize}</span>
                <button className="text-sm text-primary hover:underline">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.availableSizes.map((size) => {
                  const isAvailable = product.variants.some(
                    (v) =>
                      v.size === size &&
                      v.color.name === selectedColor?.name &&
                      v.stock > 0
                  );

                  return (
                    <button
                      key={size as string}
                      className={`min-w-[3rem] h-10 px-3 border rounded-md flex items-center justify-center transition-colors ${
                        selectedSize === size
                          ? "bg-primary text-primary-foreground border-primary"
                          : isAvailable
                          ? "border-border hover:border-primary/50"
                          : "border-muted bg-muted/50 text-muted-foreground cursor-not-allowed"
                      }`}
                      onClick={() =>
                        isAvailable && setSelectedSize(size as string)
                      }
                      disabled={!isAvailable}
                      aria-label={`Select size ${size}`}
                    >
                      {size as string}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity and Stock */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <span className="font-medium mr-3">Quantity:</span>
              <div className="flex items-center border rounded-md">
                <button
                  className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-50"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-50"
                  onClick={increaseQuantity}
                  disabled={
                    selectedVariant ? quantity >= selectedVariant.stock : false
                  }
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="text-sm">
              {selectedVariant ? (
                <span
                  className={
                    selectedVariant.stock > 10
                      ? "text-green-600 dark:text-green-400"
                      : selectedVariant.stock > 0
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-red-600 dark:text-red-400"
                  }
                >
                  {selectedVariant.stock > 10
                    ? "In Stock"
                    : selectedVariant.stock > 0
                    ? `Only ${selectedVariant.stock} left`
                    : "Out of Stock"}
                </span>
              ) : (
                <span className="text-muted-foreground">Select options</span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mb-8">
            <Button
              size="lg"
              className="w-full py-6 text-base font-medium"
              disabled={!selectedVariant || selectedVariant.stock === 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <div className="flex gap-3">
              <Button
                variant={isFavorite ? "default" : "outline"}
                size="lg"
                className="flex-1 py-6 text-base font-medium"
                onClick={toggleFavorite}
              >
                <Heart
                  className={`mr-2 h-5 w-5 ${
                    isFavorite ? "fill-primary-foreground" : ""
                  }`}
                />
                {isFavorite ? "Saved" : "Save"}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-[3.25rem] w-[3.25rem]"
                aria-label="Share product"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Shipping & Returns */}
          <div className="bg-muted/30 rounded-lg p-4 mb-8">
            <div className="flex items-start gap-3 mb-3">
              <Truck className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h3 className="font-medium">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  Free standard shipping on orders over $100
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <RefreshCw className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h3 className="font-medium">Easy Returns</h3>
                <p className="text-sm text-muted-foreground">
                  30-day return policy
                </p>
              </div>
            </div>
          </div>

          {/* Seller Info */}
          <div className="border rounded-lg p-4 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-12 h-12 rounded-full bg-muted overflow-hidden">
                {product.seller.avatar ? (
                  <Image
                    src={product.seller.avatar || "/placeholder.svg"}
                    alt={product.seller.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-medium">
                    {product.seller.name.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center">
                  <h3 className="font-medium">{product.seller.name}</h3>
                  {product.seller.isVerified && (
                    <Badge
                      variant="outline"
                      className="ml-2 bg-blue-500/10 text-blue-500 border-blue-500/20"
                    >
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 mr-1" />
                  <span>{product.seller.rating.toFixed(1)}</span>
                  <span className="mx-1">•</span>
                  <span>{product.seller.totalSales} sales</span>
                </div>
              </div>
            </div>
            <div className="flex items-center text-sm text-muted-foreground mb-3">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{product.seller.location}</span>
              <span className="mx-1">•</span>
              <span>Joined {formatDate(product.seller.joinedDate)}</span>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              View Store
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12 mb-16">
        {isMobile ? (
          // Accordion for mobile
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="description">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <p>{product.description}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="details">
              <AccordionTrigger>Details & Care</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Product Details</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Brand</span>
                        <span>{product.brand}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Style</span>
                        <span>{product.style}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Gender</span>
                        <span>{product.gender}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Condition</span>
                        <span>{product.condition}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Category</span>
                        <span>
                          {product.category.main} / {product.category.sub}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Materials</h4>
                    <ul className="space-y-2 text-sm">
                      {product.materials.map((material, index) => (
                        <li key={index} className="flex justify-between">
                          <span className="text-muted-foreground">
                            {material.name}
                          </span>
                          <span>{material.percentage}%</span>
                        </li>
                      ))}
                    </ul>

                    <h4 className="font-medium mt-4 mb-2">Care Instructions</h4>
                    <ul className="space-y-1 text-sm">
                      {product.careInstructions.map((instruction, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>{instruction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="measurements">
              <AccordionTrigger>Measurements</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {Object.entries(product.measurements).map(([key, value]) =>
                    value ? (
                      <div key={key} className="flex justify-between">
                        <span className="capitalize text-muted-foreground">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                        <span>{value} cm</span>
                      </div>
                    ) : null
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="reviews">
              <AccordionTrigger>
                Reviews ({product.totalReviews})
              </AccordionTrigger>
              <AccordionContent>
                <div className="text-center py-8">
                  <h4 className="text-lg font-medium mb-2">Customer Reviews</h4>
                  <div className="flex justify-center items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? "fill-primary text-primary"
                            : "fill-muted text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-lg font-medium">
                    {product.rating.toFixed(1)} out of 5
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Based on {product.totalReviews} reviews
                  </p>
                  <Button>Write a Review</Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          // Tabs for desktop
          <Tabs
            defaultValue="description"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-4"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-4"
              >
                Details & Care
              </TabsTrigger>
              <TabsTrigger
                value="measurements"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-4"
              >
                Measurements
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-4"
              >
                Reviews ({product.totalReviews})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-6">
              <div className="prose max-w-none dark:prose-invert">
                <p>{product.description}</p>
              </div>
            </TabsContent>
            <TabsContent value="details" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Product Details</h3>
                  <div className="grid grid-cols-2 gap-y-4">
                    <div className="text-muted-foreground">Brand</div>
                    <div>{product.brand}</div>
                    <div className="text-muted-foreground">Style</div>
                    <div>{product.style}</div>
                    <div className="text-muted-foreground">Gender</div>
                    <div>{product.gender}</div>
                    <div className="text-muted-foreground">Condition</div>
                    <div>{product.condition}</div>
                    <div className="text-muted-foreground">Category</div>
                    <div>
                      {product.category.main} / {product.category.sub}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">Materials</h3>
                  <div className="grid grid-cols-2 gap-y-2 mb-6">
                    {product.materials.map((material, index) => (
                      <React.Fragment key={index}>
                        <div className="text-muted-foreground">
                          {material.name}
                        </div>
                        <div>{material.percentage}%</div>
                      </React.Fragment>
                    ))}
                  </div>

                  <h3 className="text-lg font-medium mb-4">
                    Care Instructions
                  </h3>
                  <ul className="space-y-2">
                    {product.careInstructions.map((instruction, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="measurements" className="pt-6">
              <h3 className="text-lg font-medium mb-4">Product Measurements</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.entries(product.measurements).map(([key, value]) =>
                  value ? (
                    <div
                      key={key}
                      className="flex flex-col p-4 border rounded-md"
                    >
                      <span className="text-sm text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className="text-lg font-medium mt-1">
                        {value} cm
                      </span>
                    </div>
                  ) : null
                )}
              </div>
              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Measurements may vary slightly from the listed dimensions.
                    For the most accurate fit, we recommend checking your own
                    measurements and comparing them to the product's specific
                    dimensions.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-6">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 p-6 bg-muted/30 rounded-lg text-center">
                  <h3 className="text-lg font-medium mb-2">Customer Reviews</h3>
                  <div className="flex justify-center items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-6 w-6 ${
                          i < Math.floor(product.rating)
                            ? "fill-primary text-primary"
                            : "fill-muted text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-2xl font-bold">
                    {product.rating.toFixed(1)}
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Based on {product.totalReviews} reviews
                  </p>
                  <Button className="w-full">Write a Review</Button>
                </div>
                <div className="md:w-2/3">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Recent Reviews</h3>
                    <Select defaultValue="newest">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="highest">Highest Rated</SelectItem>
                        <SelectItem value="lowest">Lowest Rated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-6">
                    {/* Placeholder for reviews - in a real app, you'd map through actual reviews */}
                    <div className="border-b pb-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">Sarah J.</h4>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < 5
                                    ? "fill-primary text-primary"
                                    : "fill-muted text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          2 days ago
                        </span>
                      </div>
                      <p className="text-sm mt-2">
                        Absolutely love this! The quality is exceptional and it
                        fits perfectly. Would definitely recommend to anyone
                        looking for a similar item.
                      </p>
                    </div>
                    <div className="border-b pb-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">Michael T.</h4>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < 4
                                    ? "fill-primary text-primary"
                                    : "fill-muted text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          1 week ago
                        </span>
                      </div>
                      <p className="text-sm mt-2">
                        Great product overall. Shipping was fast and the item
                        was exactly as described. Took off one star because the
                        color is slightly different than in the photos.
                      </p>
                    </div>
                    <Button variant="outline" className="w-full">
                      Load More Reviews
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}

// Helper function to check if a color is light or dark
function isLightColor(hex: string) {
  // Convert hex to RGB
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);

  // Calculate brightness (HSP formula)
  const brightness = Math.sqrt(
    0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b)
  );

  // Return true if color is light
  return brightness > 127.5;
}

// Helper function to format date
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
  }).format(date);
}
