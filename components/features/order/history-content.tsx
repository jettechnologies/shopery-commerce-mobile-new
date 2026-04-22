import { useGetOrderHistory } from "@/services/tanstack-query/queries/use-orders-query";
import { ActivityIndicator, FlatList, View } from "react-native";
import { EmptyState } from "./empty-state";
import { HistoryCard } from "./history-card";

export const HistoryContent = () => {
  const { data, isLoading } = useGetOrderHistory();

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#4338ca" />
      </View>
    );
  }

  const history = data?.orderHistory ?? [];

  if (history.length === 0) {
    return <EmptyState label="No order history yet" />;
  }

  return (
    <FlatList
      data={history}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <HistoryCard item={item} />}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 120,
      }}
      showsVerticalScrollIndicator={false}
    />
  );
};
