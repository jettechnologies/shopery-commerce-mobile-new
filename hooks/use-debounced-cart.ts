import { useCallback, useRef } from "react";
import { useCartMutations } from "./use-cart";

const debounce = (fn: Function, delay: number) => {
  let timeoutId: any;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

export const useDebouncedCartUpdate = () => {
  const { updateItem } = useCartMutations();

  const debouncedUpdate = useRef(
    debounce((cartItemId: string | number, quantity: number) => {
      updateItem({ cartItemId, quantity });
    }, 500),
  ).current;

  return useCallback(
    (cartItemId: string | number, quantity: number) => {
      debouncedUpdate(cartItemId, quantity);
    },
    [debouncedUpdate],
  );
};
