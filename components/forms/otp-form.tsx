import { useForm } from "react-hook-form";
import { useTimer } from "react-timer-hook";

import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Text } from "react-native";
import { OtpInput } from "../form-fields";

type OtpPayload = {
  otp: string;
};

export function OtpForm() {
  const { control, handleSubmit } = useForm<OtpPayload>();

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

  const onSubmit = (data: OtpPayload) => {
    console.log("OTP:", data.otp);
  };

  return (
    <VStack space="xl">
      <OtpInput
        control={control}
        name="otp"
        label="Verification Code"
        helperText="Enter the 4-digit code sent to your email"
        length={4}
        rules={{
          required: "OTP is required",
          minLength: {
            value: 4,
            message: "Must be 4 digits",
          },
        }}
      />

      <Button
        className="rounded-full bg-purple-600"
        onPress={handleSubmit(onSubmit)}
      >
        <ButtonText className="text-white font-semibold">Verify</ButtonText>
      </Button>

      {/* Resend Section */}
      <HStack className="justify-center items-center space-x-1">
        <Text className="text-gray-500">Didn’t receive the code?</Text>

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
