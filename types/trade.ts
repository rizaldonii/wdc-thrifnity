import { Product } from "./product";
import { User } from "./user";

export type TradeStatus =
  | "pending" // Waiting for response
  | "accepted" // Trade accepted, arranging exchange
  | "completed" // Trade completed
  | "rejected" // Trade rejected
  | "cancelled"; // Trade cancelled

export interface Trade {
  id: string;
  // User who initiates the trade
  initiator: {
    userId: string;
    user: User;
    // Product they want to trade
    offeredProduct: Product;
    // Products they're interested in (can be multiple options)
    interestedProducts: Product[];
  };
  // User who receives the trade request
  recipient: {
    userId: string;
    user: User;
    // Product(s) being requested
    requestedProduct: Product;
  };
  status: TradeStatus;
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
  // Messages between traders
  messages: {
    id: string;
    userId: string;
    content: string;
    timestamp: string;
  }[];
}
