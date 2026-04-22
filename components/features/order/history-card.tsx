import { OrderHistoryItem } from "@/types/response-types.";
import { Package } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { formatDate, formatPrice, getStatusConfig } from "./helpers";

export const HistoryCard = ({ item }: { item: OrderHistoryItem }) => {
  const { label, borderColor, textColor } = getStatusConfig(item.status);

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
            backgroundColor: "#f0fdf4",
            borderRadius: 14,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Package size={28} color="#22c55e" />
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
              numberOfLines={1}
            >
              Order #{(item.orderId || item.id)?.toString().slice(-6)}
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

          {item.user?.name && (
            <Text style={{ color: "#6b7280", fontSize: 13, marginTop: 4 }}>
              {item.user.name}
            </Text>
          )}

          <Text style={{ color: "#6b7280", fontSize: 13, marginTop: 2 }}>
            {formatDate(item.createdAt)}
          </Text>

          <Text
            style={{
              fontWeight: "700",
              color: "#111827",
              fontSize: 15,
              marginTop: 4,
            }}
          >
            {formatPrice(item.total)}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: 12, marginTop: 14 }}>
        <Pressable
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
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "#4338ca",
            borderRadius: 50,
            paddingVertical: 11,
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "600", color: "#fff" }}>
            Received Order
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
