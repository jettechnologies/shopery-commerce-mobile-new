import { SearchService } from "@/services/search";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query-keys";

export const useAutocompleteProducts = (query: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.search.autocomplete(query),
    queryFn: () => SearchService.autocomplete(query),
    enabled: !!query && query.length > 0,
  });
};

export const useSearchProducts = (query: string, page = 1, limit = 10) => {
  return useQuery({
    queryKey: QUERY_KEYS.search.results({ query, page, limit }),
    queryFn: () => SearchService.searchProducts(query, page, limit),
    enabled: !!query,
  });
};
