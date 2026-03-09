import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react-native";
import React, { createContext, useContext } from "react";

export type ToastStatus = "success" | "error" | "warning" | "info";

type ToastContextValues = {
  openToast: (
    message: string,
    status: ToastStatus,
    description?: string,
  ) => void;
};

const ToastContext = createContext<ToastContextValues | null>(null);

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("ToastContext not found");
  return context;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const toast = useToast();

  const openToast = (
    message: string,
    status: ToastStatus,
    description?: string,
  ) => {
    toast.show({
      placement: "top",
      duration: 2000,
      render: ({ id }) => {
        const colors = {
          success: { bg: "#DCFCE7", text: "#166534" },
          error: { bg: "#FEE2E2", text: "#991B1B" },
          warning: { bg: "#FEF9C3", text: "#854D0E" },
          info: { bg: "#DBEAFE", text: "#1E40AF" },
        };

        const { bg, text } = colors[status];

        const IconComponent =
          status === "success"
            ? CheckCircle
            : status === "error"
              ? AlertCircle
              : status === "warning"
                ? AlertTriangle
                : Info;

        return (
          <Toast
            action={status}
            variant="solid"
            nativeID={`toast-${id}`}
            style={{
              backgroundColor: bg,
            }}
            className="p-4 gap-6 border-error-500 w-full shadow-hard-5 max-w-[443px] flex-row justify-between"
          >
            <HStack space="md">
              <Icon
                as={IconComponent}
                className={`stroke-${status}-500 mt-0.5`}
              />
              <VStack space="xs">
                <ToastTitle
                  className="font-semibold"
                  style={{ color: text, fontWeight: "500", fontSize: 14 }}
                >
                  {message.charAt(0).toUpperCase() + message.slice(1)}
                </ToastTitle>
                {description && (
                  <ToastDescription size="sm">{description}</ToastDescription>
                )}
              </VStack>
            </HStack>
          </Toast>
        );
      },
    });
  };

  return (
    <ToastContext.Provider value={{ openToast }}>
      {children}
    </ToastContext.Provider>
  );
};
