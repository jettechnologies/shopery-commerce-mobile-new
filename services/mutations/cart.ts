import { useAuthStore } from "@/store/auth-store";
import {
  type CartResponse,
  type GuestCartResponse,
} from "@/types/response-types.";
import { ENDPOINTS } from "@/utils/endpoints";
import apiService from "../api-service";

export interface AddToCartParams {
  productId: string;
  variantId: number;
  quantity: number;
}

export interface UpdateCartParams {
  cartItemId: string | number;
  quantity: number;
}

const getHeaders = () => {
  const guestToken = useAuthStore.getState().guestCartToken;
  return guestToken ? { "x-guest-token": guestToken } : {};
};

export const getCart = async () => {
  const isAuth = !!useAuthStore.getState().accessToken;
  const endpoint = isAuth ? ENDPOINTS.cart.get : ENDPOINTS.guestCart.get;
  const headers = !isAuth ? getHeaders() : {};

  const response = await apiService.get<CartResponse | GuestCartResponse>(
    endpoint,
    {},
    { headers: headers as any },
  );
  return response.data;
};

export const addToCart = async (data: AddToCartParams) => {
  const isAuth = !!useAuthStore.getState().accessToken;
  const endpoint = isAuth
    ? ENDPOINTS.cart.addItem
    : ENDPOINTS.guestCart.addItem;
  const headers = !isAuth ? getHeaders() : {};

  return apiService.post<any>(endpoint, data, { headers: headers as any });
};

export const updateCartItem = async ({
  cartItemId,
  quantity,
}: UpdateCartParams) => {
  const isAuth = !!useAuthStore.getState().accessToken;

  if (isAuth) {
    return apiService.patch<any>(ENDPOINTS.cart.updateItem(cartItemId), {
      quantity,
    });
  } else {
    return Promise.resolve({
      data: null,
      message: "Guest cart update not implemented",
      status: 200,
    });
  }
};

export const removeFromCart = async (cartItemId: string | number) => {
  const isAuth = !!useAuthStore.getState().accessToken;
  const endpoint = isAuth
    ? ENDPOINTS.cart.removeItem(cartItemId)
    : ENDPOINTS.guestCart.removeItem(cartItemId);
  const headers = !isAuth ? getHeaders() : {};

  return apiService.delete<any>(endpoint, { headers: headers as any });
};

export const clearCart = async () => {
  const isAuth = !!useAuthStore.getState().accessToken;
  const endpoint = isAuth ? ENDPOINTS.cart.clear : ENDPOINTS.guestCart.clear;
  const headers = !isAuth ? getHeaders() : {};

  return apiService.delete<any>(endpoint, { headers: headers as any });
};

export const mergeCart = async (userId: number | string) => {
  const headers = getHeaders();
  return apiService.post<any>(
    ENDPOINTS.guestCart.merge,
    { userId },
    { headers: headers as any },
  );
};
