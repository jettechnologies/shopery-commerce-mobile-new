import { FloatingTabBar } from "@/components/shared/floating-tab-bar";
import { TabBarProvider } from "@/context/tab-bar-provider";
import {
  createNativeBottomTabNavigator,
  NativeBottomTabNavigationEventMap,
  NativeBottomTabNavigationOptions,
} from "@bottom-tabs/react-navigation";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { Tabs, withLayoutContext } from "expo-router";

/**
 * NativeTabLayout:
 * Uses @bottom-tabs/react-navigation for native iOS 18+ and Android bottom tabs.
 */
function NativeTabLayout() {
  const BottomTabNavigator = createNativeBottomTabNavigator().Navigator;

  const NativeTabs = withLayoutContext<
    NativeBottomTabNavigationOptions,
    typeof BottomTabNavigator,
    TabNavigationState<ParamListBase>,
    NativeBottomTabNavigationEventMap
  >(BottomTabNavigator);

  return (
    <NativeTabs
      screenOptions={{
        tabBarActiveTintColor: "#5B5BD6",
      }}
    >
      <NativeTabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: () => ({ sfSymbol: "house.fill" }),
        }}
      />
      <NativeTabs.Screen
        name="order"
        options={{
          title: "My Order",
          tabBarIcon: () => ({ sfSymbol: "shippingbox.fill" }),
        }}
      />
      <NativeTabs.Screen
        name="favorite"
        options={{
          title: "Favorite",
          tabBarIcon: () => ({ sfSymbol: "heart.fill" }),
        }}
      />
      <NativeTabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: () => ({ sfSymbol: "person.fill" }),
        }}
      />
    </NativeTabs>
  );
}

/**
 * StandardTabLayout:
 * Replicates the floating pill-shaped design from the provided image.
 * Uses standard expo-router Tabs with a custom tabBar component.
 */
function StandardTabLayout() {
  return (
    <Tabs
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: "My Order",
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: "Favorite",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
}

// Default export uses the StandardTabLayout to show the new floating design.
// Both are wrapped in TabBarProvider for scroll-based visibility handling.
export default function TabLayout() {
  return (
    <TabBarProvider>
      <StandardTabLayout />
      {/* To switch back to native tabs, uncomment the line below and comment out StandardTabLayout */}
      {/* <NativeTabLayout /> */}
    </TabBarProvider>
  );
}
