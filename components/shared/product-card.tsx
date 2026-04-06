import { BLUR_HASH } from "@/utils/constants";
import { formatCurrency } from "@/utils/libs";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Heart } from "lucide-react-native";
import { Pressable, Text } from "react-native";
import { Box } from "../ui/box";

interface ProductCardProps {
  imgSrc?: string;
  imgPath?: any;
  isHttpSrc?: boolean;
  name: string;
  price: number;
  id: string;
}

export const ProductCard = ({
  imgSrc,
  imgPath,
  isHttpSrc = false,
  name,
  price,
  id,
}: ProductCardProps) => {
  const imageUrl = isHttpSrc ? imgSrc : imgPath;

  const router = useRouter();

  console.log(id, "id");

  return (
    <Box className="w-[49%] p-2 rounded-[16px] shadow-[2px]">
      <Pressable
        className="w-full h-fit"
        onPress={() => router.push(`/product/${id}`)}
      >
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
          <Pressable className="p-2 rounded-full bg-gray-400 absolute top-2 right-2">
            <Heart size={16} color="#ffffff" />
          </Pressable>
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
      </Pressable>
    </Box>
  );
};
