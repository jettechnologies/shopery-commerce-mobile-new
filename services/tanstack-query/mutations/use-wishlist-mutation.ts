import { useToastContext } from "@/context/toast-provider";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/services/mutations/wishlist";
import { useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query-keys";

export const useAddToWishlist = () => {
  const { openToast } = useToastContext();

  return useMutation({
    mutationFn: addToWishlist,
    onSuccess: (data) => {
      openToast(data.message || "Added to wishlist", "success");
    },
    meta: {
      errorMessage: "Failed to add to wishlist",
      invalidatesQuery: QUERY_KEYS.wishlist.base(),
    },
  });
};

export const useRemoveFromWishlist = () => {
  const { openToast } = useToastContext();

  return useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: (data) => {
      openToast(data.message || "Removed from wishlist", "success");
    },
    meta: {
      errorMessage: "Failed to remove from wishlist",
      invalidatesQuery: QUERY_KEYS.wishlist.base(),
    },
  });
};
