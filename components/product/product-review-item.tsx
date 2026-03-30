// components/ReviewItem.tsx
import { formatRelativeDate } from "@/utils/libs";
import { Text, View } from "react-native";
import { RatingStars } from "../shared";
import { Avatar, AvatarFallbackText, AvatarImage } from "../ui/avatar";

type Review = {
  id: number;
  name: string;
  text: string;
  rating: number;
  avatar?: string;
  createdAt?: string;
};

type ProductReviewItemProps = {
  review: Review;
};

export function ProductReviewItem({ review }: ProductReviewItemProps) {
  const reviewDate = formatRelativeDate(review.createdAt || "");

  return (
    <View className="mb-4">
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center gap-3">
          <Avatar size="md">
            <AvatarFallbackText>{review.name}</AvatarFallbackText>
            <AvatarImage
              source={
                review.avatar
                  ? { uri: review.avatar }
                  : require("@/assets/images/user-avatar.jpg")
              }
            />
          </Avatar>

          <Text className="font-semibold">{review.name}</Text>
        </View>

        <RatingStars rating={review.rating} />
      </View>

      <Text className="text-gray-500 mt-2">{review.text}</Text>
      <Text className="text-black font-semibold mt-2">{reviewDate}</Text>
    </View>
  );
}
