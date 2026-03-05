import { LoginForm } from "@/components/forms";
import { SafeScreen } from "@/components/safe-screen";
import { VStack } from "@/components/ui/vstack";
import { Text, View } from "react-native";

const Login = () => {
  return (
    <SafeScreen>
      <View className="w-full h-screen flex px-6 flex-col gap-y-12">
        <VStack className="gap-y-3">
          <Text className="font-bold text-2xl text-black capitalize">
            Login Account
          </Text>
          <Text className="font-bold text-base text-gray-400 capitalize">
            Please login with registered account
          </Text>
        </VStack>
        <LoginForm />
      </View>
    </SafeScreen>
  );
};

export default Login;
