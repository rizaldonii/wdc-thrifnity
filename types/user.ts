import { Product } from "./product";
import { Trade } from "./trade";

export type UserRole = "user" | "admin" | "tailor";

export interface UserStats {
  totalTrades: number;
  successfulTrades: number;
  rating: number;
  reviewCount: number;
  joinedAt: string;
  lastActive: string;
}

export interface UserAddress {
  id: string;
  type: "home" | "office" | "other";
  address: string;
  city: string;
  province: string;
  postalCode: string;
  coordinate: {
    lat: number;
    lng: number;
  };
  isDefault: boolean;
}

export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  bio?: string;
  verified: boolean;
  stats: UserStats;
  // Social links
  social?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
  // User preferences
  preferences: {
    notifications: {
      email: boolean;
      push: boolean;
      tradeUpdates: boolean;
      marketing: boolean;
    };
    privacy: {
      showEmail: boolean;
      showPhone: boolean;
      showLocation: boolean;
    };
  };
  // Address information
  addresses: UserAddress[];
  // References to other data
  listings: Product[];
  favorites: Product[];
  trades: Trade[];
  // Account status
  status: "active" | "suspended" | "banned";
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile
  extends Pick<
    User,
    | "id"
    | "username"
    | "name"
    | "avatar"
    | "bio"
    | "stats"
    | "social"
    | "verified"
  > {
  // Simplified version for public viewing
  activeListings: number;
  completedTrades: number;
}
