import { VStack } from "@/components/ui/vstack";
import { SignupSchema, SignupType } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import { Lock, Mail, User2 } from "lucide-react-native";
import { useForm } from "react-hook-form";
import { Text } from "react-native";
import { AppButton } from "../app-button";
import { AppFormInput } from "../form-fields";
import { Box } from "../ui/box";

export function SignupForm() {
  const { control, handleSubmit } = useForm<SignupType>({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = async (data: SignupType) => {
    // Save email for verification screen
    await AsyncStorage.setItem("verify_email", data.email);

    router.push("/(auth)/verify-email");
    console.log("Signup Payload:", data);
  };

  return (
    <VStack space="md" className="w-full">
      <AppFormInput
        control={control}
        name="name"
        label="Username"
        placeholder="John Doe"
        leftIcon={User2}
        size="lg"
      />

      <AppFormInput
        control={control}
        name="email"
        label="Email"
        placeholder="john@example.com"
        leftIcon={Mail}
        size="lg"
      />

      <AppFormInput
        control={control}
        name="password"
        label="Password"
        type="password"
        leftIcon={Lock}
        placeholder="Create your Password"
        size="lg"
      />

      <Box className="mt-8">
        <AppButton
          onPress={handleSubmit(onSubmit)}
          title="Create Account"
          height={50}
        />

        <Text className="text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <Link href="/(auth)/login">
            <Text className="text-purple-500">Login</Text>
          </Link>
        </Text>
      </Box>
    </VStack>
  );
}
