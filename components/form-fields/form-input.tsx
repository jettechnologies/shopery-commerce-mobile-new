// components/form/AppFormInput.tsx
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { useRef, useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { TextInput } from "react-native";

import { HStack } from "@/components/ui/hstack";
import { Eye, EyeOff, type LucideIcon } from "lucide-react-native";

type InputSize = "sm" | "md" | "lg" | "xl";
type InputVariant = "underlined" | "outline" | "rounded" | undefined;

interface AppFormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: "text" | "password";
  size?: InputSize;
  rules?: object;
  rightIcon?: LucideIcon;
  leftIcon?: LucideIcon;
  inputVariant?: InputVariant;
}

const sizeMap: Record<InputSize, string> = {
  sm: "h-10",
  md: "h-12",
  lg: "h-14",
  xl: "h-16",
};

export function AppFormInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  size = "md",
  rules,
  rightIcon,
  leftIcon,
  inputVariant,
}: AppFormInputProps<T>) {
  const [secure, setSecure] = useState(type === "password");

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, value },
        fieldState: { error, isDirty },
      }) => (
        <FormControl isInvalid={!!error}>
          {label && (
            <FormControlLabel>
              <FormControlLabelText className="font-bold text-lg text-black">
                {label}
              </FormControlLabelText>
            </FormControlLabel>
          )}

          <Input
            className={`my-2 ${sizeMap[size]} rounded-xl border
            data-[focus=true]:border-purple-500
            data-[focus=true]:web:ring-1
            data-[focus=true]:web:ring-purple-500`}
            variant={inputVariant}
          >
            {leftIcon && (
              <InputSlot className="pl-3">
                <InputIcon
                  as={leftIcon}
                  className={`${value && isDirty ? "text-purple-600" : "text-gray-400"}`}
                />
              </InputSlot>
            )}
            <InputField
              value={value}
              placeholder={placeholder}
              onChangeText={onChange}
              secureTextEntry={secure}
              className="placeholder::text-gray-400 text-black text-semibold text-base"
            />

            {type === "password" && (
              <InputSlot className="pr-3" onPress={() => setSecure(!secure)}>
                <InputIcon
                  as={secure ? EyeOff : Eye}
                  className="text-gray-400"
                  size="xl"
                />
              </InputSlot>
            )}

            {rightIcon && (
              <InputSlot>
                <InputIcon as={rightIcon} />
              </InputSlot>
            )}
          </Input>

          {error && (
            <FormControlError>
              <FormControlErrorIcon
                as={AlertCircleIcon}
                className="text-red-500"
                size="xs"
              />
              <FormControlErrorText className="text-red-500 text-sm">
                {error.message}
              </FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>
      )}
    />
  );
}

type OtpInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  helperText?: string;
  length?: number;
  size?: "sm" | "md" | "lg";
  isRequired?: boolean;
  rules?: object;
  isDisabled?: boolean;
};

export function OtpInput<T extends FieldValues>({
  control,
  name,
  label,
  helperText,
  length = 4,
  size = "md",
  isRequired,
  rules,
  isDisabled,
}: OtpInputProps<T>) {
  const inputs = useRef<(TextInput | null)[]>([]);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={"" as any}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const otpArray = value ? value.split("") : [];

        const handleChange = (text: string, index: number) => {
          if (!/^\d*$/.test(text)) return;

          // Handle paste (multiple digits)
          if (text.length > 1) {
            const pasted = text.slice(0, length).split("");
            onChange(pasted.join(""));
            // pasted.forEach((_, i) => {
            //   inputs.current[i]?.setNativeProps({ text: pasted[i] });
            // });
            return;
          }

          const newOtp = [...otpArray];
          newOtp[index] = text;
          const combined = newOtp.join("");
          onChange(combined);

          if (text && index < length - 1) {
            inputs.current[index + 1]?.focus();
          }
        };

        const handleBackspace = (index: number) => {
          if (!otpArray[index] && index > 0) {
            inputs.current[index - 1]?.focus();
          }
        };

        return (
          <FormControl
            isInvalid={!!error}
            size={size}
            isRequired={isRequired}
            isDisabled={isDisabled}
          >
            {label && (
              <FormControlLabel>
                <FormControlLabelText>{label}</FormControlLabelText>
              </FormControlLabel>
            )}

            <HStack className="justify-center gap-x-3 my-2">
              {Array.from({ length }).map((_, index) => {
                const isActive = otpArray[index];

                return (
                  <Input
                    key={index}
                    size={size}
                    className={`w-14 h-14 rounded-2xl border 
                    data-[focus=true]:border-purple-500
                    data-[focus=true]:web:ring-1
                    data-[focus=true]:web:ring-purple-500 ${
                      error
                        ? "border-red-500"
                        : isActive
                          ? "border-purple-500"
                          : "border-gray-300"
                    }`}
                  >
                    <InputField
                      ref={(ref) => {
                        inputs.current[index] = ref as unknown as TextInput;
                      }}
                      keyboardType="number-pad"
                      maxLength={1}
                      value={otpArray[index] || ""}
                      onChangeText={(text) => handleChange(text, index)}
                      onKeyPress={({ nativeEvent }) => {
                        if (nativeEvent.key === "Backspace") {
                          handleBackspace(index);
                        }
                      }}
                      className="text-center text-lg font-semibold"
                    />
                  </Input>
                );
              })}
            </HStack>

            {helperText && !error && (
              <FormControlHelper>
                <FormControlHelperText>{helperText}</FormControlHelperText>
              </FormControlHelper>
            )}

            {error && (
              <FormControlError>
                <FormControlErrorText>{error.message}</FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
        );
      }}
    />
  );
}
