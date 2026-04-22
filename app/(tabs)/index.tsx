import { SafeScreen } from "@/components/safe-screen";
import { CategoryCard, Pagination, ProductCard } from "@/components/shared";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { useTabBar } from "@/context/tab-bar-provider";
import {
  useGetCategories,
  useGetCategoryProducts,
} from "@/services/tanstack-query/queries/use-categories-query";
import { useGetProfile } from "@/services/tanstack-query/queries/use-profile-query";
import { useDrawerStore } from "@/store/drawer-store";
import { Link } from "expo-router";
import { BellIcon, SearchIcon } from "lucide-react-native";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  LayoutAnimation,
  Pressable,
  SectionList,
  Text,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/150";

const HomeCategorySection = ({ category }: { category: any }) => {
  const { data, isLoading } = useGetCategoryProducts(category.slug, 1, 10);

  if (isLoading) {
    return (
      <Box className="py-4 items-center">
        <ActivityIndicator size="small" color="#9333ea" />
      </Box>
    );
  }

  const products = data?.products || [];

  if (products.length === 0) return null;

  return (
    <FlatList
      data={products}
      keyExtractor={(product) => product.id}
      numColumns={2}
      scrollEnabled={false}
      columnWrapperStyle={{
        justifyContent: "space-between",
        marginTop: 12,
      }}
      renderItem={({ item: product }) => (
        <ProductCard
          imgSrc={product.images?.[0]?.imageUrl || PLACEHOLDER_IMAGE}
          isHttpSrc={true}
          name={product.name}
          price={product.minPrice}
          id={product.productId}
        />
      )}
    />
  );
};

const HomeContent = ({ handleScroll }: { handleScroll: any }) => {
  const { data, isLoading } = useGetCategories(1, 5);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#9333ea" />
      </View>
    );
  }

  const categories = data?.categories || [];

  return (
    <SectionList
      sections={categories.map((cat) => ({
        title: cat.name,
        slug: cat.slug,
        data: [cat],
      }))}
      keyExtractor={(item) => item.id}
      stickySectionHeadersEnabled={false}
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingBottom: 120,
      }}
      contentInsetAdjustmentBehavior="automatic"
      onScroll={handleScroll}
      scrollEventThrottle={16}
      renderSectionHeader={({ section }) => (
        <HStack className="justify-between w-full mt-4">
          <Text className="text-[16px] font-bold text-black">
            {section.title}
          </Text>
          <Link href={`/category/${section.slug}`} style={{ minWidth: 50 }}>
            <Text
              className="text-base font-semibold text-purple-500"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              See All
            </Text>
          </Link>
        </HStack>
      )}
      renderItem={({ item }) => <HomeCategorySection category={item} />}
    />
  );
};

const CategoryContent = ({ handleScroll }: { handleScroll: any }) => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetCategories(page, 10);

  const categories = data?.categories || [];
  const totalPages = data?.pagination?.totalPages || 1;

  if (isLoading && categories.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#9333ea" />
      </View>
    );
  }

  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{
        paddingBottom: 120,
      }}
      contentInsetAdjustmentBehavior="automatic"
      onScroll={handleScroll}
      scrollEventThrottle={16}
      ListFooterComponent={
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          isLoading={isLoading}
        />
      }
      renderItem={({ item, index }) => {
        const isLast = index === categories.length - 1;

        return (
          <Box className={`${!isLast ? "mb-6" : ""} px-6`}>
            <CategoryCard
              title={item.name}
              productCount={item.productCount}
              image={PLACEHOLDER_IMAGE}
              slug={item.slug}
              variant={index % 2 === 0 ? "left" : "right"}
            />
          </Box>
        );
      }}
    />
  );
};

const HomeScreen = () => {
  const [currentView, setCurrentView] = useState<"home" | "category">("home");
  const pagerRef = useRef<PagerView>(null);
  const activeIndex = useSharedValue(0);
  const { data: profile, isLoading: isProfileLoading } = useGetProfile();

  const { handleScroll } = useTabBar();
  const { openSearch, openNotification } = useDrawerStore();

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(activeIndex.value === 0 ? -72 : 72, {
            damping: 20,
            stiffness: 90,
          }),
        },
      ],
    };
  });

  const onTabbing = (view: "home" | "category") => {
    LayoutAnimation.easeInEaseOut();
    setCurrentView(view);
    const index = view === "home" ? 0 : 1;
    pagerRef.current?.setPage(index);
    activeIndex.value = index;
  };

  const onPagerSelected = (e: any) => {
    const index = e.nativeEvent.position;
    LayoutAnimation.easeInEaseOut();
    setCurrentView(index === 0 ? "home" : "category");
    activeIndex.value = index;
  };

  return (
    <SafeScreen>
      <View style={{ flex: 1 }}>
        <HStack className="px-4 py-4 justify-between">
          {isProfileLoading ? (
            <HStack className="gap-x-3 items-center">
              <Box className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
              <VStack className="gap-y-1">
                <Box className="w-32 h-5 bg-gray-200 rounded animate-pulse" />
                <Box className="w-24 h-4 bg-gray-100 rounded animate-pulse" />
              </VStack>
            </HStack>
          ) : (
            <HStack className="gap-x-3">
              <Avatar size="md">
                <AvatarFallbackText>{profile?.name}</AvatarFallbackText>
                <AvatarImage
                  source={
                    profile?.userProfileImage
                      ? {
                          uri: profile.userProfileImage.imageUrl,
                        }
                      : require("@/assets/images/user-avatar.jpg")
                  }
                />
              </Avatar>
              <VStack>
                <Text className="text-[18px] text-black font-bold">
                  {profile?.name}
                </Text>
                <Text className="text-sm font-normal text-gray-500">
                  Lets get shopping
                </Text>
              </VStack>
            </HStack>
          )}
          <HStack className="gap-x-2">
            <Pressable onPress={openSearch} className="p-2">
              <SearchIcon size={24} color="black" />
            </Pressable>
            <Pressable onPress={openNotification} className="p-2">
              <BellIcon size={24} color="black" />
            </Pressable>
          </HStack>
        </HStack>

        {/* Tab Headers */}
        <View className="relative">
          <HStack className="px-4 justify-center gap-x-8 py-6">
            <Pressable
              onPress={() => onTabbing("home")}
              className="w-[120px] items-center"
            >
              <Text
                className={`font-base font-semibold ${currentView === "home" ? "text-black" : "text-gray-500"}`}
              >
                Home
              </Text>
            </Pressable>
            <Pressable
              onPress={() => onTabbing("category")}
              className="w-[120px] items-center"
            >
              <Text
                className={`font-base font-semibold ${currentView === "category" ? "text-black" : "text-gray-500"}`}
              >
                Category
              </Text>
            </Pressable>
          </HStack>
          {/* Animated Indicator */}
          <View style={{ alignItems: "center" }}>
            <Animated.View
              style={[
                {
                  height: 2,
                  width: 120,
                  backgroundColor: "#9333ea",
                  position: "absolute",
                  bottom: 16,
                },
                indicatorStyle,
              ]}
            />
          </View>
        </View>

        {/* Swipe Pager */}
        <PagerView
          ref={pagerRef}
          style={{ flex: 1 }}
          initialPage={0}
          onPageSelected={onPagerSelected}
        >
          <View key="1">
            <HomeContent handleScroll={handleScroll} />
          </View>
          <View key="2">
            <CategoryContent handleScroll={handleScroll} />
          </View>
        </PagerView>
      </View>
    </SafeScreen>
  );
};

export default HomeScreen;
