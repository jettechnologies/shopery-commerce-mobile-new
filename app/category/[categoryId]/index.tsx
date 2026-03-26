import { AppHeader } from "@/components/app-header";
import { SafeScreen } from "@/components/safe-screen";
import { ProductCard } from "@/components/shared";
import { PRODUCTS_DATA } from "@/data";
import { FlatList } from "react-native";

const CategoryDetails = () => {
  return (
    <SafeScreen>
      <AppHeader title="Category details" />

      <FlatList
        data={PRODUCTS_DATA}
        keyExtractor={(item) => item.name}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 12,
        }}
        renderItem={({ item }) => <ProductCard {...item} />}
      />
    </SafeScreen>
  );
};

export default CategoryDetails;
