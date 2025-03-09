export type TopCategory =
  | "T-Shirts"
  | "Shirts"
  | "Sweaters"
  | "Hoodies"
  | "Blouses"
  | "Tank Tops"
  | "Polo Shirts"
  | "Crop Tops";

export type BottomCategory =
  | "Jeans"
  | "Pants"
  | "Shorts"
  | "Skirts"
  | "Leggings"
  | "Joggers"
  | "Cargo Pants"
  | "Culottes";

export type DressCategory =
  | "Mini Dresses"
  | "Midi Dresses"
  | "Maxi Dresses"
  | "Party Dresses"
  | "Casual Dresses"
  | "Formal Dresses"
  | "Summer Dresses"
  | "Winter Dresses";

export type OuterwearCategory =
  | "Jackets"
  | "Coats"
  | "Blazers"
  | "Cardigans"
  | "Vests"
  | "Windbreakers"
  | "Hooded Jackets"
  | "Parkas";

export type AccessoryCategory =
  | "Bags"
  | "Belts"
  | "Hats"
  | "Scarves"
  | "Jewelry"
  | "Sunglasses"
  | "Watches"
  | "Hair Accessories";

export type ShoeCategory =
  | "Sneakers"
  | "Boots"
  | "Sandals"
  | "Heels"
  | "Flats"
  | "Loafers"
  | "Athletic Shoes"
  | "Dress Shoes";

export type MainCategory =
  | "Tops"
  | "Bottoms"
  | "Dresses"
  | "Outerwear"
  | "Accessories"
  | "Shoes";

export interface Category {
  id: string;
  name: MainCategory;
  slug: string;
  description?: string;
  subcategories: {
    id: string;
    name:
      | TopCategory
      | BottomCategory
      | DressCategory
      | OuterwearCategory
      | AccessoryCategory
      | ShoeCategory;
    slug: string;
    description?: string;
  }[];
}

export interface CategoryResponse {
  categories: Category[];
  total: number;
}
