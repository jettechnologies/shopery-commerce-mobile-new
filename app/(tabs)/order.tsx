import { SafeScreen } from "@/components/safe-screen";
import {
  HistoryContent,
  MyOrdersContent,
} from "@/components/features/order";
import { useRef, useState } from "react";
import {
  LayoutAnimation,
  Pressable,
  Text,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const Order = () => {
  const [activeTab, setActiveTab] = useState<"orders" | "history">("orders");
  const pagerRef = useRef<PagerView>(null);
  const tabIndex = useSharedValue(0);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(tabIndex.value === 0 ? -90 : 90, {
          damping: 20,
          stiffness: 90,
        }),
      },
    ],
  }));

  const switchTab = (tab: "orders" | "history", index: number) => {
    LayoutAnimation.easeInEaseOut();
    setActiveTab(tab);
    pagerRef.current?.setPage(index);
    tabIndex.value = index;
  };

  return (
    <SafeScreen>
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
            paddingVertical: 16,
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "700", color: "#111827" }}>
            My Order
          </Text>
        </View>

        {/* Top Tab Bar */}
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingTop: 8,
            }}
          >
            <Pressable
              onPress={() => switchTab("orders", 0)}
              style={{ width: 160, alignItems: "center", paddingBottom: 12 }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                  color: activeTab === "orders" ? "#111827" : "#9ca3af",
                }}
              >
                My Order
              </Text>
            </Pressable>
            <Pressable
              onPress={() => switchTab("history", 1)}
              style={{ width: 160, alignItems: "center", paddingBottom: 12 }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                  color: activeTab === "history" ? "#111827" : "#9ca3af",
                }}
              >
                History
              </Text>
            </Pressable>
          </View>

          {/* Animated underline indicator */}
          <View style={{ alignItems: "center" }}>
            <Animated.View
              style={[
                {
                  height: 3,
                  width: 80,
                  backgroundColor: "#4338ca",
                  borderRadius: 4,
                  position: "absolute",
                  bottom: 0,
                },
                indicatorStyle,
              ]}
            />
          </View>
          {/* Static bottom border */}
          <View
            style={{ height: 1, backgroundColor: "#f3f4f6", marginTop: 3 }}
          />
        </View>

        {/* Swipeable Pages */}
        <PagerView
          ref={pagerRef}
          style={{ flex: 1 }}
          initialPage={0}
          onPageSelected={(e) => {
            const index = e.nativeEvent.position;
            LayoutAnimation.easeInEaseOut();
            setActiveTab(index === 0 ? "orders" : "history");
            tabIndex.value = index;
          }}
        >
          <View key="orders" style={{ flex: 1 }}>
            <MyOrdersContent />
          </View>
          <View key="history" style={{ flex: 1 }}>
            <HistoryContent />
          </View>
        </PagerView>
      </View>
    </SafeScreen>
  );
};

export default Order;
