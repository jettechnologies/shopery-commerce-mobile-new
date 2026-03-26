import { Tabs } from "expo-router";

import { HapticTab } from "@/components/haptic-tab";
import { AnimatedTabBar } from "@/components/shared";
import { TabBarProvider } from "@/context/tab-bar-provider";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import {
  HeartIcon,
  HomeIcon,
  PackageOpenIcon,
  UserRoundIcon,
} from "lucide-react-native";

export default function TabLayout() {
  return (
    <TabBarProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#5B5BD6",
          headerShown: false,
          tabBarButton: HapticTab,
        }}
        tabBar={(props) => (
          <AnimatedTabBar>
            <BottomTabBar {...props} />
          </AnimatedTabBar>
        )}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <HomeIcon size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="order"
          options={{
            title: "My Order",
            tabBarIcon: ({ color }) => (
              <PackageOpenIcon size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="favorite"
          options={{
            title: "Favorite",
            tabBarIcon: ({ color }) => <HeartIcon size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <UserRoundIcon size={28} color={color} />
            ),
          }}
        />
      </Tabs>
    </TabBarProvider>
  );
}
