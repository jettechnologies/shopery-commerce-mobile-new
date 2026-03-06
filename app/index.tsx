import { getAsyncStorageItem } from "@/utils/libs";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const isOnboarded = await getAsyncStorageItem<boolean>("onboarding");

        if (isOnboarded) {
          router.replace("/(auth)/login");
        } else {
          router.replace("/(onboarding)");
        }
      } catch (err) {
        console.error("Error checking onboarding:", err);
        router.replace("/(onboarding)");
      } finally {
        setLoading(false);
      }
    };

    checkOnboarding();
  }, [router]);

  if (loading) return null;

  return null;
}

// import { getAsyncStorageItem } from "@/utils/libs";
// import { Redirect, router } from "expo-router";
// import { useEffect } from "react";

// export default function Index() {
//   useEffect(() => {
//     const loadEmail = async () => {
//       const isOnboarded = await getAsyncStorageItem<boolean>("onboarding");

//       isOnboarded  ? router.replace("/(auth)/login") : router.replace("/(onboarding)");
//     };

//     loadEmail();
//   }, []);

//   return <Redirect href="/(onboarding)" />;
// }
