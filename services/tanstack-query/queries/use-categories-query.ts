import { CategoryService } from "@/services/category";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query-keys";

export const useGetCategories = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: QUERY_KEYS.categories.list({ page, limit }),
    queryFn: () => CategoryService.getCategories(page, limit),
  });
};

export const useGetCategoryProducts = (
  slugOrId: string,
  page = 1,
  limit = 10,
) => {
  return useQuery({
    queryKey: QUERY_KEYS.categories.products(slugOrId, { page, limit }),
    queryFn: () =>
      CategoryService.getProductsByCategorySlug(slugOrId, page, limit),
  });
};
