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
  images: { imageUrl: string; isPrimary: boolean }[];
  categories: ProductCategory[];
  tags: any[];
  variants: Variant[];
}

export type ProductPaginatedResponse<T> = PaginatedData<T, "products">;

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
