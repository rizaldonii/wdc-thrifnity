import { Product } from "./product";
import { User } from "./user";

export interface Trade {
  id: string;
  slug: string;
  // User who initiates the trade
  initiator: {
    userId: string;
    user: User;
    offeredProduct: Product;
    interestedProducts: Product[];
  };
  createdAt: string;
  updatedAt: string;
  // Optional fields for when trade is completed
  completedAt?: string;
  meetupLocation?: {
    address: string;
    city: string;
    coordinate: {
      lat: number;
      lng: number;
    };
  };
  // Optional shipping information if not meeting in person
  shippingMethod?: {
    method: "pickup" | "delivery" | "shipping";
    trackingNumber?: string;
    courier?: string;
  };
}
