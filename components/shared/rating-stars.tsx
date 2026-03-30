import { Star } from "lucide-react-native";
import { View } from "react-native";

type RatingStarsProps = {
  rating: number; // e.g. 4.5
  size?: number;
};

export function RatingStars({ rating, size = 14 }: RatingStarsProps) {
  const totalStars = 5;

  return (
    <View className="flex-row items-center gap-1">
      {Array.from({ length: totalStars }).map((_, i) => {
        const filled = i < Math.floor(rating);

        return (
          <Star
            key={i}
            size={size}
            color={filled ? "#5B5BD6" : "#D1D5DB"}
            fill={filled ? "#4F46E5" : "transparent"}
          />
        );
      })}
    </View>
  );
}
