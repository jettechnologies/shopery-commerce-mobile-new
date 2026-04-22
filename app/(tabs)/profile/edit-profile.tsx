import { AppHeader } from "@/components/app-header";
import { UpdateProfileForm } from "@/components/forms/update-profile-form";
import { SafeScreen } from "@/components/safe-screen";
import { useToastContext } from "@/context/toast-provider";
import {
  useGetProfile,
  useUploadProfileImage,
} from "@/services/tanstack-query/queries/use-profile-query";
import * as ImagePicker from "expo-image-picker";
import { User } from "lucide-react-native";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  View,
} from "react-native";

export default function EditProfile() {
  const { openToast } = useToastContext();
  const { data: profile, isLoading } = useGetProfile();
  const uploadImageMutation = useUploadProfileImage();

  const handlePickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      openToast(
        "Permission Required",
        "error",
        "Permission to access the media library is required.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "livePhotos"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      const filename =
        asset.fileName || asset.uri.split("/").pop() || "profile.jpg";
      const type = asset.mimeType || "image/jpeg";

      await uploadImageMutation.mutateAsync({
        uri: asset.uri,
        name: filename,
        type,
      });
    }
  };

  return (
    <SafeScreen>
      <View className="flex-1 bg-white">
        <AppHeader title="Edit Profile" />

        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#4338ca" />
          </View>
        ) : (
          <ScrollView
            className="flex-1 px-5"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            {/* Avatar Section */}
            <View className="items-center mt-6 mb-8">
              <Pressable
                onPress={handlePickImage}
                className="relative overflow-hidden rounded-full border-4 border-gray-50 bg-gray-100"
                style={{ width: 110, height: 110 }}
              >
                {profile?.userProfileImage?.imageUrl ? (
                  <Image
                    source={{ uri: profile.userProfileImage.imageUrl }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                  />
                ) : (
                  <View className="flex-1 items-center justify-center">
                    <User size={40} color="#9ca3af" />
                  </View>
                )}
                {uploadImageMutation.isPending && (
                  <View className="absolute inset-0 bg-black/30 items-center justify-center">
                    <ActivityIndicator size="small" color="#fff" />
                  </View>
                )}
              </Pressable>
            </View>

            {/* Form */}
            <UpdateProfileForm />
          </ScrollView>
        )}
      </View>
    </SafeScreen>
  );
}
