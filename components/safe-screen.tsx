import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const SafeScreen = ({
  children,
  paddingBottom,
}: {
  children: React.ReactNode;
  paddingBottom?: number;
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="bg-background-50 flex-1"
      style={{
        paddingTop: insets.top,
        paddingBottom,
      }}
    >
      {children}
    </View>
  );
};
