import { ProductPaginatedResponse } from "@/types/response-types.";
import { ENDPOINTS } from "@/utils/endpoints";
import apiService from "./api-service";

export interface AutocompleteResult {
  productId: string;
  name: string;
  slug: string;
  categoryName: string | null;
  rank: number;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

export interface SearchProductResult {
  id: string | number;
  productId: string;
  name: string;
  slug: string;
  minPrice: number | null;
  maxPrice: number | null;
  stockQuantity: number;
  averageRating: number;
  reviewCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  images: ProductImage[] | null;
  rank: number;
}

export const SearchService = {
  searchProducts: async (search: string, page = 1, limit = 10) => {
    const response = await apiService.get<
      ProductPaginatedResponse<SearchProductResult>
    >(ENDPOINTS.productSearch.search, {
      search,
      page,
      limit,
    });
    return response.data;
  },

  autocomplete: async (search: string) => {
    if (!search?.trim()) return [];

    // The response is array of AutocompleteResult on success
    const response = await apiService.get<AutocompleteResult[]>(
      ENDPOINTS.productSearch.autocomplete,
      { search },
    );
    return response.data;
  },
};
