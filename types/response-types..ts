import { PaginatedData, PaginationMeta } from "@/services/api-service";

export interface ApiSuccessResponse<T = any> {
  status: number;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  status: number;
  message: string;
  error: string;
}

export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;

export type BaseUser = {
  id: string;
  email: string;
  name: string;
};

export type LoginResponse = {
  user: BaseUser;
  accessToken: string;
  refreshToken: string;
};

export type RegisterResponse = LoginResponse;

export type GuestCartResponse = {
  id: string;
  token: string;
  expiresAt: string;
  items: any[];
};

export type CartResponse = {
  id: string;
  cartId: string;
  userId: string;
  status: string;
  items: any[];
  total: number;
};

export interface Category {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
}

export interface ProductCategory {
  id: string;
  productId: string;
  categoryId: string;
  category: Category;
}

export interface Variant {
  id: string;
  productId: string;
  sku: string;
  size: string;
  color: string[];
  stockQuantity: number;
  price: number;
  salePrice?: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  productId: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string | null;
  minPrice: number;
  maxPrice: number;
  sku?: string | null;
  stockQuantity: number;
  weight?: string | null;
  dimensions?: string | null;
  averageRating: number;
  reviewCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  images: { imageUrl: string; altText: string; isPrimary: boolean }[];
  categories: ProductCategory[];
  tags: any[];
  variants: Variant[];
}

export type ProductPaginatedResponse<T> = PaginatedData<T, "products">;
export type PaginatedResponse<T> = PaginatedData<T, "data">;

export interface CursorPaginatedResponse<T> {
  products: T[];
  pagination: Omit<PaginationMeta, "total" | "totalPages" | "currentPage"> & {
    nextCursor: string | null;
    prevCursor: string | null;
    nextLink: string | null;
    prevLink: string | null;
  };
}

export interface CategoryResponse {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  productCount: number;
  description: string;
  createdAt: string;
}

export type PaginatedCategories = PaginatedData<CategoryResponse, "categories">;

export interface CategoryDetail extends Category {
  products: Product[];
  pagination: PaginationMeta;
}

// ─── Order Types ───────────────────────────────────────────────────────────────

export interface OrderProduct {
  id: string;
  productId: string;
  name: string;
  slug: string;
  description: string;
  images: { imageUrl: string; altText: string }[];
}

export interface OrderVariant {
  id: string;
  size: string;
  color: string[];
  price: number;
  salePrice: number | null;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId: string | null;
  quantity: number;
  unitPrice: string;
  product: OrderProduct;
  variant: OrderVariant | null;
}

export interface Order {
  id: string;
  orderId: string;
  userId: string;
  cartId?: string;
  email: string;
  status: string;
  total: string;
  createdAt: string;
  updatedAt?: string;
  OrderItems: OrderItem[];
}

export interface OrderHistoryItem {
  id: string;
  orderId?: string;
  status: string;
  total: string;
  createdAt: string;
  user: {
    email: string;
    name: string;
  };
}

export type OrdersResponse = {
  orders: Order[];
  pagination: PaginationMeta;
};

export type OrderHistoryResponse = {
  orderHistory: OrderHistoryItem[];
  pagination: PaginationMeta;
};

// ─── Profile Types ─────────────────────────────────────────────────────────────

export interface ProfileAddress {
  id: string | number;
  userId: string | number;
  address1: string;
  address2?: string | null;
  city: string;
  state: string;
  zip: string;
  country: string;
  created?: string;
  modified?: string;
}

export interface UserProfileImage {
  imageUrl: string;
  publicId?: string;
}

export interface UserProfile {
  id: string | number;
  userId: string;
  email: string;
  name: string | null;
  role: string;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  userProfileImage?: UserProfileImage | null;
  Address?: ProfileAddress[];
}

// ─── Wishlist Types ────────────────────────────────────────────────────────────

export interface WishlistItem {
  id: string;
  wishlistId: string;
  productId: string;
  product: Product;
}

export interface Wishlist {
  id: string;
  userId: string;
  items: WishlistItem[];
}
