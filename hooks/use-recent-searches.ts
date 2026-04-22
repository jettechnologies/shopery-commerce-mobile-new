import {
  getAsyncStorageItem,
  removeAsyncStorageItem,
  setAsyncStorageItem,
} from "@/utils/libs/async-storage-helper";
import { useEffect, useState } from "react";

const STORAGE_KEY = "recent_search";

export const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    loadSearches();
  }, []);

  const loadSearches = async () => {
    const data = await getAsyncStorageItem<string[]>(STORAGE_KEY);
    if (data && Array.isArray(data)) {
      setRecentSearches(data);
    }
  };

  const addSearch = async (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;

    const current = (await getAsyncStorageItem<string[]>(STORAGE_KEY)) || [];
    const filtered = current.filter((item) => item !== trimmed);
    filtered.unshift(trimmed);
    if (filtered.length > 10) {
      filtered.pop();
    }

    await setAsyncStorageItem(STORAGE_KEY, filtered);
    setRecentSearches(filtered);
  };

  const removeSearch = async (term: string) => {
    const current = (await getAsyncStorageItem<string[]>(STORAGE_KEY)) || [];
    const filtered = current.filter((item) => item !== term);
    await setAsyncStorageItem(STORAGE_KEY, filtered);
    setRecentSearches(filtered);
  };

  const clearAll = async () => {
    await removeAsyncStorageItem(STORAGE_KEY);
    setRecentSearches([]);
  };

  return {
    recentSearches,
    addSearch,
    removeSearch,
    clearAll,
  };
};
