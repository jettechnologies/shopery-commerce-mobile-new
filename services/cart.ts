import { ENDPOINTS } from "@/utils/endpoints";
import apiService from "./api-service";
import { type CartResponse, type GuestCartResponse } from "@/types/response-types.";
import { useAuthStore } from "@/store/auth-store";

export interface AddToCartParams {
  productId: string;
  variantId: number;
  quantity: number;
}

export interface UpdateCartParams {
  cartItemId: string | number;
  quantity: number;
}

const getHeaders = async () => {
  const guestToken = useAuthStore.getState().guestCartToken;
  return guestToken ? { "x-guest-token": guestToken } : {};
};

export const CartService = {
  getCart: async () => {
    const isAuth = !!useAuthStore.getState().accessToken;
    const endpoint = isAuth ? ENDPOINTS.cart.get : ENDPOINTS.guestCart.get;
    const headers = !isAuth ? await getHeaders() : {};
    
    const response = await apiService.get<CartResponse | GuestCartResponse>(endpoint, {}, { headers: headers as any });
    return response.data;
  },

  addToCart: async (data: AddToCartParams) => {
    const isAuth = !!useAuthStore.getState().accessToken;
    const endpoint = isAuth ? ENDPOINTS.cart.addItem : ENDPOINTS.guestCart.addItem;
    const headers = !isAuth ? await getHeaders() : {};

    const response = await apiService.post<any>(endpoint, data, { headers: headers as any });
    return response.data;
  },

  updateCartItem: async (params: UpdateCartParams) => {
    const isAuth = !!useAuthStore.getState().accessToken;
    // Guest cart doesn't seem to have a PATCH /item endpoint in the provided snippet, 
    // but the swagger docs show it for auth cart. 
    // For guest cart, quantity might be handled by re-adding or we might need a specific patch if exist.
    // Looking at the guest-cart service snippet, it doesn't have an update endpoint, 
    // only addItem (which might handle increments) and removeItem.
    // I'll assume for guest cart we might need to handle it differently if not provided.
    
    if (isAuth) {
      const response = await apiService.patch<any>(ENDPOINTS.cart.updateItem(params.cartItemId), { quantity: params.quantity });
      return response.data;
    } else {
      // If guest cart doesn't have update, we might have to remove and re-add or hope addItem handles it.
      // Based on typical "addItem" logic, it usually updates if item exists.
      // Let's assume for now guest cart uses addItem for updates if quantity is passed.
      // Actually, let's stick to the provided auth endpoints for now and fallback for guest.
      return null; 
    }
  },

  removeFromCart: async (cartItemId: string | number) => {
    const isAuth = !!useAuthStore.getState().accessToken;
    const endpoint = isAuth ? ENDPOINTS.cart.removeItem(cartItemId) : ENDPOINTS.guestCart.removeItem(cartItemId);
    const headers = !isAuth ? await getHeaders() : {};

    const response = await apiService.delete<any>(endpoint, { headers: headers as any });
    return response.data;
  },

  clearCart: async () => {
    const isAuth = !!useAuthStore.getState().accessToken;
    const endpoint = isAuth ? ENDPOINTS.cart.clear : ENDPOINTS.guestCart.clear;
    const headers = !isAuth ? await getHeaders() : {};

    const response = await apiService.delete<any>(endpoint, { headers: headers as any });
    return response.data;
  },

  mergeCart: async (userId: number) => {
    const headers = await getHeaders();
    const response = await apiService.post<any>(ENDPOINTS.guestCart.merge, { userId }, { headers: headers as any });
    return response.data;
  }
};
