import { SafeScreen } from "@/components/safe-screen";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import PagerView from "react-native-pager-view";

import { AppButton } from "@/components/app-button";
import { OnboardingSlide, PaginationDots } from "@/components/onboarding";

export default function OnboardingScreen() {
  const pagerRef = useRef<PagerView | null>(null);
  const [page, setPage] = useState(0);

  const slides = [
    {
      image: require("@/assets/images/onboarding-one.jpg"),
      title: "Various Collections Of The Latest Products",
      description:
        "Urna amet, suspendisse ullamcorper ac elit diam facilisis cursus vestibulum.",
    },
    {
      image: require("@/assets/images/onboarding-two.jpg"),
      title: "Complete Collection Of Colors And Sizes",
      description:
        "Urna amet, suspendisse ullamcorper ac elit diam facilisis cursus vestibulum.",
    },
    {
      image: require("@/assets/images/onboarding-three.jpg"),
      title: "Find The Most Suitable Outfit For You",
      description:
        "Urna amet, suspendisse ullamcorper ac elit diam facilisis cursus vestibulum.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (page < slides.length - 1) {
        pagerRef.current?.setPage(page + 1);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [page, slides.length]);

  return (
    <SafeScreen>
      <View className="flex-1 px-6 pb-3">
        <View className="mb-2 mt-4 items-end">
          <Pressable onPress={() => router.replace("/(tabs)")}>
            <Text className="text-purple-600 font-semibold">
              Continue as Guest
            </Text>
          </Pressable>
        </View>

        <View className="flex-1">
          <PagerView
            ref={pagerRef}
            style={{ flex: 1 }}
            initialPage={0}
            onPageSelected={(e) => setPage(e.nativeEvent.position)}
          >
            {slides.map((slide, index) => (
              <View key={index} style={{ flex: 1 }}>
                <OnboardingSlide {...slide} />
              </View>
            ))}
          </PagerView>

          <PaginationDots total={slides.length} current={page} />
        </View>

        <View className="mb-8 mt-4">
          <AppButton
            title={page === slides.length - 1 ? "Create Account" : "Next"}
            onPress={() => {
              if (page === slides.length - 1) {
                router.replace("/signup");
              } else {
                const next = page + 1;
                pagerRef.current?.setPage(next);
                setPage(next);
              }
            }}
            height={50}
          />

          <Pressable
            onPress={() => router.replace("/(auth)/login")}
            className="mt-4  flex items-center justify-center"
          >
            <Text className="text-purple-600 font-semibold">
              Already Have an Account
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeScreen>
  );
}
