import { useRouter } from "expo-router";
import { ArrowLeft, type LucideIcon } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { Icon } from "./ui/icon";

type AppHeaderProps = {
  title: string;
  showBack?: boolean;
  backIcon?: LucideIcon;
  rightElement?: React.ReactNode;
};

export function AppHeader({
  title,
  showBack = true,
  backIcon = ArrowLeft,
  rightElement,
}: AppHeaderProps) {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200  mb-4">
      <View className="flex-row items-center">
        {showBack && (
          <Pressable
            onPress={() => router.back()}
            className="mr-3 p-2 rounded-full active:bg-gray-100"
          >
            <Icon as={backIcon} size="xl" color="black" />
          </Pressable>
        )}
      </View>

      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-bold text-black capitalize">{title}</Text>
      </View>

      <View>{rightElement}</View>
    </View>
  );
}
