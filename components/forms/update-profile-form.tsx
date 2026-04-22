import { AppButton } from "@/components/app-button";
import { AppFormInput } from "@/components/form-fields";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { useToastContext } from "@/context/toast-provider";
import {
  useGetProfile,
  useUpdateProfile,
} from "@/services/tanstack-query/queries/use-profile-query";
import {
  UpdateProfileSchema,
  UpdateProfileSchemaType,
} from "@/utils/schemas/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, User } from "lucide-react-native";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

export function UpdateProfileForm() {
  const { openToast } = useToastContext();
  const updateProfileMutation = useUpdateProfile();
  const { data: profile, isLoading: profileLoading } = useGetProfile();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<UpdateProfileSchemaType>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  // ✅ Prefill form with API data
  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name || "",
        email: profile.email || "",
      });
    }
  }, [profile, reset]);

  const values = watch();

  // ✅ True comparison with backend data
  const hasChanges = useMemo(() => {
    if (!profile) return false;

    return (
      (values.name || "") !== (profile.name || "") ||
      (values.email || "") !== (profile.email || "")
    );
  }, [values, profile]);

  const onSubmit = async (data: UpdateProfileSchemaType) => {
    if (!hasChanges) {
      openToast("Info", "info", "No changes to update.");
      return;
    }

    // Only send changed fields
    const payload: UpdateProfileSchemaType = {};

    if ((data.name || "") !== (profile?.name || "")) {
      payload.name = data.name;
    }

    if ((data.email || "") !== (profile?.email || "")) {
      payload.email = data.email;
    }

    await updateProfileMutation.mutateAsync(payload);
  };

  const isLoading =
    isSubmitting || updateProfileMutation.isPending || profileLoading;

  return (
    <VStack space="lg" className="w-full flex-1 justify-between">
      <VStack space="md">
        <AppFormInput
          control={control}
          name="name"
          label="Username"
          placeholder="Enter your username"
          size="lg"
          leftIcon={User}
        />

        <AppFormInput
          control={control}
          name="email"
          label="Email"
          placeholder="Enter your email"
          size="lg"
          leftIcon={Mail}
        />
      </VStack>

      {/* Footer Button */}
      <Box className="mt-6">
        <AppButton
          onPress={handleSubmit(onSubmit)}
          title="Save Changes"
          height={56}
          isLoading={isLoading}
          isDisabled={!hasChanges || isLoading}
        />
      </Box>
    </VStack>
  );
}
