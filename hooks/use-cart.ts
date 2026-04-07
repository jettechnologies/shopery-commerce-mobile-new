import { getCart } from "@/services/mutations/cart";
import {
  useAddToCart,
  useClearCart,
  useRemoveFromCart,
  useUpdateCartItem,
} from "@/services/tanstack-query/mutations/cart";
import { QUERY_KEYS } from "@/services/tanstack-query/query-keys";
import { useCartStore } from "@/store/cart-store";
import { useQuery } from "@tanstack/react-query";

export const debounce = (fn: Function, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

export const useCart = () => {
  const setCart = useCartStore((s) => s.setCart);

  return useQuery({
    queryKey: QUERY_KEYS.cart.base(),
    queryFn: async () => {
      const data = await getCart();
      // Ensure data.items is correctly synced
      if (data && "items" in data) {
        setCart(data.items);
      }
      return data;
    },
  });
};

export const useCartMutations = () => {
  const addItemMutation = useAddToCart();
  const updateItemMutation = useUpdateCartItem();
  const removeItemMutation = useRemoveFromCart();
  const clearCartMutation = useClearCart();

  return {
    addItem: addItemMutation.mutate,
    updateItem: updateItemMutation.mutate,
    removeItem: removeItemMutation.mutate,
    clearCart: clearCartMutation.mutate,
    isAdding: addItemMutation.isPending,
    isUpdating: updateItemMutation.isPending,
    isRemoving: removeItemMutation.isPending,
  };
};
