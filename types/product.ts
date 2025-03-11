import type {
  MainCategory,
  TopCategory,
  BottomCategory,
  DressCategory,
  OuterwearCategory,
  AccessoryCategory,
  ShoeCategory,
} from "./category";

type SizeType = ClothingSize | BagSize | ShoeSize | DressSize;


export type ClothingSize = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "3XL";
export type DressSize = "28" | "30" | "32" | "34" | "36" | "38" | "40" | "42";
export type BagSize = "Small" | "Medium" | "Large";
export type ShoeSize =
  | "35"
  | "36"
  | "37"
  | "38"
  | "39"
  | "40"
  | "41"
  | "42"
  | "43"
  | "44"
  | "45"
  | "46";
export type ClothingCondition =
  | "New"
  | "Like New"
  | "Very Good"
  | "Good"
  | "Fair";
export type ClothingCategory =
  | "Tops"
  | "Bottoms"
  | "Dresses"
  | "Outerwear"
  | "Accessories"
  | "Shoes";
export type ClothingStyle =
  | "Casual"
  | "Formal"
  | "Streetwear"
  | "Vintage"
  | "Athletic"
  | "Luxury";
export type Gender = "Men" | "Women" | "Unisex" | "Kids";

export interface ProductMeasurements {
  chest?: number;
  waist?: number;
  hips?: number;
  length?: number;
  shoulder?: number;
  sleeveLength?: number;
  inseam?: number;
  shoeSize?: number;
  heelHeight?: number;
  platformHeight?: number;
  width?: number;
  height?: number;
  depth?: number;
}

export interface ProductMaterial {
  name: string;
  percentage: number;
}

export interface ProductCategory {
  main: MainCategory;
  sub:
    | TopCategory
    | BottomCategory
    | DressCategory
    | OuterwearCategory
    | AccessoryCategory
    | ShoeCategory;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary?: boolean;
  views?: "front" | "back" | "side" | "detail";
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductVariant {
  id: string;
  size: ClothingSize | BagSize | ShoeSize | DressSize;
  color: ProductColor;
  stock: number;
  price: number;
}

export interface Seller {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  totalSales: number;
  joinedDate: string;
  isVerified: boolean;
  location: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;

  // Fashion specific fields
  brand: string;
  style: ClothingStyle;
  gender: Gender;
  category: ProductCategory;
  condition: ClothingCondition;
  materials: ProductMaterial[];
  measurements: ProductMeasurements;
  careInstructions: string[];

  // Product details
  images: ProductImage[];
  variants: ProductVariant[];
  colors: ProductColor[];
  availableSizes: SizeType[];

  // Inventory
  totalStock: number;
  reservedStock: number;

  // Metadata
  seller: Seller;
  rating: number;
  totalReviews: number;
  tags: string[];

  // Status flags
  isNew: boolean;
  isOnSale: boolean;
  isFeatured: boolean;
  isAuthenticated: boolean;

  // Analytics
  views: number;
  likes: number;
  timesAddedToCart: number;

  // Timestamps
  createdAt: string;
  updatedAt: string;
  lastPurchased?: string;
}

export interface ProductFilters {
  category?: {
    main?: MainCategory[];
    sub?: (
      | TopCategory
      | BottomCategory
      | DressCategory
      | OuterwearCategory
      | AccessoryCategory
      | ShoeCategory
    )[];
  };
  gender?: Gender[];
  style?: ClothingStyle[];
  condition?: ClothingCondition[];
  sizes?: ClothingSize[] | BagSize[] | ShoeSize[];
  brands?: string[];
  colors?: string[];
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
}

export interface ProductSortOptions {
  field: "price" | "createdAt" | "rating" | "popularity" | "sales";
  direction: "asc" | "desc";
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  filters: ProductFilters;
  sort: ProductSortOptions;
}
