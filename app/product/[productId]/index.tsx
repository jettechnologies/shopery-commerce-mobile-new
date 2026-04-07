import { AppButton } from "@/components/app-button";
import { AppHeader } from "@/components/app-header";
import { ProductReviewsModal } from "@/components/modal";
import { ProductReviewItem } from "@/components/product";
import { SafeScreen } from "@/components/safe-screen";
import { TruncatedText } from "@/components/shared";
import { Icon } from "@/components/ui/icon";
import { PRODUCT_REVIEWS } from "@/data";
import { useCartMutations } from "@/hooks/use-cart";
import { useGetProductById } from "@/services/tanstack-query/queries/use-products-query";
import { useCartStore } from "@/store/cart-store";
import { useDrawerStore } from "@/store/drawer-store";
import { type Variant } from "@/types/response-types.";
import { formatCurrency } from "@/utils/libs";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShoppingBag,
  Star,
} from "lucide-react-native";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";

const { height } = Dimensions.get("window");

const ProductDetails = () => {
  const { productId } = useLocalSearchParams();

  // const {
  //   data: product,
  //   isLoading,
  //   error,
  // } = useGetProductDetail({ type: "id", value: productId as string });

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductById(productId as string);

  const { addItem, isAdding } = useCartMutations();
  const { totalItems } = useCartStore();
  const { openCart } = useDrawerStore();

  const pagerRef = useRef<PagerView>(null);
  const [page, setPage] = useState(0);
  const [productCount, setProductCount] = useState(1);

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const [reviewsVisible, setReviewsVisible] = useState(false);
  const [visibleReviewsCount, setVisibleReviewsCount] = useState(5);

  // Initialize selections once product is loaded
  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      const firstVariant = product.variants[0];
      setSelectedColor(firstVariant.color[0]);
      setSelectedSize(firstVariant.size);
    }
  }, [product]);

  const availableColors = useMemo(() => {
    if (!product) return [];
    const colors = new Set<string>();
    product.variants.forEach((v: Variant) =>
      v.color.forEach((c: string) => colors.add(c)),
    );
    return Array.from(colors);
  }, [product]);

  const availableSizes = useMemo(() => {
    if (!product || !selectedColor) return [];
    return product.variants
      .filter((v: Variant) => v.color.includes(selectedColor))
      .map((v: Variant) => v.size);
  }, [product, selectedColor]);

  const selectedVariant = useMemo(() => {
    if (!product || !selectedColor || !selectedSize) return null;
    return (
      product.variants.find(
        (v: Variant) =>
          v.color.includes(selectedColor) && v.size === selectedSize,
      ) || product.variants[0]
    );
  }, [product, selectedColor, selectedSize]);

  // AUTO PLAY for carousel
  useEffect(() => {
    if (!product?.images?.length) return;
    const interval = setInterval(() => {
      const next = (page + 1) % product.images.length;
      pagerRef.current?.setPage(next);
      setPage(next);
    }, 6000);
    return () => clearInterval(interval);
  }, [page, product?.images]);

  if (isLoading) {
    return (
      <SafeScreen>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#8B5CF6" />
        </View>
      </SafeScreen>
    );
  }

  if (error || !product) {
    return (
      <SafeScreen>
        <View className="flex-1 items-center justify-center p-5">
          <Text className="text-lg font-bold text-gray-900">
            Product not found
          </Text>
          <Pressable
            onPress={() => router.back()}
            className="mt-4 bg-purple-600 px-6 py-2 rounded-full"
          >
            <Text className="text-white font-bold">Go Back</Text>
          </Pressable>
        </View>
      </SafeScreen>
    );
  }

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    
    addItem({
      productId: product.productId, // This should be the UUID string
      variantId: Number(selectedVariant.id), // Ensure this is a number
      quantity: productCount,
    });
  };

  const images =
    product.images.length > 0
      ? product.images
      : [require("@/assets/images/plain-white-tee.png")];

  return (
    <SafeScreen>
      <View className="w-full h-full bg-white">
        <AppHeader
          title={product.categories?.[0]?.category?.name || "Product"}
          variant="secondary"
          rightElement={
            <Pressable onPress={openCart} className="relative p-2">
              <Icon as={ShoppingBag} size="xl" color="black" />
              {totalItems > 0 && (
                <View className="absolute top-1 right-1 bg-red-500 rounded-full min-w-[18px] h-[18px] items-center justify-center px-1 border-2 border-white">
                  <Text className="text-white text-[10px] font-bold">
                    {totalItems > 99 ? "99+" : totalItems}
                  </Text>
                </View>
              )}
            </Pressable>
          }
        />

        <View style={{ height: height * 0.4 }}>
          <PagerView
            ref={pagerRef}
            style={{ flex: 1 }}
            initialPage={0}
            onPageSelected={(e) => setPage(e.nativeEvent.position)}
          >
            {images.map((img: any, index: number) => (
              <View key={index} className="flex-1">
                <Image
                  source={typeof img === "string" ? img : img}
                  className="w-full h-full"
                  contentFit="cover"
                />
              </View>
            ))}
          </PagerView>

          <Pressable
            className="absolute top-[50%] left-4 p-3 rounded-full bg-white/80 shadow-sm"
            style={{ transform: [{ translateY: -25 }] }}
            onPress={() => {
              const prev = (page - 1 + images.length) % images.length;
              pagerRef.current?.setPage(prev);
              setPage(prev);
            }}
          >
            <ChevronLeft size={20} color="#000" />
          </Pressable>
          <Pressable
            className="absolute top-[50%] right-4 p-3 rounded-full bg-white/80 shadow-sm"
            style={{ transform: [{ translateY: -25 }] }}
            onPress={() => {
              const next = (page + 1) % images.length;
              pagerRef.current?.setPage(next);
              setPage(next);
            }}
          >
            <ChevronRight size={20} color="#000" />
          </Pressable>

          <View className="absolute bottom-4 left-0 right-0 flex-row justify-center gap-2">
            {images.map((_: any, i: number) => (
              <View
                key={i}
                className={`h-1.5 rounded-full ${page === i ? "w-6 bg-purple-600" : "w-2 bg-gray-300"}`}
              />
            ))}
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 px-5 py-6"
        >
          <View className="flex-row justify-between items-start">
            <View className="flex-1 pr-4">
              <Text className="text-2xl font-bold text-gray-900 leading-tight">
                {product.name}
              </Text>
              <View className="flex-row items-center mt-2 gap-2">
                <Star size={16} color="#5B5BD6" fill="#5B5BD6" />
                <Text className="text-gray-500 font-medium">
                  4.8 (320 reviews)
                </Text>
              </View>
            </View>

            <View className="items-end">
              <View className="flex-row items-center gap-3 bg-gray-100 px-3 py-2 rounded-2xl">
                <Pressable
                  onPress={() => setProductCount(Math.max(1, productCount - 1))}
                  className="p-1 rounded-full bg-white shadow-sm"
                >
                  <Minus size={14} color="#000" />
                </Pressable>
                <Text className="font-bold text-base min-w-[20px] text-center">
                  {productCount}
                </Text>
                <Pressable
                  onPress={() => setProductCount(productCount + 1)}
                  className="p-1 rounded-full bg-white shadow-sm"
                >
                  <Plus size={14} color="#000" />
                </Pressable>
              </View>
              <Text className="mt-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full overflow-hidden">
                IN STOCK
              </Text>
            </View>
          </View>

          <View className="mt-8">
            <Text className="font-bold text-gray-900 text-lg mb-3">Color</Text>
            <View className="flex-row gap-3">
              {availableColors.map((color, i: number) => (
                <Pressable
                  key={i}
                  onPress={() => setSelectedColor(color)}
                  style={{ backgroundColor: color.toLowerCase() }}
                  className={`w-10 h-10 rounded-full shadow-sm ${
                    selectedColor === color
                      ? "border-4 border-purple-200"
                      : "border-2 border-gray-50"
                  }`}
                />
              ))}
            </View>
          </View>

          <View className="mt-8">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="font-bold text-gray-900 text-lg">Size</Text>
              <Pressable>
                <Text className="text-purple-600 font-semibold text-xs text-right">
                  Size Guide
                </Text>
              </Pressable>
            </View>
            <View className="flex-row gap-3">
              {availableSizes.map((size: string, i: number) => (
                <Pressable
                  key={i}
                  onPress={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-xl items-center justify-center border ${
                    selectedSize === size
                      ? "bg-purple-600 border-purple-600"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <Text
                    className={`font-bold ${selectedSize === size ? "text-white" : "text-gray-900"}`}
                  >
                    {size}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View className="mt-8">
            <Text className="font-bold text-gray-900 text-lg mb-2">
              Description
            </Text>
            <TruncatedText
              text={product.description}
              className="text-gray-500 leading-6 text-sm"
            />
          </View>

          <View className="mt-8 mb-10">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="font-bold text-gray-900 text-lg">Reviews</Text>
              <Pressable onPress={() => setReviewsVisible(true)}>
                <Text className="text-purple-600 font-bold text-sm">
                  View all
                </Text>
              </Pressable>
            </View>
            {PRODUCT_REVIEWS.slice(0, 2).map((review) => (
              <ProductReviewItem key={review.id} review={review} />
            ))}
          </View>
        </ScrollView>

        <View className="px-5 pt-4 pb-8 border-t border-gray-100 flex-row justify-between items-center bg-white">
          <View>
            <Text className="text-gray-400 text-xs font-medium">
              Total Price
            </Text>
            <Text className="text-2xl font-bold text-gray-900">
              {formatCurrency({
                amount:
                  (selectedVariant?.price || product.minPrice) * productCount,
              })}
            </Text>
          </View>

          <AppButton
            onPress={handleAddToCart}
            isLoading={isAdding}
            className="bg-purple-600 px-8 py-4 min-w-[100px] rounded-2xl flex-row items-center shadow-lg shadow-purple-200"
          >
            <View className="flex-row items-center gap-2">
              <ShoppingBag size={20} color="#fff" />
              <Text className="text-white font-bold text-base">
                Add to Cart
              </Text>
            </View>
          </AppButton>
        </View>

        <ProductReviewsModal
          showReviews={reviewsVisible}
          onClose={() => setReviewsVisible(false)}
          visibleReviews={visibleReviewsCount}
          loadMoreReviews={() => setVisibleReviewsCount((prev) => prev + 5)}
        />
      </View>
    </SafeScreen>
  );
};

export default ProductDetails;
