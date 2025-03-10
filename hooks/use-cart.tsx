"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/product";
import { products } from "@/data/products";

interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
}

interface CartStore {
  items: CartItem[];
  summary: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  };
  addItem: (product: Product, quantity?: number, size?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateSize: (id: string, size: string) => void;
  clearCart: () => void;
}

const initialItems = [
  {
    id: "cart-1",
    product: products[0],
    quantity: 1,
    selectedSize: products[0].availableSizes?.[0],
  },
  {
    id: "cart-2",
    product: products[1],
    quantity: 2,
    selectedSize: products[1].availableSizes?.[0],
  },
  {
    id: "cart-3",
    product: products[2],
    quantity: 1,
    selectedSize: products[2].availableSizes?.[0],
  },
];

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: initialItems,
      summary: {
        subtotal: 0,
        shipping: 5.99,
        tax: 0,
        total: 0,
      },

      addItem: (product: Product, quantity = 1, size?: string) => {
        const items = get().items;
        const existingItem = items.find(
          (item) => item.product.id === product.id && item.selectedSize === size
        );

        if (existingItem) {
          get().updateQuantity(
            existingItem.id,
            existingItem.quantity + quantity
          );
          return;
        }

        set((state) => {
          const newItems = [
            ...state.items,
            {
              id: Math.random().toString(36).substring(2, 9),
              product,
              quantity,
              selectedSize: size,
            },
          ];
          return {
            items: newItems,
            summary: calculateSummary(newItems),
          };
        });
      },

      removeItem: (id: string) =>
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== id);
          return {
            items: newItems,
            summary: calculateSummary(newItems),
          };
        }),

      updateQuantity: (id: string, quantity: number) =>
        set((state) => {
          const newItems = state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          );
          return {
            items: newItems,
            summary: calculateSummary(newItems),
          };
        }),

      updateSize: (id: string, size: string) =>
        set((state) => {
          const newItems = state.items.map((item) =>
            item.id === id ? { ...item, selectedSize: size } : item
          );
          return {
            items: newItems,
            summary: calculateSummary(newItems),
          };
        }),

      clearCart: () =>
        set({
          items: [],
          summary: {
            subtotal: 0,
            shipping: 5.99,
            tax: 0,
            total: 0,
          },
        }),
    }),
    {
      name: "cart-storage",
      skipHydration: true,
    }
  )
);

// Helper function to calculate cart summary
function calculateSummary(items: CartItem[]) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = items.length > 0 ? 5.99 : 0;
  const tax = subtotal * 0.1; // 10% tax rate
  const total = subtotal + shipping + tax;

  return {
    subtotal,
    shipping,
    tax,
    total,
  };
}

// Export types for use in other components
export type { CartItem };
