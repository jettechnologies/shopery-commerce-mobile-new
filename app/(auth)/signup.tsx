import { SignupForm } from "@/components/forms";
import { SafeScreen } from "@/components/safe-screen";
import { VStack } from "@/components/ui/vstack";
import { Text, View } from "react-native";

const Signup = () => {
  return (
    <SafeScreen>
      <View className="w-full h-screen flex px-6 flex-col gap-y-12 py-4">
        <VStack className="gap-y-3">
          <Text className="font-bold text-2xl text-black capitalize">
            Create Account
          </Text>
          <Text className="font-bold text-base text-gray-400 capitalize">
            Start Learning with create your account
          </Text>
        </VStack>
        <SignupForm />
      </View>
    </SafeScreen>
  );
};

export default Signup;
