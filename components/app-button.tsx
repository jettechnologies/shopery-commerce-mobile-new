import { Button, ButtonText } from "./ui/button";

export const AppButton = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => {
  return (
    <Button onPress={onPress} className="bg-primary500 rounded-full">
      <ButtonText className="font-semibold text-white">{title}</ButtonText>
    </Button>
  );
};
