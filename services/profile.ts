import { UserProfile, UserProfileImage } from "@/types/response-types.";
import { ENDPOINTS } from "@/utils/endpoints";
import apiService from "./api-service";

export const ProfileService = {
  getProfile: async () => {
    const response = await apiService.get<UserProfile>(ENDPOINTS.profile.get);
    return response.data;
  },

  updateProfile: async (data: { name?: string; email?: string }) => {
    const response = await apiService.patch<UserProfile>(
      ENDPOINTS.profile.update,
      data,
    );
    return response;
  },

  uploadProfileImage: async (
    imageUri: string,
    filename: string,
    type: string,
  ) => {
    const formData = new FormData();
    // In React Native, we can append a file to FormData like this:
    formData.append("image", {
      uri: imageUri,
      name: filename,
      type,
    } as any);

    const response = await apiService.postForm<{
      success: boolean;
      message: string;
      data: UserProfileImage;
    }>(ENDPOINTS.profile.uploadImage, formData);

    return response;
  },

  changePassword: async (data: {
    oldPassword?: string;
    newPassword?: string;
  }) => {
    const response = await apiService.patch<{
      success: boolean;
      message: string;
    }>(ENDPOINTS.profile.changePassword, data);
    return response;
  },

  deleteProfileImage: async () => {
    const response = await apiService.delete<{
      success: boolean;
      message: string;
    }>(ENDPOINTS.profile.deleteImage);
    return response;
  },

  addAddress: async (data: any) => {
    const response = await apiService.post<any>(
      ENDPOINTS.profile.address.create,
      data,
    );
    return response;
  },

  updateAddress: async (id: string, data: any) => {
    const response = await apiService.patch<any>(
      ENDPOINTS.profile.address.update(id),
      data,
    );
    return response;
  },
};
