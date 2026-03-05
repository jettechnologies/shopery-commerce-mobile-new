import { Button, ButtonText } from "./ui/button";

export const AppButton = ({
  title,
  onPress,
  height = 40,
}: {
  title: string;
  onPress: () => void;
  height?: number;
}) => {
  return (
    <Button
      onPress={onPress}
      style={{ height }}
      className="bg-purple-500 active:bg-purple-600 rounded-full"
    >
      <ButtonText className="font-semibold text-white">{title}</ButtonText>
    </Button>
  );
};
