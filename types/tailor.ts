export interface ServicePrice {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: number;
}

export interface PortfolioItem {
  id: string;
  image: string;
  title: string;
  description: string;
  category: string;
  before?: string;
  after?: string;
  date: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  images?: string[];
  serviceType: string;
}

export interface BusinessHours {
  day:
    | "Sunday"
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday";
  open: string;
  close: string;
  isClosed: boolean;
}

export interface Tailor {
  phone: string;
  email: string;
  website: string;
  id: string;
  name: string;
  slug: string;
  avatar: string;
  coverImage: string;
  description: string;
  specialty: string[];
  experience: number;
  location: {
    address: string;
    city: string;
    province: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  contact: {
    phone: string;
    whatsapp?: string;
    email?: string;
  };
  businessHours: BusinessHours[];
  services: ServicePrice[];
  portfolio: PortfolioItem[];
  reviews: Review[];
  rating: number;
  totalReviews: number;
  totalOrders: number;
  memberSince: string;
  isVerified: boolean;
  tags: string[];
  stats: {
    completionRate: number;
    responseRate: number;
    averageResponseTime: string;
  };
}
