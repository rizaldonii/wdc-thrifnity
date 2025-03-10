import { Trade } from "@/types/trade";
import { products } from "./products";
import { users } from "./users";

export const trades: Trade[] = [
  {
    id: "trade-001",
    slug: "trade-001",
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
    createdAt: "2024-03-09T10:00:00Z",
    updatedAt: "2024-03-09T10:00:00Z",
  },
  {
    id: "trade-002",
    slug: "trade-002",
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
  },
  {
    id: "trade-003",
    slug: "trade-003",
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
    createdAt: "2024-03-07T14:20:00Z",
    updatedAt: "2024-03-08T16:30:00Z",
    completedAt: "2024-03-08T16:30:00Z",
    shippingMethod: {
      method: "shipping",
      trackingNumber: "JNE123456789",
      courier: "JNE Express",
    },
  },
  {
    id: "trade-004",
    slug: "trade-004",
    initiator: {
      userId: "user-004",
      user: users[3], // Lisa Anderson
      offeredProduct: products[7],
      interestedProducts: [products[5]],
    },

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
  },
  {
    id: "trade-005",
    slug: "trade-005",
    initiator: {
      userId: "user-006",
      user: users[5], // Maya Putri
      offeredProduct: products[8],
      interestedProducts: [products[2], products[1]],
    },
    createdAt: "2024-03-08T11:00:00Z",
    updatedAt: "2024-03-08T13:20:00Z",
  },
];
