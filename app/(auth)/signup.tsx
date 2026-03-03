import { SafeScreen } from "@/components/safe-screen";
import { Text, View } from "react-native";

const Signup = () => {
  return (
    <SafeScreen>
      <View className="bg-white w-full h-screen flex items-center justify-center">
        <Text className="text-red-500 text-lg font-medium">Signup</Text>
      </View>
    </SafeScreen>
  );
};

export default Signup;
