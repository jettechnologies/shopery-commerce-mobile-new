import { Package } from "lucide-react-native";
import { Text, View } from "react-native";

export const EmptyState = ({ label }: { label: string }) => (
  <View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 80,
    }}
  >
    <Package size={56} color="#e5e7eb" />
    <Text
      style={{
        color: "#9ca3af",
        marginTop: 16,
        fontSize: 15,
        fontWeight: "500",
      }}
    >
      {label}
    </Text>
  </View>
);
