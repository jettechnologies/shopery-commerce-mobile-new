import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from "@/components/ui/actionsheet";

import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { useState } from "react";
import { Text } from "react-native";

import { useForm } from "react-hook-form";
import { useTimer } from "react-timer-hook";

import { Lock, Mail } from "lucide-react-native";

import {
  ForgotEmailSchema,
  ForgotEmailType,
  NewPasswordSchema,
  NewPasswordType,
  OtpSchema,
  OtpType,
} from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppButton } from "../app-button";
import { AppFormInput, OtpInput } from "../form-fields";

type ForgotPasswordSheetProps = {
  isOpen: boolean;
  onClose: () => void;
};

type EmailPayload = {
  email: string;
};

type OtpPayload = {
  otp: string;
};

type ResetPayload = {
  password: string;
  confirmPassword: string;
};

export function ForgotPasswordActionsheet({
  isOpen,
  onClose,
}: ForgotPasswordSheetProps) {
  const [step, setStep] = useState<"email" | "otp" | "reset">("reset");
  const [clientEmail, setClientEmail] = useState<string | null>(null);

  /* ---------------- EMAIL FORM ---------------- */
  const { control: emailControl, handleSubmit: handleEmailSubmit } =
    useForm<ForgotEmailType>({
      resolver: zodResolver(ForgotEmailSchema),
    });

  const onSubmitEmail = (data: EmailPayload) => {
    console.log("Send reset email:", data.email);
    setClientEmail(data.email);
    setStep("otp");
  };

  /* ---------------- OTP FORM ---------------- */
  const { control: otpControl, handleSubmit: handleOtpSubmit } =
    useForm<OtpType>({
      resolver: zodResolver(OtpSchema),
    });

  const onSubmitOtp = (data: OtpPayload) => {
    console.log("Verify OTP:", data.otp);
    setStep("reset");
  };

  /* ---------------- RESET FORM ---------------- */
  const { control: resetControl, handleSubmit: handleResetSubmit } =
    useForm<NewPasswordType>({
      resolver: zodResolver(NewPasswordSchema),
    });

  const onSubmitReset = (data: ResetPayload) => {
    console.log("Reset Password:", data);

    if (data.password !== data.confirmPassword) {
      return alert("Passwords do not match");
    }

    onClose();
    setStep("email");
  };

  const time = new Date();
  time.setSeconds(time.getSeconds() + 900);

  const { seconds, minutes, isRunning } = useTimer({
    expiryTimestamp: time,
    autoStart: true,
  });

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent className="px-6 pb-8">
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        {step === "email" && (
          <VStack space="xl" className="mt-4 w-full">
            <Text className="text-2xl font-bold">Forgot Password</Text>
            <Text className="text-gray-400">
              Enter your email to receive a verification code
            </Text>

            <AppFormInput
              control={emailControl}
              name="email"
              label="Email"
              placeholder="john@example.com"
              size="lg"
              leftIcon={Mail}
            />

            <AppButton
              onPress={handleEmailSubmit(onSubmitEmail)}
              title="Send Code"
              height={50}
            />
          </VStack>
        )}

        {step === "otp" && (
          <VStack space="xl" className="mt-4 w-full">
            <Text className="text-2xl font-bold">Verify Code</Text>

            <OtpInput control={otpControl} name="otp" length={4} />

            <AppButton
              title="Verify Code"
              onPress={handleOtpSubmit(onSubmitOtp)}
              height={50}
            />

            <HStack className="justify-center">
              {isRunning && (
                <Text className="text-gray-400">
                  Expires in {minutes}:{seconds.toString().padStart(2, "0")}
                </Text>
              )}
            </HStack>
          </VStack>
        )}

        {step === "reset" && (
          <VStack space="xl" className="mt-4 w-full">
            <Text className="text-2xl font-bold">Create New Password</Text>

            <AppFormInput
              control={resetControl}
              name="password"
              label="New Password"
              type="password"
              size="lg"
              leftIcon={Lock}
              placeholder="Enter new password"
            />

            <AppFormInput
              control={resetControl}
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              size="lg"
              leftIcon={Lock}
              placeholder="Re-enter password"
            />

            <AppButton
              title="Reset Password"
              onPress={handleResetSubmit(onSubmitReset)}
              height={50}
            />
          </VStack>
        )}
      </ActionsheetContent>
    </Actionsheet>
  );
}
