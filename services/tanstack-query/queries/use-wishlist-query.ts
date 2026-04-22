import { getWishlist } from "@/services/mutations/wishlist";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query-keys";

export const useGetWishlist = () => {
  return useQuery({
    queryKey: QUERY_KEYS.wishlist.base(),
    queryFn: async () => {
      const response = await getWishlist();
      return response.data;
    },
  });
};
