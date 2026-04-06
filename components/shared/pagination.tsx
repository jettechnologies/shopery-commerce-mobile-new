import React from "react";
import { Text, Pressable } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { Box } from "@/components/ui/box";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
}) => {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1 && !isLoading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && !isLoading) {
      onPageChange(currentPage + 1);
    }
  };

  const isPrevDisabled = currentPage === 1 || isLoading;
  const isNextDisabled = currentPage === totalPages || isLoading;

  return (
    <Box className="flex-row items-center justify-center py-5 gap-4">
      <Pressable
        onPress={handlePrev}
        disabled={isPrevDisabled}
        className={`w-10 h-10 rounded-full bg-gray-100 items-center justify-center border border-gray-200 ${
          isPrevDisabled ? "opacity-50 bg-gray-50" : ""
        } ${isLoading ? "opacity-70" : ""}`}
      >
        <ChevronLeft size={20} color={currentPage === 1 ? "#9ca3af" : "#9333ea"} />
      </Pressable>

      <Box className="min-w-[100px] items-center">
        <Text className="text-sm text-gray-600">
          Page <Text className="font-bold text-gray-900">{currentPage}</Text> of{" "}
          <Text className="font-bold text-gray-900">{totalPages}</Text>
        </Text>
      </Box>

      <Pressable
        onPress={handleNext}
        disabled={isNextDisabled}
        className={`w-10 h-10 rounded-full bg-gray-100 items-center justify-center border border-gray-200 ${
          isNextDisabled ? "opacity-50 bg-gray-50" : ""
        } ${isLoading ? "opacity-70" : ""}`}
      >
        <ChevronRight size={20} color={currentPage === totalPages ? "#9ca3af" : "#9333ea"} />
      </Pressable>
    </Box>
  );
};
