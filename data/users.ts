import { User, UserProfile } from "@/types/user";

export const users: User[] = [
  {
    id: "user-001",
    email: "sarah.williams@example.com",
    username: "sarah_eco",
    name: "Sarah Williams",
    role: "user",
    avatar: "/images/avatars/sarah.webp",
    phone: "+6281234567890",
    bio: "Passionate about sustainable fashion and environmental conservation. Love finding unique vintage pieces!",
    verified: true,
    stats: {
      totalTrades: 25,
      successfulTrades: 23,
      rating: 4.8,
      reviewCount: 20,
      joinedAt: "2023-09-01T00:00:00Z",
      lastActive: "2024-03-09T10:30:00Z",
    },
    social: {
      instagram: "sarah_eco_fashion",
      twitter: "sarah_sustainable",
    },
    preferences: {
      notifications: {
        email: true,
        push: true,
        tradeUpdates: true,
        marketing: false,
      },
      privacy: {
        showEmail: false,
        showPhone: true,
        showLocation: true,
      },
    },
    addresses: [
      {
        id: "addr-001",
        type: "home",
        address: "Jl. Sudirman No. 123",
        city: "Jakarta",
        province: "DKI Jakarta",
        postalCode: "12930",
        coordinate: {
          lat: -6.2088,
          lng: 106.8456,
        },
        isDefault: true,
      },
    ],
    listings: [], // Will be populated with product references
    favorites: [], // Will be populated with product references
    trades: [], // Will be populated with trade references
    status: "active",
    createdAt: "2023-09-01T00:00:00Z",
    updatedAt: "2024-03-09T10:30:00Z",
  },
  {
    id: "user-002",
    email: "mike.chen@example.com",
    username: "mike_styles",
    name: "Michael Chen",
    role: "tailor",
    avatar: "/images/avatars/mike.webp",
    phone: "+6287654321098",
    bio: "Professional tailor with 10+ years of experience. Specializing in vintage clothing restoration and modern alterations.",
    verified: true,
    stats: {
      totalTrades: 150,
      successfulTrades: 148,
      rating: 4.9,
      reviewCount: 130,
      joinedAt: "2023-06-15T00:00:00Z",
      lastActive: "2024-03-09T09:45:00Z",
    },
    social: {
      instagram: "mike_tailor",
      facebook: "mikechentalior",
    },
    preferences: {
      notifications: {
        email: true,
        push: true,
        tradeUpdates: true,
        marketing: true,
      },
      privacy: {
        showEmail: true,
        showPhone: true,
        showLocation: true,
      },
    },
    addresses: [
      {
        id: "addr-002",
        type: "office",
        address: "Jl. Gatot Subroto No. 45",
        city: "Jakarta",
        province: "DKI Jakarta",
        postalCode: "12950",
        coordinate: {
          lat: -6.2256,
          lng: 106.8455,
        },
        isDefault: true,
      },
    ],
    listings: [], // Will be populated with product references
    favorites: [], // Will be populated with product references
    trades: [], // Will be populated with trade references
    status: "active",
    createdAt: "2023-06-15T00:00:00Z",
    updatedAt: "2024-03-09T09:45:00Z",
  },
  {
    id: "user-003",
    email: "admin@thriftinity.com",
    username: "admin_thriftinity",
    name: "Admin Thriftinity",
    role: "admin",
    avatar: "/images/avatars/admin.webp",
    verified: true,
    stats: {
      totalTrades: 0,
      successfulTrades: 0,
      rating: 0,
      reviewCount: 0,
      joinedAt: "2023-01-01T00:00:00Z",
      lastActive: "2024-03-09T11:00:00Z",
    },
    preferences: {
      notifications: {
        email: true,
        push: true,
        tradeUpdates: true,
        marketing: false,
      },
      privacy: {
        showEmail: false,
        showPhone: false,
        showLocation: false,
      },
    },
    addresses: [],
    listings: [],
    favorites: [],
    trades: [],
    status: "active",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2024-03-09T11:00:00Z",
  },
  {
    id: "user-004",
    email: "lisa.anderson@example.com",
    username: "lisa_vintage",
    name: "Lisa Anderson",
    role: "user",
    avatar: "/images/avatars/lisa.webp",
    phone: "+6282187654321",
    bio: "Vintage fashion enthusiast and collector. Love giving old clothes new life through creative styling!",
    verified: true,
    stats: {
      totalTrades: 42,
      successfulTrades: 40,
      rating: 4.7,
      reviewCount: 35,
      joinedAt: "2023-08-15T00:00:00Z",
      lastActive: "2024-03-09T08:15:00Z",
    },
    social: {
      instagram: "lisa_vintage_finds",
      twitter: "lisa_thrifts",
    },
    preferences: {
      notifications: {
        email: true,
        push: true,
        tradeUpdates: true,
        marketing: true,
      },
      privacy: {
        showEmail: false,
        showPhone: true,
        showLocation: true,
      },
    },
    addresses: [
      {
        id: "addr-004",
        type: "home",
        address: "Jl. Kemang Raya No. 88",
        city: "Jakarta Selatan",
        province: "DKI Jakarta",
        postalCode: "12730",
        coordinate: {
          lat: -6.2606,
          lng: 106.8168,
        },
        isDefault: true,
      },
    ],
    listings: [],
    favorites: [],
    trades: [],
    status: "active",
    createdAt: "2023-08-15T00:00:00Z",
    updatedAt: "2024-03-09T08:15:00Z",
  },
  {
    id: "user-005",
    email: "david.kumar@example.com",
    username: "david_tailor",
    name: "David Kumar",
    role: "tailor",
    avatar: "/images/avatars/david.webp",
    phone: "+6285678901234",
    bio: "Expert tailor specializing in traditional and modern alterations. Creating perfect fits for over 8 years.",
    verified: true,
    stats: {
      totalTrades: 89,
      successfulTrades: 87,
      rating: 4.9,
      reviewCount: 80,
      joinedAt: "2023-07-01T00:00:00Z",
      lastActive: "2024-03-09T11:30:00Z",
    },
    social: {
      instagram: "david_tailoring",
      facebook: "davidkumartailor",
    },
    preferences: {
      notifications: {
        email: true,
        push: true,
        tradeUpdates: true,
        marketing: false,
      },
      privacy: {
        showEmail: true,
        showPhone: true,
        showLocation: true,
      },
    },
    addresses: [
      {
        id: "addr-005",
        type: "office",
        address: "Jl. Thamrin No. 156",
        city: "Jakarta Pusat",
        province: "DKI Jakarta",
        postalCode: "10230",
        coordinate: {
          lat: -6.1947,
          lng: 106.8236,
        },
        isDefault: true,
      },
    ],
    listings: [],
    favorites: [],
    trades: [],
    status: "active",
    createdAt: "2023-07-01T00:00:00Z",
    updatedAt: "2024-03-09T11:30:00Z",
  },
  {
    id: "user-006",
    email: "maya.putri@example.com",
    username: "maya_thrift",
    name: "Maya Putri",
    role: "user",
    avatar: "/images/avatars/maya.webp",
    phone: "+6289876543210",
    bio: "Sustainable fashion advocate and minimalist lifestyle enthusiast. Building a conscious wardrobe one trade at a time.",
    verified: true,
    stats: {
      totalTrades: 15,
      successfulTrades: 15,
      rating: 5.0,
      reviewCount: 12,
      joinedAt: "2023-11-01T00:00:00Z",
      lastActive: "2024-03-09T10:00:00Z",
    },
    social: {
      instagram: "maya_sustainable",
      twitter: "maya_thrifts",
    },
    preferences: {
      notifications: {
        email: true,
        push: true,
        tradeUpdates: true,
        marketing: false,
      },
      privacy: {
        showEmail: false,
        showPhone: false,
        showLocation: true,
      },
    },
    addresses: [
      {
        id: "addr-006",
        type: "home",
        address: "Jl. Senopati No. 67",
        city: "Jakarta Selatan",
        province: "DKI Jakarta",
        postalCode: "12190",
        coordinate: {
          lat: -6.2275,
          lng: 106.8133,
        },
        isDefault: true,
      },
    ],
    listings: [],
    favorites: [],
    trades: [],
    status: "active",
    createdAt: "2023-11-01T00:00:00Z",
    updatedAt: "2024-03-09T10:00:00Z",
  },
];

// Helper function to get public profile
export const getUserProfile = (userId: string): UserProfile | null => {
  const user = users.find((u) => u.id === userId);
  if (!user) return null;

  return {
    id: user.id,
    username: user.username,
    name: user.name,
    avatar: user.avatar,
    bio: user.bio,
    stats: user.stats,
    social: user.social,
    verified: user.verified,
    activeListings: user.listings.length,
    completedTrades: user.stats.successfulTrades,
  };
};
