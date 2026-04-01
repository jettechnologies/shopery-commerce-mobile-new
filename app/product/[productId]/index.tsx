import { ProductColorSheet } from "@/components/action-sheet";
import { AppHeader } from "@/components/app-header";
import { ProductReviewsModal } from "@/components/modal";
import { ProductReviewItem } from "@/components/product";
import { SafeScreen } from "@/components/safe-screen";
import { TruncatedText } from "@/components/shared";
import { PRODUCT_COLORS, PRODUCT_REVIEWS } from "@/data";
import { formatCurrency } from "@/utils/libs";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import {
  ChevronLeft,
  ChevronRight,
  HandbagIcon,
  Heart,
  Minus,
  Plus,
  Star,
} from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import PagerView from "react-native-pager-view";

const { height } = Dimensions.get("window");
const SLIDES = [
  { image: require("@/assets/images/plain-white-tee.png") },
  { image: require("@/assets/images/plain-black-tee.png") },
  { image: require("@/assets/images/plain-white-tee-2.png") },
];

const ProductDetails = () => {
  const productId = useLocalSearchParams().productId;

  console.log(productId, "product id");

  const pagerRef = useRef<PagerView>(null);
  const [page, setPage] = useState(0);
  const [colors, setColors] = useState<{ show: boolean; selected: string }>({
    show: false,
    selected: PRODUCT_COLORS[0],
  });
  const [reviews, setReviews] = useState<{
    show: boolean;
    visibleReviews: number;
  }>({
    show: false,
    visibleReviews: 5,
  });
  const [productCount, setProductCount] = useState(1);

  // AUTO PLAY
  useEffect(() => {
    const interval = setInterval(() => {
      const next = (page + 1) % SLIDES.length;
      pagerRef.current?.setPage(next);
      setPage(next);
    }, 6000);

    return () => clearInterval(interval);
  }, [page]);

  const handleSliderNext = () => {
    const next = (page + 1) % SLIDES.length;
    pagerRef.current?.setPage(next);
    setPage(next);
  };

  const handleSliderPrev = () => {
    const prev = (page - 1 + SLIDES.length) % SLIDES.length;
    pagerRef.current?.setPage(prev);
    setPage(prev);
  };

  const loadMoreReviews = () => {
    if (reviews.visibleReviews < 20) {
      setReviews((prev) => ({
        ...prev,
        visibleReviews: prev.visibleReviews + 5,
      }));
    }
  };

  const handleColorSelect = (color: string) => {
    setColors((prev) => ({
      ...prev,
      selected: color,
      show: false,
    }));
  };

  const handleColorSheet = (state: boolean) => {
    setColors((prev) => ({
      ...prev,
      show: state,
    }));
  };

  const handleReviewsSheet = (state: boolean) => {
    setReviews((prev) => ({
      ...prev,
      show: state,
    }));
  };

  const handleAddProductCount = () => {
    setProductCount((prev) => prev + 1);
  };

  const handleRemoveProductCount = () => {
    if (productCount === 1) return;

    setProductCount((prev) => prev - 1);
  };

  const updatedPrice = formatCurrency({ amount: 148 * productCount });

  return (
    <SafeScreen>
      <View className="w-full h-full">
        <AppHeader title="Clothes" />

        <View style={{ height: height * 0.35 }}>
          <PagerView
            ref={pagerRef}
            style={{ flex: 1 }}
            initialPage={0}
            onPageSelected={(e) => setPage(e.nativeEvent.position)}
          >
            {SLIDES.map((slide, index) => (
              <View key={index} className="flex-1">
                <Image
                  source={slide.image}
                  className="w-full h-full"
                  contentFit="cover"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </View>
            ))}
          </PagerView>
          {/* overlay icons */}
          <Pressable
            className="absolute top-[50%] left-4 p-3 rounded-full bg-gray-100 shadow-sm"
            style={{
              transform: "translateY(-50%)",
            }}
            onPress={handleSliderPrev}
          >
            <ChevronLeft size={24} />
          </Pressable>
          <Pressable
            className="absolute top-[50%] right-4 p-3 rounded-full bg-gray-100 shadow-sm"
            style={{
              transform: "translateY(-50%)",
            }}
            onPress={handleSliderNext}
          >
            <ChevronRight size={24} />
          </Pressable>
        </View>

        <ScrollView className="flex-1 px-5 py-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-bold w-[70%]">
              Men Harrington Jacket
            </Text>

            <View>
              <View className="flex-row items-center gap-3 bg-gray-200 px-3 py-1 rounded-full">
                <Pressable
                  onPress={handleRemoveProductCount}
                  className="p-1 rounded-full bg-white w-[20px] h-[20px] flex justify-center items-center"
                >
                  <Minus size={12} />
                </Pressable>
                <Text className="font-bold text-sm">{productCount}</Text>
                <Pressable
                  onPress={handleAddProductCount}
                  className="p-1 rounded-full bg-white w-[20px] h-[20px] flex justify-center items-center"
                >
                  <Plus size={12} />
                </Pressable>
              </View>
              <Text className="mt-1 text-xs font-normal text-black text-right">
                In Stock
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between items-center mt-3">
            <View className="flex-row gap-x-4">
              <Star size={16} color="#5B5BD6" fill="#5B5BD6" />
              <Text className="text-gray-500">4.8 (320 reviews)</Text>
            </View>

            <Pressable className="p-2 rounded-full bg-gray-200">
              <Heart size={20} />
            </Pressable>
          </View>

          <View className="mt-6">
            <Text className="font-semibold mb-2 text-lg">Color</Text>

            <View className="flex-row gap-3">
              {PRODUCT_COLORS.slice(0, 5).map((color, i) => (
                <Pressable
                  key={i}
                  onPress={() => handleColorSelect(color)}
                  style={{ backgroundColor: color }}
                  className={`w-8 h-8 rounded-full ${
                    colors.selected === color ? "border-2 border-black" : ""
                  }`}
                />
              ))}

              {PRODUCT_COLORS.length > 5 && (
                <Pressable onPress={() => handleColorSheet(true)}>
                  <View className="w-8 h-8 rounded-full bg-gray-200 items-center justify-center">
                    <Text>+</Text>
                  </View>
                </Pressable>
              )}
            </View>
          </View>

          <View className="mt-5">
            <Text className="font-semibold mb-2 text-lg">Description</Text>

            <TruncatedText text="Built for life and made to last, this full-zip corduroy jacket is part of our collection. Comfortable and timeless." />
          </View>

          <View className="mt-6">
            <Text className="font-bold text-lg">Reviews</Text>

            <Text className="text-gray-500 mt-1 mb-4 text-sm">
              {PRODUCT_REVIEWS.length} reviews
            </Text>

            {PRODUCT_REVIEWS.slice(0, 3).map((review) => (
              <ProductReviewItem key={review.id} review={review} />
            ))}

            <Pressable onPress={() => handleReviewsSheet(true)}>
              <Text className="text-purple-500 font-bold text-sm">
                View more reviews
              </Text>
            </Pressable>
          </View>
        </ScrollView>

        <View className="px-5 py-4 border-t border-gray-200 flex-row justify-between items-center">
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="text-xl font-bold text-black flex-1"
          >
            {updatedPrice}
          </Text>

          <Pressable className="bg-purple-500 px-6 py-3 flex-row rounded-full gap-x-3 items-center">
            <HandbagIcon size={20} color="#fff" />
            <Text className="text-white font-semibold">Add to Cart</Text>
          </Pressable>
        </View>

        {/* actionsheet and modal */}
        <ProductColorSheet
          showColors={colors.show}
          onClose={() => handleColorSheet(false)}
          onSelectColor={handleColorSelect}
        />

        <ProductReviewsModal
          showReviews={reviews.show}
          onClose={() => handleReviewsSheet(false)}
          visibleReviews={reviews.visibleReviews}
          loadMoreReviews={loadMoreReviews}
        />
      </View>
    </SafeScreen>
  );
};

export default ProductDetails;
