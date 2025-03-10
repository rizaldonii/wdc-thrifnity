import { Trade } from "@/types/trade";
import { products } from "./products";
import { users } from "./users";

export const trades: Trade[] = [
  {
    id: "trade-001",
    initiator: {
      userId: "user-001",
      user: users[0],
      offeredProduct: {
        ...products[0],
        images: [
          {
            id: "img-001",
            url: "/images/products/vintage-jacket.webp",
            alt: "Vintage Denim Jacket",
          },
        ],
      },
      interestedProducts: [products[3], products[4]],
    },
    recipient: {
      userId: "user-002",
      user: users[1],
      requestedProduct: {
        ...products[3],
        images: [
          {
            id: "img-004",
            url: "/images/products/summer-dress.webp",
            alt: "Summer Dress",
          },
        ],
      },
    },
    status: "pending",
    createdAt: "2024-03-09T10:00:00Z",
    updatedAt: "2024-03-09T10:00:00Z",
    messages: [
      {
        id: "msg-001",
        userId: "user-001",
        content:
          "Hi! I'm interested in trading my vintage jacket for your dress. Would you be interested?",
        timestamp: "2024-03-09T10:00:00Z",
      },
    ],
  },
  {
    id: "trade-002",
    initiator: {
      userId: "user-003",
      user: users[2],
      offeredProduct: {
        ...products[5],
        images: [
          {
            id: "img-006",
            url: "/images/products/designer-bag.webp",
            alt: "Designer Handbag",
          },
        ],
      },
      interestedProducts: [products[7]],
    },
    recipient: {
      userId: "user-004",
      user: users[3],
      requestedProduct: {
        ...products[7],
        images: [
          {
            id: "img-008",
            url: "/images/products/leather-boots.webp",
            alt: "Leather Boots",
          },
        ],
      },
    },
    status: "pending",
    createdAt: "2024-03-08T15:30:00Z",
    updatedAt: "2024-03-09T09:00:00Z",
    completedAt: "2024-03-09T09:00:00Z",
    meetupLocation: {
      address: "Central Mall",
      city: "Jakarta",
      coordinate: {
        lat: -6.2088,
        lng: 106.8456,
      },
    },
    shippingMethod: {
      method: "pickup",
    },
    messages: [
      {
        id: "msg-002",
        userId: "user-003",
        content: "Would you like to trade?",
        timestamp: "2024-03-08T15:30:00Z",
      },
      {
        id: "msg-003",
        userId: "user-004",
        content: "Sure! Let's meet at Central Mall tomorrow.",
        timestamp: "2024-03-08T15:35:00Z",
      },
      {
        id: "msg-004",
        userId: "user-003",
        content: "Perfect! See you there.",
        timestamp: "2024-03-08T15:36:00Z",
      },
    ],
  },
  {
    id: "trade-003",
    initiator: {
      userId: "user-005",
      user: users[4], // David Kumar
      offeredProduct: {
        ...products[9],
        images: [
          {
            id: "img-011",
            url: "/images/products/summer-dress.webp",
            alt: "Summer Dress",
          },
        ],
      },
      interestedProducts: [products[10]],
    },
    recipient: {
      userId: "user-006",
      user: users[5], // Maya Putri
      requestedProduct: {
        ...products[10],
        images: [
          {
            id: "img-012",
            url: "/images/products/silk-scarf.webp",
            alt: "Silk Scarf",
          },
        ],
      },
    },
    status: "completed",
    createdAt: "2024-03-07T14:20:00Z",
    updatedAt: "2024-03-08T16:30:00Z",
    completedAt: "2024-03-08T16:30:00Z",
    shippingMethod: {
      method: "shipping",
      trackingNumber: "JNE123456789",
      courier: "JNE Express",
    },
    messages: [
      {
        id: "msg-005",
        userId: "user-005",
        content: "Hi Maya, would you like to trade your dress for my blazer?",
        timestamp: "2024-03-07T14:20:00Z",
      },
      {
        id: "msg-006",
        userId: "user-006",
        content: "Yes, that would be great! Let's use shipping service.",
        timestamp: "2024-03-07T14:25:00Z",
      },
    ],
  },
  {
    id: "trade-004",
    initiator: {
      userId: "user-004",
      user: users[3], // Lisa Anderson
      offeredProduct: products[7],
      interestedProducts: [products[5]],
    },
    recipient: {
      userId: "user-001",
      user: users[0], // Sarah Williams
      requestedProduct: products[5],
    },
    status: "accepted",
    createdAt: "2024-03-09T09:15:00Z",
    updatedAt: "2024-03-09T09:45:00Z",
    meetupLocation: {
      address: "Grand Indonesia Mall",
      city: "Jakarta",
      coordinate: {
        lat: -6.1947,
        lng: 106.8219,
      },
    },
    shippingMethod: {
      method: "pickup",
    },
    messages: [
      {
        id: "msg-007",
        userId: "user-004",
        content: "Love your vintage bag! Want to trade for my designer scarf?",
        timestamp: "2024-03-09T09:15:00Z",
      },
      {
        id: "msg-008",
        userId: "user-001",
        content: "Sounds good! Can we meet at Grand Indonesia tomorrow?",
        timestamp: "2024-03-09T09:30:00Z",
      },
    ],
  },
  {
    id: "trade-005",
    initiator: {
      userId: "user-006",
      user: users[5], // Maya Putri
      offeredProduct: products[8],
      interestedProducts: [products[2], products[1]],
    },
    recipient: {
      userId: "user-003",
      user: users[2], // Admin (showing even admins can trade)
      requestedProduct: products[2],
    },
    status: "rejected",
    createdAt: "2024-03-08T11:00:00Z",
    updatedAt: "2024-03-08T13:20:00Z",
    messages: [
      {
        id: "msg-009",
        userId: "user-006",
        content:
          "Would you consider trading your vintage jewelry for my silk scarf?",
        timestamp: "2024-03-08T11:00:00Z",
      },
      {
        id: "msg-010",
        userId: "user-003",
        content: "Sorry, I'm not looking to trade this item at the moment.",
        timestamp: "2024-03-08T13:20:00Z",
      },
    ],
  },
];
