import { Product } from "./product";

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
  addedAt: Date;
}

export interface CartSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface CartState {
  items: CartItem[];
  summary: CartSummary;
  isLoading: boolean;
  error?: string;
}

export type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "addedAt"> }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "UPDATE_SIZE"; payload: { id: string; size: string } }
  | { type: "CLEAR_CART" }
  | { type: "SET_ERROR"; payload: string }
  | { type: "LOADING_START" }
  | { type: "LOADING_END" };

export interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (product: Product, quantity?: number, size?: string) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateSize: (id: string, size: string) => void;
  clearCart: () => void;
}
