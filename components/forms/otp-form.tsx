import { useForm } from "react-hook-form";
import { useTimer } from "react-timer-hook";

import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import {
  useResendVerification,
  useVerifyEmail,
} from "@/services/tanstack-query/mutations";
import { OtpSchema, OtpType } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Text } from "react-native";
import { AppButton } from "../app-button";
import { OtpInput } from "../form-fields";

export function OtpForm({ email }: { email: string }) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    resetField,
  } = useForm<OtpType>({
    resolver: zodResolver(OtpSchema),
  });

  const { mutateAsync: verifyEmail, isPending: verifying } = useVerifyEmail();
  const { mutateAsync: resendVerification, isPending: resending } =
    useResendVerification();

  const time = new Date();
  time.setSeconds(time.getSeconds() + 120);

  const { seconds, minutes, restart, isRunning } = useTimer({
    expiryTimestamp: time,
    autoStart: true,
  });

  const handleResend = async () => {
    try {
      await resendVerification({ email });

      resetField("otp");

      const newExpiry = new Date(Date.now() + 2 * 60 * 1000);
      restart(newExpiry);
    } catch (error) {
      console.error("Failed to resend OTP:", error);
    }
  };

  const onSubmit = async (data: OtpType) => {
    try {
      await verifyEmail({ email, otp: data.otp });

      router.push("/(tabs)");
    } catch (error: any) {
      console.log(error.message, "error");
    }
  };

  return (
    <VStack space="xl">
      <OtpInput control={control} name="otp" length={4} />

      <AppButton
        title="Verify"
        onPress={handleSubmit(onSubmit)}
        isLoading={verifying || isSubmitting}
      />

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
            {resending ? "Resending..." : "Resend"}
          </Text>
        )}
      </HStack>
    </VStack>
  );
}
