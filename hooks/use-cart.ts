import { useToastContext } from "@/context/toast-provider";
import { CartService } from "@/services/cart";
import { useCartStore } from "@/store/cart-store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
    queryKey: ["cart"],
    queryFn: async () => {
      const data = await CartService.getCart();
      // Ensure data.items is correctly synced
      if (data && "items" in data) {
        setCart(data.items);
      }
      return data;
    },
  });
};

export const useCartMutations = () => {
  const queryClient = useQueryClient();
  const { openToast } = useToastContext();
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItemFromStore = useCartStore((s) => s.removeItem);

  const addItemMutation = useMutation({
    mutationFn: CartService.addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      openToast("Item added to cart", "success");
    },
    onError: (error: any) => {
      openToast(error?.message || "Failed to add item", "error");
    },
  });

  const updateItemMutation = useMutation({
    mutationFn: CartService.updateCartItem,
    onMutate: async ({ cartItemId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previousCart = queryClient.getQueryData(["cart"]);

      // Optimistic update
      updateQuantity(cartItemId, quantity);

      return { previousCart };
    },
    onError: (err, variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }
      openToast("Failed to update quantity", "error");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: CartService.removeFromCart,
    onMutate: async (cartItemId) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previousCart = queryClient.getQueryData(["cart"]);

      // Optimistic update
      removeItemFromStore(cartItemId);

      return { previousCart };
    },
    onSuccess: () => {
      openToast("Item removed from cart", "success");
    },
    onError: (err, variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }
      openToast("Failed to remove item", "error");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: CartService.clearCart,
    onSuccess: () => {
      useCartStore.getState().clearCart();
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      openToast("Cart cleared", "success");
    },
    onError: () => {
      openToast("Failed to clear cart", "error");
    },
  });

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
