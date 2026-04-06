import { useRouter } from "expo-router";
import { ArrowLeft, ChevronLeft } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { Icon } from "./ui/icon";

type AppHeaderProps = {
  title: string;
  showBack?: boolean;
  rightElement?: React.ReactNode;
  variant?: "primary" | "secondary";
};

export function AppHeader({
  title,
  showBack = true,
  rightElement,
  variant = "primary",
}: AppHeaderProps) {
  const router = useRouter();
  const backIcon = variant === "primary" ? ArrowLeft : ChevronLeft;

  const hasBorder = variant === "primary";

  return (
    <View
      className={`flex-row items-center justify-between px-4 py-3 ${hasBorder ? "border-b border-gray-200 mt-4 " : "border-b-0"}`}
    >
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
