import { AppHeader } from "@/components/app-header";
import { SafeScreen } from "@/components/safe-screen";
import { Pagination, ProductCard } from "@/components/shared";
import { Box } from "@/components/ui/box";
import { useGetCategoryProducts } from "@/services/tanstack-query/queries/use-categories-query";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, FlatList, Text } from "react-native";

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/150";

const CategoryDetails = () => {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetCategoryProducts(categoryId, page, 10);

  const products = data?.products || [];
  const totalPages = data?.pagination?.totalPages || 1;
  const hasNextPage = data?.pagination?.hasNextPage;

  if (isLoading && page === 1) {
    return (
      <SafeScreen>
        <AppHeader title={categoryId || "Category Details"} />
        <Box className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#9333ea" />
        </Box>
      </SafeScreen>
    );
  }

  return (
    <SafeScreen>
      <AppHeader title={categoryId || "Category Details"} />

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{
          paddingBottom: 140,
          paddingHorizontal: 16,
        }}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 12,
        }}
        ListEmptyComponent={
          !isLoading ? (
            <Box className="mt-10 items-center">
              <Text className="text-gray-500 text-lg">No products found in this category</Text>
            </Box>
          ) : null
        }
        ListFooterComponent={
          hasNextPage ? (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              isLoading={isLoading}
            />
          ) : null
        }
        renderItem={({ item: product }) => (
          <ProductCard
            imgSrc={product.images?.[0]?.imageUrl || PLACEHOLDER_IMAGE}
            isHttpSrc={true}
            name={product.name}
            price={product.minPrice}
            id={product.id}
          />
        )}
      />
    </SafeScreen>
  );
};

export default CategoryDetails;
