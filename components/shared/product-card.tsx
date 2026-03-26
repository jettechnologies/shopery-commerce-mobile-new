import { BLUR_HASH, formatCurrency } from "@/utils/constants";
import { Image } from "expo-image";
import { Text } from "react-native";
import { Box } from "../ui/box";

interface ProductCardProps {
  imgSrc?: string;
  imgPath?: any;
  isHttpSrc?: boolean;
  name: string;
  price: number;
}

export const ProductCard = ({
  imgSrc,
  imgPath,
  isHttpSrc = false,
  name,
  price,
}: ProductCardProps) => {
  const imageUrl = isHttpSrc ? imgSrc : imgPath;

  return (
    <Box className="w-[48%]  p-2 rounded-[16px] shadow-[2px]">
      <Box className="w-full h-[150px] relative rounded-[16px] overflow-hidden bg-gray-300">
        <Image
          source={imageUrl}
          placeholder={{ blurhash: BLUR_HASH }}
          contentFit="cover"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        />
      </Box>
      <Box className="w-fit mx-auto mt-4">
        <Text className="text-base font-bold text-black mt-2 text-center">
          {name}
        </Text>
        <Text className="text-sm font-semibold text-purple-500 mt-1 text-center">
          {formatCurrency({
            amount: price,
            currencyOptions: { compact: true },
          })}
        </Text>
      </Box>
    </Box>
  );
};
