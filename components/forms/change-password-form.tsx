import { AppButton } from "@/components/app-button";
import { AppFormInput } from "@/components/form-fields";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { useToastContext } from "@/context/toast-provider";
import { useChangePassword } from "@/services/tanstack-query/queries/use-profile-query";
import { useAuthStore } from "@/store/auth-store";
import { ChangePasswordSchema, ChangePasswordType } from "@/utils/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Lock } from "lucide-react-native";
import { useForm } from "react-hook-form";

export function ChangePasswordForm() {
  const router = useRouter();
  const { openToast } = useToastContext();
  const { logout } = useAuthStore();
  const changePasswordMutation = useChangePassword();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ChangePasswordType>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ChangePasswordType) => {
    try {
      await changePasswordMutation.mutateAsync({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });

      router.push("/(auth)/login");
    } catch (err) {
      console.log(err);
    }
  };

  const isLoading = isSubmitting || changePasswordMutation.isPending;

  return (
    <VStack space="lg" className="w-full">
      <AppFormInput
        control={control}
        name="oldPassword"
        label="Old Password"
        placeholder="Enter current password"
        type="password"
        size="lg"
        leftIcon={Lock}
      />

      <AppFormInput
        control={control}
        name="newPassword"
        label="New Password"
        placeholder="Enter new password"
        type="password"
        size="lg"
        leftIcon={Lock}
      />

      <AppFormInput
        control={control}
        name="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm your new password"
        type="password"
        size="lg"
        leftIcon={Lock}
      />

      <Box className="mt-6">
        <AppButton
          onPress={handleSubmit(onSubmit)}
          title="Change Now"
          height={50}
          isLoading={isLoading}
        />
      </Box>
    </VStack>
  );
}
