import { ReusableDrawer } from "@/components/shared/reusable-drawer";
import { useDrawerStore } from "@/store/drawer-store";
import { Image } from "expo-image";
import { Settings, ShoppingBag, Tag, Truck } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";

const NOTIFICATIONS = [
  {
    id: "1",
    title: "Purchase Completed!",
    description:
      "You have successfully purchased 334 headphones, thank you and wait for your package to arrive ✨",
    time: "2 m ago",
    icon: ShoppingBag,
    color: "bg-blue-50 text-blue-500",
  },
  {
    id: "2",
    title: "Jerremy Send You A Message",
    description: "hello your package has almost arrived, are you at home now?",
    time: "2 m ago",
    type: "message",
    image: "https://placeholder.com/100",
    action: "Reply the message",
  },
  {
    id: "3",
    title: "Flash Sale!",
    description: "Get 20% discount for first transaction in this month! 😍",
    time: "2 m ago",
    icon: Tag,
    color: "bg-green-50 text-green-500",
  },
  {
    id: "4",
    title: "Package Sent",
    description: "Hi your package has been sent from new york",
    time: "10 m ago",
    icon: Truck,
    color: "bg-purple-50 text-purple-500",
  },
];

export const NotificationDrawer = () => {
  const { isNotificationOpen, closeNotification } = useDrawerStore();

  return (
    <ReusableDrawer
      isOpen={isNotificationOpen}
      onClose={closeNotification}
      title="Notification"
      size="full"
      anchor="right"
    >
      <View className="flex-row items-center justify-between mt-2 mb-4">
        <Text className="text-gray-900 font-bold text-lg">Recent</Text>
        <Pressable className="p-2 rounded-full">
          <Settings size={20} color="#6B7280" />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="mb-10">
        {NOTIFICATIONS.map((notif) => {
          const IconComponent = notif.icon;
          return (
            <View
              key={notif.id}
              className="flex-row mb-6 border-b border-gray-50 pb-4"
            >
              <View
                className={`w-12 h-12 rounded-full items-center justify-center ${notif.color || "bg-gray-100"}`}
              >
                {notif.image ? (
                  <Image
                    source={notif.image}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  IconComponent && (
                    <IconComponent
                      size={20}
                      color={notif.color ? undefined : "#6B7280"}
                      className={notif.color?.split(" ")[1]}
                    />
                  )
                )}
              </View>

              <View className="flex-1 ml-4 pt-1">
                <View className="flex-row justify-between mb-1">
                  <Text className="text-gray-900 font-bold text-sm flex-1 mr-2">
                    {notif.title}
                  </Text>
                  <Text className="text-gray-400 text-xs">{notif.time}</Text>
                </View>
                <Text className="text-gray-500 text-xs leading-5">
                  {notif.description}
                </Text>
                {notif.action && (
                  <Pressable className="mt-2">
                    <Text className="text-purple-600 font-bold text-xs">
                      {notif.action}
                    </Text>
                  </Pressable>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </ReusableDrawer>
  );
};
