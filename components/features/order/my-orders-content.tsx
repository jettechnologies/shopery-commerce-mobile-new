import { AddressSelectorModal } from "@/components/modal";
import {
  useGetOrdersByUser,
  useUpdateOrderAddress,
} from "@/services/tanstack-query/queries/use-orders-query";
import { useAuthStore } from "@/store/auth-store";
import { OrderItem, Order as OrderType } from "@/types/response-types.";
import { useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { EmptyState } from "./empty-state";
import { OrderItemCard } from "./order-item-card";
import { FlatOrderItem } from "./types";

export const MyOrdersContent = () => {
  const { user } = useAuthStore();
  const { data, isLoading } = useGetOrdersByUser();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const updateAddressMutation = useUpdateOrderAddress();

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#4338ca" />
      </View>
    );
  }

  if (!user) {
    return <EmptyState label="Please log in to view your orders" />;
  }

  const flatItems: FlatOrderItem[] = (data?.orders ?? []).flatMap(
    (order: OrderType) =>
      (order.OrderItems ?? []).map((item: OrderItem) => ({
        ...item,
        parentOrderId: order.id,
        parentStatus: order.status,
        parentCreatedAt: order.createdAt,
      })),
  );

  if (flatItems.length === 0) {
    return <EmptyState label="You have no active orders" />;
  }

  return (
    <>
      <FlatList
        data={flatItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrderItemCard
            item={item}
            onOpenAddressModal={(orderId) => setSelectedOrderId(orderId)}
          />
        )}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={false}
      />

      <AddressSelectorModal
        isVisible={!!selectedOrderId}
        onClose={() => setSelectedOrderId(null)}
        onSelectAddress={async (addressId) => {
          if (selectedOrderId) {
            try {
              await updateAddressMutation.mutateAsync({
                orderId: selectedOrderId,
                addressId: Number(addressId),
              });
            } catch (err) {
              console.log(err, "error");
            }
          }
        }}
      />
    </>
  );
};
