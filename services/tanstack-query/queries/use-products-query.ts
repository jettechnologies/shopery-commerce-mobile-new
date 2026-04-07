import { ProductService } from "@/services/product";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query-keys";

export const useGetProducts = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: QUERY_KEYS.products.list({ page, limit }),
    queryFn: () => ProductService.getProducts(page, limit),
  });
};

export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.products.detail(id),
    queryFn: () => ProductService.getProductById(id),
    enabled: !!id,
  });
};

export const useGetProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.products.detail(slug),
    queryFn: () => ProductService.getProductBySlug(slug),
    enabled: !!slug,
  });
};
