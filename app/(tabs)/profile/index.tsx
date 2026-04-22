import { SafeScreen } from "@/components/safe-screen";
import { useAuthStore } from "@/store/auth-store";
import { router } from "expo-router";
import {
  Bell,
  ChevronRight,
  Globe,
  HelpCircle,
  Lock,
  LogOut,
  MapPin,
  ShieldAlert,
  ShieldCheck,
  User,
} from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useState } from "react";
import { LogoutModal } from "@/components/modal";

interface SettingItemProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  rightText?: string;
  isDestructive?: boolean;
}

const SettingItem = ({
  icon,
  label,
  onPress,
  rightText,
  isDestructive,
}: SettingItemProps) => (
  <Pressable
    onPress={onPress}
    className="flex-row items-center justify-between py-4 px-4 bg-white mb-2 rounded-2xl border border-gray-100"
  >
    <View className="flex-row items-center">
      {icon}
      <Text
        className={`ml-4 font-semibold text-base ${
          isDestructive ? "text-red-500" : "text-gray-900"
        }`}
      >
        {label}
      </Text>
    </View>
    <View className="flex-row items-center">
      {rightText && (
        <Text className="text-gray-400 mr-2 text-sm">{rightText}</Text>
      )}
      <ChevronRight size={20} color={isDestructive ? "#ef4444" : "#9ca3af"} />
    </View>
  </Pressable>
);

const SectionTitle = ({ title }: { title: string }) => (
  <Text className="text-lg font-bold text-gray-900 mb-3 mt-4 ml-1">
    {title}
  </Text>
);

const Profile = () => {
  const { logout } = useAuthStore();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    logout();
    router.replace("/(auth)/login");
    setShowLogoutModal(false);
  };

  return (
    <SafeScreen>
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-center px-5 py-4">
          <Text className="text-[17px] font-bold text-gray-900">Settings</Text>
        </View>

        <ScrollView
          className="flex-1 px-5 pt-2"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* General Section */}
          <SectionTitle title="General" />

          <SettingItem
            icon={<User size={22} color="#374151" />}
            label="Edit Profile"
            onPress={() => router.push("/profile/edit-profile")}
          />
          <SettingItem
            icon={<Lock size={22} color="#374151" />}
            label="Change Password"
            onPress={() => router.push("/profile/change-password")}
          />
          <SettingItem
            icon={<MapPin size={22} color="#374151" />}
            label="Shipping Address"
            onPress={() => router.push("/profile/addresses")}
          />
          <SettingItem
            icon={<Bell size={22} color="#374151" />}
            label="Notifications"
            onPress={() => {}}
          />
          <SettingItem
            icon={<ShieldCheck size={22} color="#374151" />}
            label="Security"
            onPress={() => {}}
          />
          <SettingItem
            icon={<Globe size={22} color="#374151" />}
            label="Language"
            rightText="English"
            onPress={() => {}}
          />

          {/* Preferences Section */}
          <SectionTitle title="Preferences" />

          <SettingItem
            icon={<ShieldAlert size={22} color="#374151" />}
            label="Legal and Policies"
            onPress={() => {}}
          />
          <SettingItem
            icon={<HelpCircle size={22} color="#374151" />}
            label="Help & Support"
            onPress={() => {}}
          />
          <SettingItem
            icon={<LogOut size={22} color="#ef4444" />}
            label="Logout"
             isDestructive
             onPress={() => setShowLogoutModal(true)}
           />
         </ScrollView>

         <LogoutModal
           isVisible={showLogoutModal}
           onClose={() => setShowLogoutModal(false)}
           onConfirm={handleLogout}
         />
       </View>
    </SafeScreen>
  );
};

export default Profile;
