// AnimatedTabBar.tsx
import { useTabBar } from "@/context/tab-bar-provider";
import { Animated, StyleSheet } from "react-native";

export const AnimatedTabBar = ({ children }: { children: any }) => {
  const { hidden } = useTabBar();

  return (
    <Animated.View
      style={[styles.tabBar, { transform: [{ translateY: hidden ? 100 : 0 }] }]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    minHeight: 50,
    maxHeight: 70,
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
