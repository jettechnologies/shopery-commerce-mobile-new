import { useForm } from "react-hook-form";
import { useTimer } from "react-timer-hook";

import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { OtpSchema, OtpType } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Text } from "react-native";
import { AppButton } from "../app-button";
import { OtpInput } from "../form-fields";

export function OtpForm() {
  const { control, handleSubmit } = useForm<OtpType>({
    resolver: zodResolver(OtpSchema),
  });

  const time = new Date();
  time.setSeconds(time.getSeconds() + 120);

  const { seconds, minutes, restart, isRunning } = useTimer({
    expiryTimestamp: time,
    autoStart: true,
  });

  const handleResend = () => {
    console.log("Resending OTP...");

    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + 60);
    restart(newTime);
  };

  const onSubmit = (data: OtpType) => {
    console.log("OTP:", data.otp);
    router.push("/(tabs)");
  };

  return (
    <VStack space="xl">
      <OtpInput control={control} name="otp" length={4} />

      <AppButton title="Verify" onPress={handleSubmit(onSubmit)} />

      <HStack className="justify-center items-center space-x-1">
        <Text className="text-gray-500 mr-2">Didn’t receive the code?</Text>

        {isRunning ? (
          <Text className="text-gray-400 font-medium">
            Resend in {minutes}:{seconds.toString().padStart(2, "0")}
          </Text>
        ) : (
          <Text
            className="text-purple-600 font-semibold"
            onPress={handleResend}
          >
            Resend
          </Text>
        )}
      </HStack>
    </VStack>
  );
}
