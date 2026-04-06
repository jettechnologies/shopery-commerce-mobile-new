import { CategoryDetail, PaginatedCategories } from "@/types/response-types.";
import { ENDPOINTS } from "@/utils/endpoints";
import apiService from "./api-service";

export const CategoryService = {
  getCategories: async (page = 1, limit = 10) => {
    const response = await apiService.get<PaginatedCategories>(
      ENDPOINTS.categories.list,
      {
        page,
        limit,
      },
    );
    return response.data;
  },

  getCategoryById: async (id: string, page = 1, limit = 10) => {
    const response = await apiService.get<CategoryDetail>(
      ENDPOINTS.categories.detail(id),
      {
        page,
        limit,
      },
    );
    return response.data;
  },

  getProductsByCategorySlug: async (slug: string, page = 1, limit = 10) => {
    const response = await apiService.get<CategoryDetail>(
      ENDPOINTS.categories.products(slug),
      { page, limit },
    );
    return response.data;
  },
};
