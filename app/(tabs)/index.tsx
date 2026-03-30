import { SafeScreen } from "@/components/safe-screen";
import { CategoryCard, ProductCard } from "@/components/shared";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { useTabBar } from "@/context/tab-bar-provider";
import { CATEGORY_DATA, CATEGORY_PRODUCTS_DATA } from "@/data";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Link } from "expo-router";
import { BellIcon, SearchIcon } from "lucide-react-native";
import { useState } from "react";
import {
  FlatList,
  LayoutAnimation,
  Pressable,
  SectionList,
  Text,
  View,
} from "react-native";

const HomeScreen = () => {
  const [currentView, setCurrentView] = useState<"home" | "category">("home");

  const tabBarHeight = useBottomTabBarHeight();
  const { handleScroll, hidden } = useTabBar();

  return (
    <SafeScreen>
      <View>
        <HStack className="px-4 py-4 justify-between">
          <HStack className="gap-x-3">
            <Avatar size="md">
              <AvatarFallbackText>Jane Doe</AvatarFallbackText>
              <AvatarImage
                source={require("@/assets/images/user-avatar.jpg")}
              />
            </Avatar>
            <VStack>
              <Text className="text-[18px] text-black font-bold">Hi John</Text>
              <Text className="text-sm font-normal text-gray-500">
                Lets get shopping
              </Text>
            </VStack>
          </HStack>
          <HStack className="gap-x-2">
            <Pressable className="p-2">
              <SearchIcon size={24} color="black" />
            </Pressable>
            <Pressable className="p-2">
              <BellIcon size={24} color="black" />
            </Pressable>
          </HStack>
        </HStack>
        <HStack className="px-4 justify-center gap-x-8 py-6">
          <Pressable
            onPress={() => {
              LayoutAnimation.easeInEaseOut();
              setCurrentView("home");
            }}
            className="w-[120px] flex flex-column items-center"
          >
            <Text
              className={`font-base font-semibold ${currentView === "home" ? "text-black" : "text-gray-500"}`}
            >
              Home
            </Text>
            {currentView === "home" && (
              <Box className="mt-2 w-[100px] h-0.5 bg-purple-600" />
            )}
          </Pressable>
          <Pressable
            onPress={() => {
              LayoutAnimation.easeInEaseOut();
              setCurrentView("category");
            }}
            className="w-[120px] flex flex-column items-center"
          >
            <Text
              className={`font-base font-semibold ${currentView === "category" ? "text-black" : "text-gray-500"}`}
            >
              Category
            </Text>
            {currentView === "category" && (
              <Box className="mt-2 w-[100px] h-0.5 bg-purple-600" />
            )}
          </Pressable>
        </HStack>
        {currentView === "home" ? (
          <SectionList
            sections={CATEGORY_PRODUCTS_DATA.map((item) => ({
              title: item.category.name,
              slug: item.category.slug,
              data: [item],
            }))}
            keyExtractor={(item) => item.category.slug}
            stickySectionHeadersEnabled={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingBottom: !hidden ? tabBarHeight + 60 : 0,
            }}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            renderSectionHeader={({ section }) => (
              <HStack className="justify-between w-full mt-4">
                <Text className="text-[16px] font-bold text-black">
                  {section.title}
                </Text>

                <Link
                  href={`/category/${section.slug}`}
                  style={{ minWidth: 50 }}
                >
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
            renderItem={({ item }) => (
              <FlatList
                data={item.products}
                keyExtractor={(product) => product.name}
                numColumns={2}
                scrollEnabled={false}
                columnWrapperStyle={{
                  justifyContent: "space-between",
                  marginTop: 12,
                }}
                renderItem={({ item: product }) => (
                  // <Link href={`/product/${product.id}`}>
                  <ProductCard
                    imgPath={product.image}
                    name={product.name}
                    price={product.price}
                    id={product.id}
                  />
                  // </Link>
                )}
              />
            )}
          />
        ) : (
          currentView === "category" && (
            <FlatList
              data={CATEGORY_DATA}
              keyExtractor={(item) => item.slug}
              contentContainerStyle={{
                paddingBottom: !hidden ? tabBarHeight + 60 : 0,
              }}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              renderItem={({ item, index }) => {
                const isLast = index === CATEGORY_DATA.length - 1;

                return (
                  <Box className={`${!isLast ? "mb-6" : ""}`}>
                    <CategoryCard
                      {...item}
                      variant={index % 2 === 0 ? "left" : "right"}
                    />
                  </Box>
                );
              }}
            />
          )
        )}
      </View>
    </SafeScreen>
  );
};

export default HomeScreen;
