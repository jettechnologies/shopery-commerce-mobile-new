import { withLayoutContext } from "expo-router";

import { TabBarProvider } from "@/context/tab-bar-provider";
import {
  createNativeBottomTabNavigator,
  NativeBottomTabNavigationEventMap,
  NativeBottomTabNavigationOptions,
} from "@bottom-tabs/react-navigation";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";

export default function TabLayout() {
  const BottomTabNavigator = createNativeBottomTabNavigator().Navigator;

  const Tabs = withLayoutContext<
    NativeBottomTabNavigationOptions,
    typeof BottomTabNavigator,
    TabNavigationState<ParamListBase>,
    NativeBottomTabNavigationEventMap
  >(BottomTabNavigator);

  return (
    // <TabBarProvider>
    //   <Tabs
    //     screenOptions={{
    //       tabBarActiveTintColor: "#5B5BD6",
    //       headerShown: false,
    //       tabBarButton: HapticTab,

    //       tabBarBackground: () => (
    //         <BlurView
    //           intensity={80}
    //           tint="dark"
    //           style={StyleSheet.absoluteFill}
    //         />
    //       ),
    //     }}
    // tabBar={(props) => (
    //   <AnimatedTabBar>
    //     <BottomTabBar {...props} />
    //   </AnimatedTabBar>
    // )}
    //   >
    //     <Tabs.Screen
    //       name="index"
    //       options={{
    //         title: "Home",
    //         tabBarIcon: ({ color }) => <HomeIcon size={28} color={color} />,
    //       }}
    //     />
    //     <Tabs.Screen
    //       name="order"
    //       options={{
    //         title: "My Order",
    //         tabBarIcon: ({ color }) => (
    //           <PackageOpenIcon size={28} color={color} />
    //         ),
    //       }}
    //     />
    //     <Tabs.Screen
    //       name="favorite"
    //       options={{
    //         title: "Favorite",
    //         tabBarIcon: ({ color }) => <HeartIcon size={28} color={color} />,
    //       }}
    //     />
    //     <Tabs.Screen
    //       name="profile"
    //       options={{
    //         title: "Profile",
    //         tabBarIcon: ({ color }) => (
    //           <UserRoundIcon size={28} color={color} />
    //         ),
    //       }}
    //     />
    //   </Tabs>
    // </TabBarProvider>

    <TabBarProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#5B5BD6",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: () => ({ sfSymbol: "house.fill" }),
          }}
        />

        <Tabs.Screen
          name="order"
          options={{
            title: "My Order",
            tabBarIcon: () => ({ sfSymbol: "shippingbox.fill" }),
          }}
        />

        <Tabs.Screen
          name="favorite"
          options={{
            title: "Favorite",
            tabBarIcon: () => ({ sfSymbol: "heart.fill" }),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: () => ({ sfSymbol: "person.fill" }),
          }}
        />
      </Tabs>
    </TabBarProvider>
  );
}
