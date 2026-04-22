import { ChangePasswordForm } from "@/components/forms";
import { SafeScreen } from "@/components/safe-screen";
import { router } from "expo-router";
import { ArrowLeft, Info } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function ChangePassword() {
  return (
    <SafeScreen>
      <View className="flex-1 bg-white pt-2">
        {/* Header */}
        <View className="flex-row items-center px-5 py-4">
          <Pressable onPress={() => router.back()} className="mr-4">
            <ArrowLeft size={24} color="#111827" />
          </Pressable>
          <Text className="text-xl font-bold text-gray-900 mx-auto pr-8">
            Change Password
          </Text>
        </View>

        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 20, paddingBottom: 40 }}
        >
          {/* Warning Message */}
          <View className="flex-row items-start p-4 bg-amber-50 rounded-2xl border border-amber-100 mb-8">
            <Info size={20} color="#d97706" style={{ marginTop: 2 }} />
            <View className="flex-1 ml-3">
              <Text className="text-amber-800 font-bold text-base mb-1">
                Important Security Note
              </Text>
              <Text className="text-amber-700/80 leading-5 font-medium">
                Changing your password will automatically log you out of all
                active sessions for security. You will need to sign in again
                with your new credentials.
              </Text>
            </View>
          </View>

          {/* Form */}
          <ChangePasswordForm />
        </ScrollView>
      </View>
    </SafeScreen>
  );
}
