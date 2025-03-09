import { ServicePrice } from "./tailor";

export interface User {
  id: string;
  name: string;
  avatar?: string;
  role: "user" | "tailor";
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text?: string;
  image?: string;
  product?: {
    id: string;
    name: string;
    image: string;
    price: number;
  };
  serviceRequest?: {
    service: ServicePrice;
    details: string;
    measurements?: {
      [key: string]: number;
    };
    attachments?: {
      id: string;
      url: string;
      type: "image" | "document";
    }[];
  };
  orderDetails?: {
    orderId: string;
    status: OrderStatus;
    estimatedCompletion: string;
    service: ServicePrice;
    totalPrice: number;
  };
  read: boolean;
  createdAt: string;
}

export type OrderStatus =
  | "pending"
  | "accepted"
  | "in_progress"
  | "ready_for_pickup"
  | "completed"
  | "cancelled";

export interface ChatParticipants {
  user: User;
  tailor: {
    id: string;
    name: string;
    avatar?: string;
    businessName: string;
    location: {
      city: string;
      province: string;
    };
    rating: number;
    isVerified: boolean;
  };
}

export interface ChatRoom {
  id: string;
  participants: ChatParticipants;
  lastMessage: ChatMessage;
  unreadCount: number;
  hasActiveOrder: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ChatConversation {
  id: string;
  roomId: string;
  messages: ChatMessage[];
  participants: ChatParticipants;
  activeServiceRequest?: ServiceRequest;
}

export interface ServiceRequest {
  id: string;
  conversationId: string;
  userId: string;
  tailorId: string;
  service: ServicePrice;
  details: string;
  measurements?: {
    [key: string]: number;
  };
  attachments?: {
    id: string;
    url: string;
    type: "image" | "document";
  }[];
  status: OrderStatus;
  totalPrice: number;
  estimatedDays: number;
  scheduleDate?: string;
  paymentStatus?: "pending" | "paid" | "refunded";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatNotification {
  id: string;
  roomId: string;
  senderId: string;
  recipientId: string;
  type: "message" | "service_request" | "order_update" | "payment_update";
  title: string;
  body: string;
  data?: {
    orderId?: string;
    serviceId?: string;
    status?: OrderStatus;
    paymentStatus?: "pending" | "paid" | "refunded";
  };
  read: boolean;
  createdAt: string;
}
