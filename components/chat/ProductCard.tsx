"use client";

import { motion } from "framer-motion";
import { Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: {
    image: string;
    name: string;
    forSale: boolean;
    forTrade: boolean;
    price: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 w-full max-w-xs"
    >
      <div className="relative">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-24 sm:h-32 object-cover"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {product.forSale && (
            <Badge className="bg-[#1D9BF0] hover:bg-[#1a8cd8] text-[10px] sm:text-xs">
              <Tag className="h-3 w-3 mr-1" /> For Sale
            </Badge>
          )}
          {product.forTrade && (
            <Badge className="bg-purple-600 hover:bg-purple-700 text-[10px] sm:text-xs">
              <Tag className="h-3 w-3 mr-1" /> For Trade
            </Badge>
          )}
        </div>
      </div>
      <div className="p-2 sm:p-3">
        <h3 className="font-medium text-sm sm:text-base text-gray-900 truncate">
          {product.name}
        </h3>
        <div className="flex justify-between items-center mt-1">
          <p className="text-[#1D9BF0] font-semibold text-sm sm:text-base">
            ${product.price.toFixed(2)}
          </p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="text-[10px] sm:text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
