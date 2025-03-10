"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Product } from "@/types/product";
import { Heart, ShoppingCart, Star, StarHalf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Replace the existing getProductImageNumber function
  const getProductImageNumber = (productName: string): number => {
    switch (productName) {
      case "Trendy T-Shirt":
        return 1;
      case "Floral Summer Dress":
        return 2;
      case "Elegant Blouse":
        return 3;
      default:
        // Fallback to cycling through images based on ID if name doesn't match
        const numId = typeof product.id === 'string' ? parseInt(product.id) : product.id;
        return (numId % 3) + 1;
    }
  };

  // Update the primaryImage assignment
  const primaryImage = product.images.find((img) => img.isPrimary)?.url ||
    `/home images/new arrivals/product${getProductImageNumber(product.name)}.webp`;

  // Format price with IDR currency
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Calculate discount percentage if there's an original price
  const discountPercentage = product.originalPrice
    ? Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100
    )
    : 0;

  // Generate rating stars
  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <StarHalf key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
        );
      } else {
        stars.push(
          <Star key={i} className="w-4 h-4 text-muted-foreground/30" />
        );
      }
    }
    return stars;
  };

  return (
    <Card
      className="group overflow-hidden border-0 shadow-md bg-card transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Link href={`/products/${product.slug}`}>
          <Image
            src={primaryImage || "/placeholder.svg"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent dark:from-black/20" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <Badge className="bg-green-600 text-white hover:bg-green-700">
                New Arrival
              </Badge>
            )}
            {product.totalStock <= 5 && product.totalStock > 0 && (
              <Badge
                variant="outline"
                className="bg-amber-500/90 text-white border-amber-600 hover:bg-amber-600"
              >
                Only {product.totalStock} left
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge className="bg-destructive text-destructive-foreground">
                {discountPercentage}% OFF
              </Badge>
            )}
          </div>

          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/40 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full h-10 w-10 shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Add to wishlist"
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              className="rounded-full h-10 w-10 shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Add to cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </Link>
      </div>

      <CardContent className="p-4">
        {/* Category & Rating */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-primary">
            {product.category.main}
          </span>
          <div className="flex gap-0.5">
            {renderRatingStars(product.rating)}
          </div>
        </div>

        {/* Title */}
        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="text-lg font-semibold text-foreground line-clamp-2 min-h-[3.6rem] group-hover:text-primary transition-colors duration-300">
            {product.name}
          </h3>
        </Link>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex flex-col items-start">
        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        {product.totalStock === 0 && (
          <p className="mb-2 text-sm font-medium text-destructive">
            Out of Stock
          </p>
        )}

        {/* Add to Cart Button */}
        <Button
          disabled={product.totalStock === 0}
          className="w-full mt-1"
          variant={product.totalStock === 0 ? "outline" : "default"}
        >
          {product.totalStock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
