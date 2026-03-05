import { VStack } from "@/components/ui/vstack";
import { Lock, Mail } from "lucide-react-native";
import { useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

import { LoginSchema, LoginType } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { useState } from "react";
import { ForgotPasswordActionsheet } from "../action-sheet";
import { AppButton } from "../app-button";
import { AppFormInput } from "../form-fields";
import { Box } from "../ui/box";

export function LoginForm() {
  const { control, handleSubmit } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  });
  const [isForgetPassowrdActive, setIsForgetPassowrdActive] = useState(false);

  const onSubmit = (data: LoginType) => {
    console.log("Login Payload:", data);
  };

  return (
    <VStack space="lg" className="w-full">
      <AppFormInput
        control={control}
        name="email"
        label="Email"
        placeholder="john@example.com"
        size="lg"
        leftIcon={Mail}
      />

      <AppFormInput
        control={control}
        name="password"
        label="Password"
        type="password"
        size="lg"
        leftIcon={Lock}
        placeholder="Enter account password"
      />

      <View className="items-end">
        <Pressable onPress={() => setIsForgetPassowrdActive(true)}>
          <Text className="text-purple-600 font-medium mt-2">
            Forgot Password?
          </Text>
        </Pressable>
      </View>

      <Box className="mt-6">
        <AppButton
          onPress={handleSubmit(onSubmit)}
          title="Sign In"
          height={50}
        />
        <Text className="text-center text-gray-500 mt-4">
          Dont have an account?{" "}
          <Link href="/(auth)/signup">
            <Text className="text-purple-500">Signup</Text>
          </Link>
        </Text>
      </Box>

      {isForgetPassowrdActive && (
        <ForgotPasswordActionsheet
          isOpen={isForgetPassowrdActive}
          onClose={() => setIsForgetPassowrdActive(false)}
        />
      )}
    </VStack>
  );
}
