import { useTabBar } from "@/context/tab-bar-provider";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import { Heart, Home, Package, User } from "lucide-react-native";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const FloatingTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  const { hidden } = useTabBar();

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(hidden ? 120 : 0, {
            damping: 20,
            stiffness: 90,
          }),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { bottom: insets.bottom > 0 ? insets.bottom : 20 },
        animatedContainerStyle,
      ]}
    >
      <BlurView intensity={80} tint="light" style={styles.content}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              if (Platform.OS === "ios") {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          // Icon Mapping
          const renderIcon = (color: string) => {
            const size = 24;
            switch (route.name) {
              case "index":
                return <Home size={size} color={color} />;
              case "order":
                return <Package size={size} color={color} />;
              case "favorite":
                return <Heart size={size} color={color} />;
              case "profile":
                return <User size={size} color={color} />;
              default:
                return null;
            }
          };

          const activeColor = "#5B5BD6";
          const inactiveColor = "#9CA3AF";

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.tabItem, isFocused && styles.activeTabItem]}
            >
              <View style={styles.iconContainer}>
                {renderIcon(isFocused ? activeColor : inactiveColor)}
              </View>
              <Text
                style={[
                  styles.label,
                  { color: isFocused ? activeColor : inactiveColor },
                ]}
              >
                {label as string}
              </Text>
            </Pressable>
          );
        })}
      </BlurView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 20,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    // Remove default background/shadow from container to use pill style
  },
  content: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  tabItem: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 80,
  },
  activeTabItem: {
    backgroundColor: "rgba(91, 91, 214, 0.3)",
  },
  iconContainer: {
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
  },
});
