import { Image } from "expo-image";
import { Text, View } from "react-native";

type Props = {
  image: any;
  title: string;
  description: string;
};

export const OnboardingSlide = ({ image, title, description }: Props) => {
  return (
    <View className="flex-1 items-center justify-center">
      <Image
        source={image}
        contentFit="cover"
        style={{
          width: "100%",
          height: 400,
          borderRadius: 50,
        }}
      />

      <View className="mt-8 items-center">
        <Text className="px-4 text-center text-2xl font-bold">{title}</Text>

        <Text className="mt-3 px-6 text-center text-gray-500">
          {description}
        </Text>
      </View>
    </View>
  );
};
