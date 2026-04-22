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
      // className={`bg-purple-500 active:bg-purple-600 rounded-full ${className ?? ""}`}

      className={`
        bg-purple-500 
        data-[active=true]:bg-purple-600 
        data-[disabled=true]:opacity-50
        rounded-full 
        ${className ?? ""}
      `}
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
            <ButtonText
              className="font-semibold text-white text-base"
              style={{ minWidth: 50 }}
            >
              {title}
            </ButtonText>
          )}
          {children}
        </>
      )}
    </Button>
  );
};
