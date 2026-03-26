import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, Text } from "react-native";
import { Box } from "../ui/box";

interface CategoryCardProps {
  title: string;
  productCount: number;
  image: any;
  slug: string;

  variant?: "left" | "right";
  bgFrom?: string;
  bgTo?: string;
}

const CATEGORY_STYLE = {
  left: {
    bg: "bg-gray-200",
    border: "border-gray-100",
  },
  right: {
    bg: "bg-purple-100",
    border: "border-purple-200",
  },
};

export const CategoryCard = ({
  title,
  productCount,
  image,
  slug,
  variant = "left",
  bgFrom = "bg-gray-200",
  bgTo = "bg-gray-100",
}: CategoryCardProps) => {
  const router = useRouter();

  const isLeft = variant === "left";
  const { bg, border } = CATEGORY_STYLE[variant];

  return (
    <Pressable
      onPress={() => router.push(`/category/${slug}`)}
      className={`w-full h-[140px] rounded-[16px] overflow-hidden relative border ${border}`}
    >
      <Box className={`w-full absolute h-full ${bg}`} />

      <Box
        className={`absolute inset-0 flex-row items-center px-4 ${
          isLeft ? "flex-row" : "flex-row-reverse"
        }`}
      >
        <Box className={`flex-1 ${isLeft ? "items-start" : "items-end"}`}>
          <Text className="text-lg font-bold text-black">{title}</Text>
          <Text className="text-sm text-gray-500 mt-1">
            {productCount} Products
          </Text>
        </Box>

        <Box
          className={`w-[65%] h-full ${isLeft ? "justify-start" : "justify-end"}`}
        >
          <Image
            source={image}
            contentFit="contain"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
      </Box>
    </Pressable>
  );
};
