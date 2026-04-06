import {
  CursorPaginatedResponse,
  PaginatedResponse,
  Product,
} from "@/types/response-types.";
import { ENDPOINTS } from "@/utils/endpoints";
import apiService from "./api-service";

export const ProductService = {
  getProducts: async (page = 1, limit = 10) => {
    const response = await apiService.get<PaginatedResponse<Product>>(
      ENDPOINTS.products.list,
      {
        page,
        limit,
      },
    );
    return response.data;
  },

  getProductsCursor: async (cursor?: string, limit = 10) => {
    const response = await apiService.get<CursorPaginatedResponse<Product>>(
      ENDPOINTS.products.cursor,
      { cursor, limit },
    );
    return response.data;
  },

  getProductById: async (id: string) => {
    const response = await apiService.get<Product>(
      ENDPOINTS.products.detail(id),
    );
    return response.data;
  },

  getProductBySlug: async (slug: string) => {
    const response = await apiService.get<Product>(
      ENDPOINTS.products.slug(slug),
    );
    return response.data;
  },

  getFilteredProducts: async (params: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    tags?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    page?: number;
    limit?: number;
  }) => {
    const response = await apiService.get<PaginatedResponse<Product>>(
      ENDPOINTS.products.filter,
      params,
    );
    return response.data;
  },
};
