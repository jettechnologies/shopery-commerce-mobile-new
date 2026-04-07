import { useToastContext } from "@/context/toast-provider";
import {
  addToCart,
  clearCart,
  removeFromCart,
  updateCartItem,
} from "@/services/mutations/cart";
import { useCartStore } from "@/store/cart-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query-keys";

export const useAddToCart = () => {
  const { openToast } = useToastContext();

  return useMutation({
    mutationFn: addToCart,
    meta: {
      invalidatesQuery: QUERY_KEYS.cart.base(),
      errorMessage: "Failed to add item",
    },
    onSuccess: (data) => {
      openToast(data.message || "Item added to cart", "success");
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  const { openToast } = useToastContext();
  const updateQuantity = useCartStore((s) => s.updateQuantity);

  return useMutation({
    mutationFn: updateCartItem,
    meta: {
      invalidatesQuery: QUERY_KEYS.cart.base(),
      errorMessage: "Failed to update quantity",
    },
    onMutate: async ({ cartItemId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.cart.base() });
      const previousCart = queryClient.getQueryData(QUERY_KEYS.cart.base());

      // Optimistic update
      updateQuantity(cartItemId, quantity);

      return { previousCart };
    },
    onSuccess: (data) => {
      openToast(data.message || "Quantity updated", "success");
    },
    onError: (err, variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(QUERY_KEYS.cart.base(), context.previousCart);
      }
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  const { openToast } = useToastContext();
  const removeItemFromStore = useCartStore((s) => s.removeItem);

  return useMutation({
    mutationFn: removeFromCart,
    meta: {
      invalidatesQuery: QUERY_KEYS.cart.base(),
      errorMessage: "Failed to remove item",
    },
    onMutate: async (cartItemId) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.cart.base() });
      const previousCart = queryClient.getQueryData(QUERY_KEYS.cart.base());

      // Optimistic update
      removeItemFromStore(cartItemId);

      return { previousCart };
    },
    onSuccess: (data) => {
      openToast(data.message || "Item removed from cart", "success");
    },
    onError: (err, variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(QUERY_KEYS.cart.base(), context.previousCart);
      }
    },
  });
};

export const useClearCart = () => {
  const { openToast } = useToastContext();
  const clearStore = useCartStore((s) => s.clearCart);

  return useMutation({
    mutationFn: clearCart,
    meta: {
      invalidatesQuery: QUERY_KEYS.cart.base(),
      errorMessage: "Failed to clear cart",
    },
    onSuccess: (data) => {
      clearStore();
      openToast(data.message || "Cart cleared", "success");
    },
  });
};
