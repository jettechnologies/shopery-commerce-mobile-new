import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type PaginationDotsProps = {
  total: number;
  current: number;
};

type PaginationDotProps = {
  index: number;
  current: number;
};

const PaginationDot = ({ index, current }: PaginationDotProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    const isActive = current === index;

    return {
      width: withTiming(isActive ? 20 : 8, { duration: 250 }),
      opacity: withTiming(isActive ? 1 : 0.5, { duration: 250 }),
    };
  }, [current]);

  return (
    <Animated.View
      style={animatedStyle}
      className="bg-primary500 h-2 rounded-full"
    />
  );
};

export const PaginationDots = ({ total, current }: PaginationDotsProps) => {
  return (
    <View className="mt-4 flex-row justify-center gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <PaginationDot key={index} index={index} current={current} />
      ))}
    </View>
  );
};
