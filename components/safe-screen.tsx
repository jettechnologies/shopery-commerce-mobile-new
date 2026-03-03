import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const SafeScreen = ({ children }: { children: React.ReactNode }) => {
  const insets = useSafeAreaInsets();

  return (
    <View className="bg-background flex-1" style={{ paddingTop: insets.top }}>
      {children}
    </View>
  );
};
