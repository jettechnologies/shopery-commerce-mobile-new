import React from "react";
import { Button, ButtonSpinner, ButtonText } from "./ui/button";

type BaseButtonProps = React.ComponentProps<typeof Button>;

interface AppButtonProps extends BaseButtonProps {
  title?: string;
  isLoading?: boolean;
  height?: number;
  onPress?: () => void;
}

export const AppButton = ({
  title,
  isLoading = false,
  children,
  className,
  height = 50,
  onPress,
  ...rest
}: AppButtonProps) => {
  return (
    <Button
      className={`bg-purple-500 active:bg-purple-600 rounded-full ${className ?? ""}`}
      style={{ height }}
      onPress={onPress}
      disabled={isLoading || rest.disabled}
      {...rest}
    >
      {isLoading ? (
        <ButtonSpinner />
      ) : (
        <>
          {title && (
            <ButtonText className="font-semibold text-white text-base">
              {title}
            </ButtonText>
          )}
          {children}
        </>
      )}
    </Button>
  );
};

// import { Button, ButtonSpinner, ButtonText } from "./ui/button";

// type ButtonProps = typeof Button;

// interface AppButtonProps extends ButtonProps {
//   title: string;
//   onPress: () => void;
//   height?: number;
//   isLoading?: boolean;
//   className?: string;
//   variant?: ButtonProps["variant"];
// }

// export const AppButton = ({
//   title,
//   onPress,
//   height = 50,
//   isLoading,
//   className,
// }: AppButtonProps) => {
//   return (
//     <Button
//       onPress={onPress}
//       style={{ height }}
//       className="bg-purple-500 active:bg-purple-600 rounded-full"
//     >
//       <ButtonText className="font-semibold text-white text-base">
//         {title}
//       </ButtonText>
//       {isLoading && <ButtonSpinner />}
//     </Button>
//   );
// };
