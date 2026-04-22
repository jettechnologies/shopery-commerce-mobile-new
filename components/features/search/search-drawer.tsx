import { ReusableDrawer } from "@/components/shared/reusable-drawer";
import { useDebounce } from "@/hooks/use-debounce";
import { useRecentSearches } from "@/hooks/use-recent-searches";
import {
  useAutocompleteProducts,
  useSearchProducts,
} from "@/services/tanstack-query/queries/use-search-hooks";
import { useDrawerStore } from "@/store/drawer-store";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Search, X } from "lucide-react-native";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

export const SearchDrawer = () => {
  const { isSearchOpen, closeSearch } = useDrawerStore();
  const [query, setQuery] = React.useState("");
  const [submittedQuery, setSubmittedQuery] = React.useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [limit, setLimit] = React.useState(5);

  const { recentSearches, addSearch, removeSearch, clearAll } =
    useRecentSearches();

  const { data: autocompleteData, isLoading: isAutocompleteLoading } =
    useAutocompleteProducts(!submittedQuery ? debouncedQuery : "");

  const { data: searchData, isLoading: isSearchLoading } = useSearchProducts(
    submittedQuery,
    1,
    limit,
  );

  const handleChangeText = (text: string) => {
    setQuery(text);
    if (submittedQuery) {
      setSubmittedQuery("");
      setLimit(5);
    }
  };

  const handleRecentSearchPress = (term: string) => {
    setQuery(term);
    setSubmittedQuery(term);
    setLimit(5);
  };

  const handleSubmit = () => {
    const term = query.trim();
    if (term.length > 0) {
      addSearch(term);
      setSubmittedQuery(term);
      setLimit(5);
    }
  };

  const navigateToProduct = (productId: string) => {
    closeSearch();
    router.push(`/product/${productId}`);
  };

  const renderContent = () => {
    // ── Full Search Results (explicit submit or recent search tap) ──
    if (submittedQuery) {
      if (isSearchLoading) {
        return (
          <ActivityIndicator size="large" color="#9333ea" className="mt-10" />
        );
      }
      const products = searchData?.products || [];
      const total = searchData?.pagination?.total || 0;

      return (
        <ScrollView showsVerticalScrollIndicator={false} className="mb-10">
          <Text className="text-gray-900 font-bold text-lg mb-4">
            Search Results ({total})
          </Text>
          {products.length === 0 && (
            <Text className="text-gray-500 italic">No products found.</Text>
          )}
          {products.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => navigateToProduct(item.productId)}
              className="flex-row items-center mb-4 bg-gray-50/50 p-3 rounded-2xl"
            >
              <View className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden items-center justify-center">
                {item.images?.[0]?.url ? (
                  <Image
                    source={item.images[0].url || ""}
                    contentFit="cover"
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                ) : (
                  <Search size={24} color="#9CA3AF" />
                )}
              </View>
              <View className="flex-1 ml-4 justify-center">
                <Text className="text-gray-900 font-bold">{item.name}</Text>
                <Text className="text-gray-400 text-xs mt-1" numberOfLines={1}>
                  ${item.minPrice}
                </Text>
              </View>
            </Pressable>
          ))}
          {total > limit && (
            <Pressable
              onPress={() => setLimit((prev) => prev + 5)}
              className="items-center py-4 bg-purple-50 rounded-xl mt-2"
            >
              <Text className="text-purple-600 font-bold">Show more</Text>
            </Pressable>
          )}
        </ScrollView>
      );
    }

    if (query.trim().length > 0) {
      if (isAutocompleteLoading) {
        return (
          <ActivityIndicator size="large" color="#9333ea" className="mt-10" />
        );
      }

      const suggestions = autocompleteData || [];

      return (
        <ScrollView showsVerticalScrollIndicator={false} className="mb-10">
          <Text className="text-gray-900 font-bold text-lg mb-4">
            Suggestions
          </Text>
          {suggestions.length === 0 && debouncedQuery.length > 0 && (
            <Text className="text-gray-500 italic">No suggestions.</Text>
          )}
          {suggestions.map((item) => (
            <Pressable
              key={item.productId}
              onPress={() => navigateToProduct(item.productId)}
              className="flex-row items-center justify-between mb-4 bg-gray-50/50 p-3 rounded-2xl"
            >
              <View className="flex-row items-center flex-1">
                <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-3">
                  <Search size={16} color="#9CA3AF" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-900 font-semibold">
                    {item.name}
                  </Text>
                  {item.categoryName && (
                    <Text className="text-gray-400 text-xs mt-1">
                      {item.categoryName}
                    </Text>
                  )}
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      );
    }

    return (
      <View className="flex-1">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-900 font-bold text-lg">Last Search</Text>
          {recentSearches.length > 0 && (
            <Pressable onPress={clearAll}>
              <Text className="text-purple-600 font-semibold text-sm">
                Clear All
              </Text>
            </Pressable>
          )}
        </View>

        <View className="flex-row flex-wrap gap-2 mb-8">
          {recentSearches.length === 0 ? (
            <Text className="text-gray-400 italic">No recent searches</Text>
          ) : (
            recentSearches.map((item, i) => (
              <View
                key={i}
                className="flex-row items-center bg-gray-50 border border-gray-100 rounded-xl pl-4 pr-2 py-2"
              >
                <Pressable onPress={() => handleRecentSearchPress(item)}>
                  <Text className="text-gray-600 mr-2">{item}</Text>
                </Pressable>
                <Pressable onPress={() => removeSearch(item)} className="p-1">
                  <X size={14} color="#9CA3AF" />
                </Pressable>
              </View>
            ))
          )}
        </View>
      </View>
    );
  };

  return (
    <ReusableDrawer
      isOpen={isSearchOpen}
      onClose={closeSearch}
      size="full"
      anchor="right"
    >
      <View className="pt-2 flex-1">
        <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 mb-6">
          <Search size={20} color="#9CA3AF" />
          <TextInput
            className="flex-1 ml-3 text-gray-900 font-medium"
            placeholder="Search products..."
            value={query}
            onChangeText={handleChangeText}
            onSubmitEditing={handleSubmit}
            autoFocus
            returnKeyType="search"
          />
          {query.length > 0 && (
            <Pressable
              onPress={() => {
                setQuery("");
                setSubmittedQuery("");
              }}
            >
              <X size={18} color="#9CA3AF" />
            </Pressable>
          )}
        </View>

        {renderContent()}
      </View>
    </ReusableDrawer>
  );
};
