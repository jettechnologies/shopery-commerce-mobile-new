import { AppButton } from "@/components/app-button";
import { ReusableDrawer } from "@/components/shared/reusable-drawer";
import { useCartMutations } from "@/hooks/use-cart";
import { useDebouncedCartUpdate } from "@/hooks/use-debounced-cart";
import { useCartStore } from "@/store/cart-store";
import { useDrawerStore } from "@/store/drawer-store";
import { formatCurrency } from "@/utils/libs";
import { Image } from "expo-image";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react-native";
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";

const { width } = Dimensions.get("window");

export const CartDrawer = () => {
  const { isCartOpen, closeCart } = useDrawerStore();
  const { items, totalAmount, totalItems } = useCartStore();
  const { removeItem } = useCartMutations();
  const debouncedUpdate = useDebouncedCartUpdate();
  const updateQuantityStore = useCartStore((s) => s.updateQuantity);

  const cartItems = Object.values(items);

  const handleQuantityChange = (id: string | number, newQty: number) => {
    if (newQty < 1) return;
    // Instant UI update
    updateQuantityStore(id, newQty);
    // Debounced server sync
    debouncedUpdate(id, newQty);
  };

  const renderCartItem = (item: any) => (
    <View
      key={item.id}
      className="flex-row items-center mb-6 bg-white p-2 rounded-2xl shadow-sm border border-gray-50"
    >
      <View className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100">
        <Image
          source={item.product?.images?.[0] || item.product?.image}
          className="w-full h-full"
          contentFit="cover"
        />
      </View>

      <View className="flex-1 ml-4 justify-between h-24 py-1">
        <View className="flex-row justify-between items-start">
          <View className="flex-1 mr-2">
            <Text className="text-gray-900 font-bold text-sm" numberOfLines={1}>
              {item.product?.name || "Product"}
            </Text>
            <Text className="text-gray-400 text-xs mt-1">
              Color: {item.variant?.color?.[0] || "Default"}
            </Text>
          </View>
          <Pressable onPress={() => removeItem(item.id)}>
            <Trash2 size={16} color="#EF4444" />
          </Pressable>
        </View>

        <View className="flex-row justify-between items-end">
          <View className="flex-row items-center bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
            <Pressable
              onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
              className="w-6 h-6 items-center justify-center rounded-full bg-white shadow-sm"
            >
              <Minus size={12} color="#000" />
            </Pressable>
            <Text className="mx-3 font-bold text-sm">{item.quantity}</Text>
            <Pressable
              onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
              className="w-6 h-6 items-center justify-center rounded-full bg-white shadow-sm"
            >
              <Plus size={12} color="#000" />
            </Pressable>
          </View>

          <Text className="font-bold text-lg text-purple-600">
            {formatCurrency({ amount: item.unitPrice * item.quantity })}
          </Text>
        </View>
      </View>
    </View>
  );

  const footer = (
    <View className="w-full">
      <View className="flex-row justify-between mb-2">
        <Text className="text-gray-500 font-medium">Subtotal</Text>
        <Text className="text-gray-900 font-bold">
          {formatCurrency({ amount: totalAmount })}
        </Text>
      </View>
      <View className="flex-row justify-between mb-4 pb-4 border-b border-gray-100">
        <Text className="text-gray-500 font-medium">Shipping</Text>
        <Text className="text-gray-900 font-bold">
          {formatCurrency({ amount: 6.0 })}
        </Text>
      </View>
      <View className="flex-row justify-between mb-6">
        <Text className="text-gray-900 font-bold text-lg">Total Amount</Text>
        <Text className="text-purple-600 font-bold text-xl">
          {formatCurrency({ amount: totalAmount + 6 })}
        </Text>
      </View>

      <AppButton
        title="Checkout"
        onPress={() => {}}
        className="w-full bg-purple-600 rounded-2xl h-14"
      />
    </View>
  );

  return (
    <ReusableDrawer
      isOpen={isCartOpen}
      onClose={closeCart}
      title={`My Cart (${totalItems})`}
      size="lg"
      footer={cartItems.length > 0 ? footer : null}
    >
      {cartItems.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="max-h-[60vh]"
        >
          {cartItems.map(renderCartItem)}
        </ScrollView>
      ) : (
        <View className="items-center justify-center py-20">
          <View className="w-20 h-20 bg-gray-100 rounded-full items-center justify-center mb-4">
            <ShoppingBag size={40} color="#9CA3AF" />
          </View>
          <Text className="text-gray-900 font-bold text-lg">
            Your cart is empty
          </Text>
          <Text className="text-gray-500 text-center mt-2 px-10">
            Looks like you haven&apos;t added anything to your cart yet.
          </Text>
        </View>
      )}
    </ReusableDrawer>
  );
};
