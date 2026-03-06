import { Mail } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { AppHeader } from "@/components/app-header";
import { OtpForm } from "@/components/forms";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { getAsyncStorageItem } from "@/utils/libs";

import { SafeScreen } from "../safe-screen";

const VerifyEmail = () => {
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const loadEmail = async () => {
      const email = await getAsyncStorageItem<string>("verify_email");
      setUserEmail(email ?? "N/A");
    };

    loadEmail();
  }, []);

  return (
    <SafeScreen>
      <AppHeader title="Verification" />

      <View className="w-full h-screen flex px-6 flex-col gap-y-6">
        <VStack className="gap-y-3 items-center">
          <Box className="w-[150px] h-[150px] rounded-full bg-purple-500/10 flex items-center justify-center">
            <Box className="w-[110px] h-[110px] rounded-full bg-purple-500 flex items-center justify-center">
              <Mail size={30} color="white" />
            </Box>
          </Box>

          <Text className="font-bold text-2xl text-black capitalize">
            Verification Code
          </Text>

          <Text className="font-bold text-base text-gray-400 text-center">
            We have sent the verification code to{" "}
            <Text className="font-bold text-black">{userEmail}</Text>
          </Text>
        </VStack>

        <OtpForm email={userEmail} />
      </View>
    </SafeScreen>
  );
};

export default VerifyEmail;
