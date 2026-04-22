import { useToastContext } from "@/context/toast-provider";
import { ProfileService } from "@/services/profile";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query-keys";

export const useGetProfile = () => {
  return useQuery({
    queryKey: QUERY_KEYS.profile.base(),
    queryFn: () => ProfileService.getProfile(),
  });
};

export const useUpdateProfile = () => {
  const { openToast } = useToastContext();
  return useMutation({
    mutationFn: (data: { name?: string; email?: string }) =>
      ProfileService.updateProfile(data),
    meta: {
      invalidatesQuery: QUERY_KEYS.profile.base(),
      errorMessage: "Update Profile failed",
    },
    onSuccess: (data) => {
      openToast(data.message || "Profile updated successfully", "success");
    },
  });
};

export const useUploadProfileImage = () => {
  const { openToast } = useToastContext();
  return useMutation({
    mutationFn: ({
      uri,
      name,
      type,
    }: {
      uri: string;
      name: string;
      type: string;
    }) => ProfileService.uploadProfileImage(uri, name, type),
    meta: {
      invalidatesQuery: QUERY_KEYS.profile.base(),
      errorMessage: "Profile Image upload failed",
    },
    onSuccess: (data) => {
      openToast(
        data.message || "Profile Image uploaded successfully",
        "success",
      );
    },
  });
};

export const useDeleteProfileImage = () => {
  const { openToast } = useToastContext();

  return useMutation({
    mutationFn: () => ProfileService.deleteProfileImage(),
    meta: {
      invalidatesQuery: QUERY_KEYS.profile.base(),
      errorMessage: "Profile Image delete failed",
    },
    onSuccess: (data) => {
      openToast(
        data.message || "Profile Image deleted successfully",
        "success",
      );
    },
  });
};

export const useChangePassword = () => {
  const { openToast } = useToastContext();
  return useMutation({
    mutationFn: (data: { oldPassword?: string; newPassword?: string }) =>
      ProfileService.changePassword(data),
    meta: {
      invalidatesQuery: QUERY_KEYS.profile.base(),
      errorMessage: "Password Change failed",
    },
    onSuccess: (data) => {
      openToast(data.message || "Password change successfully", "success");
    },
  });
};

export const useCreateAddress = () => {
  const { openToast } = useToastContext();
  return useMutation({
    mutationFn: (data: any) => ProfileService.addAddress(data),
    meta: {
      invalidatesQuery: QUERY_KEYS.profile.base(),
      errorMessage: "Failed to add address",
    },
    onSuccess: (data) => {
      openToast(data.message || "Address added successfully", "success");
    },
  });
};

export const useUpdateAddress = () => {
  const { openToast } = useToastContext();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      ProfileService.updateAddress(id, data),
    meta: {
      invalidatesQuery: QUERY_KEYS.profile.base(),
      errorMessage: "Failed to update address",
    },
    onSuccess: (data) => {
      openToast(data.message || "Address updated successfully", "success");
    },
  });
};
