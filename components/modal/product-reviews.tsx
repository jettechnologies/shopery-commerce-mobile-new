import { PRODUCT_REVIEWS } from "@/data";
import { Pressable, Text } from "react-native";
import KeyboardAvoidingModal from "../keyboard-aware-components/modal";
import { ProductReviewItem } from "../product";

interface ProductReviewsModalProps {
  showReviews: boolean;
  onClose: () => void;
  visibleReviews: number;
  loadMoreReviews: () => void;
}

export const ProductReviewsModal = ({
  showReviews,
  onClose,
  visibleReviews,
  loadMoreReviews,
}: ProductReviewsModalProps) => {
  return (
    <KeyboardAvoidingModal isVisible={showReviews} onClose={onClose}>
      <Text className="font-bold text-lg mb-4">All Reviews</Text>

      {PRODUCT_REVIEWS.slice(0, visibleReviews).map((review) => (
        <ProductReviewItem key={review.id} review={review} />
      ))}

      {visibleReviews < 20 && (
        <Pressable onPress={loadMoreReviews} className="mb-4">
          <Text className="text-purple-500 text-center font-semibold">
            Load more
          </Text>
        </Pressable>
      )}
    </KeyboardAvoidingModal>
  );
};
