import { ProductService } from "@/services/product";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query-keys";

export const useGetProducts = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: QUERY_KEYS.products.list({ page, limit }),
    queryFn: () => ProductService.getProducts(page, limit),
  });
};

// export const useGetProductDetail = (idOrSlug: string) => {
//   return useQuery({
//     queryKey: QUERY_KEYS.products.detail(idOrSlug),
//     queryFn: async () => {
//       console.log(`[useGetProductDetail] Fetching: ${idOrSlug}`);

//       try {
//         const product = await ProductService.getProductBySlug(idOrSlug);
//         if (product) {
//           console.log(`[useGetProductDetail] Successfully fetched by SLUG: ${idOrSlug}`);
//           return product;
//         }
//       } catch (error) {
//         console.log(`[useGetProductDetail] Slug fetch failed for: ${idOrSlug}, trying ID...`);
//       }

//       const productById = await ProductService.getProductById(idOrSlug);
//       if (!productById) {
//         throw new Error(`Product not found with ID/Slug: ${idOrSlug}`);
//       }

//       console.log(`[useGetProductDetail] Successfully fetched by ID: ${idOrSlug}`);
//       return productById;
//     },
//   });
// };

// type ProductIdentifier =
//   | { type: "slug"; value: string }
//   | { type: "id"; value: string };

// export const useGetProductDetail = (identifier: ProductIdentifier) => {
//   return useQuery({
//     queryKey: ["product", identifier.type, identifier.value],
//     queryFn: async () => {
//       console.log(identifier.type, "identifier type");
//       if (identifier.type === "slug") {
//         const product = await ProductService.getProductBySlug(identifier.value);
//         if (!product) throw new Error("Product not found (slug)");
//         return product;
//       }

//       const product = await ProductService.getProductById(identifier.value);
//       if (!product) throw new Error("Product not found (id)");
//       console.log(product, "product");
//       return product;
//     },
//     enabled: !!identifier.value,
//   });
// };

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
