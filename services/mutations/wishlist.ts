import { Wishlist } from "@/types/response-types.";
import { ENDPOINTS } from "@/utils/endpoints";
import apiService from "../api-service";

export const getWishlist = () =>
  apiService.get<Wishlist>(ENDPOINTS.wishlist.get);

export const addToWishlist = (data: { productId: string }) =>
  apiService.post<Wishlist>(ENDPOINTS.wishlist.add, data);

export const removeFromWishlist = (productId: string) =>
  apiService.delete<Wishlist>(ENDPOINTS.wishlist.remove(productId));
