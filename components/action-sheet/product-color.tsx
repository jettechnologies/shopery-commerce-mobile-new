import { PRODUCT_COLORS } from "@/data";
import { Pressable, Text, View } from "react-native";
import KeyboardAwareActionsheet from "../keyboard-aware-components/action-sheet";

interface ProductColorSheetProps {
  showColors: boolean;
  onClose: () => void;
  onSelectColor: (color: string) => void;
}

export const ProductColorSheet = ({
  showColors,
  onClose,
  onSelectColor,
}: ProductColorSheetProps) => {
  return (
    <KeyboardAwareActionsheet isOpen={showColors} onClose={onClose}>
      <Text className="font-bold text-lg mb-4">Select Color</Text>

      <View className="flex-row flex-wrap gap-4">
        {PRODUCT_COLORS.map((color, i) => (
          <Pressable
            key={i}
            onPress={() => onSelectColor(color)}
            style={{ backgroundColor: color }}
            className="w-10 h-10 rounded-full"
          />
        ))}
      </View>
    </KeyboardAwareActionsheet>
  );
};
