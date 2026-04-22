import { AppHeader } from "@/components/app-header";
import { SafeScreen } from "@/components/safe-screen";
import { ProductCard } from "@/components/shared/product-card";
import { Box } from "@/components/ui/box";
import { useGetWishlist } from "@/services/tanstack-query/queries/use-wishlist-query";
import { ActivityIndicator, FlatList, Text } from "react-native";
// import { Heading } from "@/components/ui/heading";

const FavoriteScreen = () => {
  const { data: wishlist, isLoading, isError } = useGetWishlist();

  if (isLoading) {
    return (
      <SafeScreen>
        <Box className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#7c3aed" />
        </Box>
      </SafeScreen>
    );
  }

  if (isError) {
    return (
      <SafeScreen>
        <Box className="flex-1 justify-center items-center p-4">
          <Text className="text-red-500 text-center">
            Failed to load favorites. Please try again.
          </Text>
        </Box>
      </SafeScreen>
    );
  }

  const favoriteProducts = wishlist?.items.map((item) => item.product) || [];

  return (
    <SafeScreen>
      <Box className="flex-1 px-4">
        <AppHeader title="My Favorite" showBack={false} variant="secondary" />

        {favoriteProducts.length > 0 ? (
          <FlatList
            data={favoriteProducts}
            keyExtractor={(item) => item.productId}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            contentContainerStyle={{ paddingBottom: 100 }}
            renderItem={({ item }) => (
              <ProductCard
                id={item.productId}
                name={item.name}
                price={item.minPrice}
                imgSrc={
                  item.images.find((img) => img.isPrimary)?.imageUrl ||
                  item.images[0]?.imageUrl
                }
                isHttpSrc={true}
              />
            )}
          />
        ) : (
          <Box className="flex-1 justify-center items-center">
            <Text className="text-gray-500 text-lg">No favorites yet.</Text>
          </Box>
        )}
      </Box>
    </SafeScreen>
  );
};

export default FavoriteScreen;
