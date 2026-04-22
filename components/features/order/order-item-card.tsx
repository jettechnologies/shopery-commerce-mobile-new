import {
  useCancelOrder,
  useUpdateOrderAddress,
} from "@/services/tanstack-query/queries/use-orders-query";
import { router } from "expo-router";
import { Image } from "expo-image";
import { ShoppingBag } from "lucide-react-native";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { formatPrice, getStatusConfig } from "./helpers";
import { FlatOrderItem } from "./types";

interface OrderItemCardProps {
  item: FlatOrderItem;
  onOpenAddressModal: (orderId: string) => void;
}

export const OrderItemCard = ({
  item,
  onOpenAddressModal,
}: OrderItemCardProps) => {
  const { label, borderColor, textColor } = getStatusConfig(item.parentStatus);
  const cancelOrderMutation = useCancelOrder();
  const updateAddressMutation = useUpdateOrderAddress();

  const productThumbnail = item.product?.images?.[0]?.imageUrl;

  const handleCancel = async () => {
    try {
      await cancelOrderMutation.mutateAsync(item.parentOrderId);
    } catch (err) {
      console.log(err, "error");
    }
  };

  const handleUpdateAddress = () => {
    onOpenAddressModal(item.parentOrderId);
  };

  const canModify = ![
    "shipped",
    "delivered",
    "cancelled",
    "refunded",
    "failed",
  ].includes(item.parentStatus.toLowerCase());

  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#f0f0f0",
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.04,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: "#f8f7ff",
            borderRadius: 14,
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {productThumbnail ? (
            <Image
              source={{ uri: productThumbnail }}
              style={{ width: "100%", height: "100%" }}
              contentFit="cover"
            />
          ) : (
            <ShoppingBag size={28} color="#a78bfa" />
          )}
        </View>

        <View style={{ flex: 1, marginLeft: 12 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                color: "#111827",
                fontSize: 15,
                flex: 1,
                marginRight: 8,
              }}
              numberOfLines={2}
            >
              {item.product?.name ?? "Product"}
            </Text>
            <View
              style={{
                borderWidth: 1.5,
                borderColor,
                borderRadius: 8,
                paddingHorizontal: 8,
                paddingVertical: 3,
              }}
            >
              <Text
                style={{ color: textColor, fontSize: 11, fontWeight: "600" }}
              >
                {label}
              </Text>
            </View>
          </View>

          {item.variant?.color?.[0] && (
            <Text style={{ color: "#6b7280", fontSize: 13, marginTop: 4 }}>
              Color: {item.variant.color[0]}
            </Text>
          )}

          <Text style={{ color: "#6b7280", fontSize: 13, marginTop: 2 }}>
            Qty: {item.quantity}
          </Text>

          <Text
            style={{
              fontWeight: "700",
              color: "#111827",
              fontSize: 15,
              marginTop: 4,
            }}
          >
            {formatPrice(item.unitPrice)}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: 12, marginTop: 14 }}>
        <Pressable
          onPress={() => router.push(`/product/${item.product?.productId}`)}
          style={{
            flex: 1,
            borderWidth: 1.5,
            borderColor: "#d1d5db",
            borderRadius: 50,
            paddingVertical: 11,
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "600", color: "#374151" }}>Detail</Text>
        </Pressable>
        {!canModify ? (
          <Pressable
            style={{
              flex: 1,
              backgroundColor: "#4338ca",
              borderRadius: 50,
              paddingVertical: 11,
              alignItems: "center",
            }}
            disabled={item.parentStatus.toLowerCase() === "cancelled"}
          >
            <Text
              style={{
                fontWeight: "600",
                color:
                  item.parentStatus.toLowerCase() === "cancelled"
                    ? "#9ca3af"
                    : "#fff",
              }}
            >
              {item.parentStatus.toLowerCase() === "cancelled"
                ? "Cancelled"
                : "Tracking"}
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={handleCancel}
            disabled={cancelOrderMutation.isPending}
            style={{
              flex: 1,
              backgroundColor: "#dc2626",
              borderRadius: 50,
              paddingVertical: 11,
              alignItems: "center",
              opacity: cancelOrderMutation.isPending ? 0.7 : 1,
            }}
          >
            {cancelOrderMutation.isPending ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={{ fontWeight: "600", color: "#fff" }}>
                Cancel Order
              </Text>
            )}
          </Pressable>
        )}
      </View>
      {canModify && (
        <View style={{ marginTop: 12 }}>
          <Pressable
            onPress={handleUpdateAddress}
            disabled={updateAddressMutation.isPending}
            style={{
              width: "100%",
              borderWidth: 1.5,
              borderColor: "#4338ca",
              borderRadius: 50,
              paddingVertical: 11,
              alignItems: "center",
              opacity: updateAddressMutation.isPending ? 0.7 : 1,
            }}
          >
            {updateAddressMutation.isPending ? (
              <ActivityIndicator size="small" color="#4338ca" />
            ) : (
              <Text style={{ fontWeight: "600", color: "#4338ca" }}>
                Update Address
              </Text>
            )}
          </Pressable>
        </View>
      )}
    </View>
  );
};
