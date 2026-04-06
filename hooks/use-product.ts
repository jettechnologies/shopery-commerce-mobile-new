import { ProductService } from "@/services/product";
import { Product } from "@/types/response-types.";
import { useQuery } from "@tanstack/react-query";

export const useProduct = (id: string) => {
  return useQuery<Product, Error>({
    queryKey: ["product", id],
    queryFn: () => ProductService.getProductById(id),
    enabled: !!id,
  });
};

export const useProducts = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["products", page, limit],
    queryFn: () => ProductService.getProducts(page, limit),
  });
};
