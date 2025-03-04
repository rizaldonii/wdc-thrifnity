"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  isNew?: boolean;
  category: string;
  rating?: number;
  stock?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  slug,
  imageUrl,
  price,
  originalPrice,
  isNew = false,
  category,
  rating = 4.5,
  stock = 10,
}) => {
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  // Generate star rating display
  const renderRating = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className="text-yellow-400">
            ★
          </span>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className="text-yellow-400">
            ⯨
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-muted">
            ★
          </span>
        );
      }
    }
    return stars;
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Wishlist functionality would go here
    console.log("Added to wishlist:", id);
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Add to cart functionality would go here
    console.log("Added to cart:", id);
  };

  const isLowStock = stock <= 5 && stock > 0;

  return (
    <div className="card group relative overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg">
      <Link href={`/product/${slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-accent">
          <div className="relative h-full w-full transition-transform duration-500 group-hover:scale-110">
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="object-cover"
            />
          </div>

          {/* Badges container */}
          <div className="absolute top-0 left-0 p-2 flex flex-col gap-2">
            {isNew && (
              <span className="inline-block rounded-full bg-success px-3 py-1 text-xs font-semibold text-on-primary">
                New
              </span>
            )}

            {isLowStock && (
              <span className="inline-block rounded-full bg-warning px-3 py-1 text-xs font-semibold text-text-primary">
                Sisa {stock}
              </span>
            )}
          </div>

          {discount > 0 && (
            <span className="absolute right-0 top-0 m-2 rounded-lg bg-error px-3 py-1 text-xs font-bold text-on-primary">
              {discount}% OFF
            </span>
          )}

          {/* Quick action buttons overlay */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black bg-opacity-40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button
              onClick={handleWishlistClick}
              className="rounded-full bg-white p-2 text-secondary shadow-md transition-transform hover:scale-110 dark:bg-accent dark:text-primary-light"
              aria-label="Add to wishlist"
            >
              <Heart size={20} />
            </button>
            <button
              onClick={handleCartClick}
              className="btn-primary rounded-full p-2 text-on-primary shadow-md transition-transform hover:scale-110"
              aria-label="Add to cart"
            >
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-muted">{category}</p>
            <div className="flex text-xs">{renderRating()}</div>
          </div>

          <h3 className="mt-2 text-lg text-primary line-clamp-2 h-14">
            {name}
          </h3>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-lg font-bold text-accent">
              Rp {price.toLocaleString("id-ID")}
            </span>
            {originalPrice && (
              <span className="text-sm text-subtle line-through">
                Rp {originalPrice.toLocaleString("id-ID")}
              </span>
            )}
          </div>

          {stock === 0 && (
            <p className="mt-2 text-sm font-medium text-error">Stok Habis</p>
          )}

          {/* Add to cart button */}
          <button
            onClick={handleCartClick}
            disabled={stock === 0}
            className={`mt-3 w-full rounded-lg py-2 text-center text-sm font-medium transition-colors ${
              stock === 0
                ? "bg-accent text-subtle cursor-not-allowed"
                : "btn-primary text-on-primary"
            }`}
          >
            {stock === 0 ? "Stok Habis" : "Tambahkan ke Keranjang"}
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
