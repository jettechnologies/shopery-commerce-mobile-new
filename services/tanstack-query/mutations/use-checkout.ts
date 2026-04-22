import { useToastContext } from "@/context/toast-provider";
import {
  CheckoutParams,
  initiateCheckout,
} from "@/services/mutations/checkout";
import { useCartStore } from "@/store/cart-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { QUERY_KEYS } from "../query-keys";

export const useCheckout = () => {
  const { openToast } = useToastContext();
  const queryClient = useQueryClient();
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);

  return useMutation({
    mutationFn: (data: CheckoutParams) => initiateCheckout(data),
    meta: {
      errorMessage: "Checkout failed. Please try again.",
      invalidatesQuery: [QUERY_KEYS.cart.base(), QUERY_KEYS.orders.base()],
    },
    onSuccess: (data) => {
      clearCart();

      // 2. Invalidate server-side cart and orders queries
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.cart.base() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.orders.base() });

      // 3. Show success feedback
      openToast(data.message || "Order placed successfully!", "success");

      // 4. Redirect to Orders tab
      router.push("/order");
    },
  });
};
