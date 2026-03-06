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
    console.log(message, "message from toast context");
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
          // <Toast
          //   nativeID={`toast-${id}`}
          // style={{
          //   backgroundColor: bg,
          //   padding: 16,
          //   borderRadius: 12,
          //   marginHorizontal: 16,
          // }}
          // >
          //   <HStack space="md" className="items-center">
          //     <Icon as={IconComponent} size="md" color={text} />
          //     <VStack style={{ flex: 1 }}>
          //       <ToastTitle style={{ color: "#fff", fontWeight: "600" }}>
          //         {/* {message.charAt(0).toUpperCase() + message.slice(1)} */}
          //         fuck this toast
          //       </ToastTitle>
          //     </VStack>
          //   </HStack>
          // </Toast>
          <Toast
            nativeID={`toast-${id}`}
            style={{
              backgroundColor: bg,
              padding: 16,
              borderRadius: 12,
              marginHorizontal: 16,
            }}
            variant="solid"
          >
            <HStack space="md" className="items-center">
              <Icon as={IconComponent} size="md" />

              <VStack className="flex-1">
                <ToastTitle>
                  {message.charAt(0).toUpperCase() + message.slice(1)}
                </ToastTitle>

                {description && (
                  <ToastDescription>{description}</ToastDescription>
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
// import { HStack, Icon, Toast, ToastTitle, useToast, VStack } from '@gluestack-ui/themed';
// import { HStack } from "@/components/ui/hstack";
// import { Icon } from "@/components/ui/icon";
// import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
// import { VStack } from "@/components/ui/vstack";
// import {
//   AlertCircle,
//   AlertTriangle,
//   CheckCircle,
//   Info,
// } from "lucide-react-native";
// import React, { createContext, useContext } from "react";
// import { View } from "react-native";

// export type ToastStatus = "success" | "error" | "warning" | "info";

// type ToastContextValues = {
//   openToast: (message: string, status: ToastStatus) => void;
// };

// const ToastContext = createContext<ToastContextValues | null>(null);

// export const useToastContext = () => {
//   const context = useContext(ToastContext);
//   if (!context) throw new Error("ToastContext not found");
//   return context;
// };

// export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
//   const toast = useToast();

//   const openToast = (message: string, status: ToastStatus) => {
//     toast.show({
//       placement: "top",
//       render: ({ id }) => {
//         const toastId = "toast-" + id;

//         const bg =
//           status === "success"
//             ? "bg-green-100"
//             : status === "error"
//               ? "bg-red-100"
//               : status === "warning"
//                 ? "bg-yellow-100"
//                 : "bg-blue-100";

//         const textColor =
//           status === "success"
//             ? "text-green-700"
//             : status === "error"
//               ? "text-red-700"
//               : status === "warning"
//                 ? "text-yellow-700"
//                 : "text-blue-700";

//         const IconComponent =
//           status === "success"
//             ? CheckCircle
//             : status === "error"
//               ? AlertCircle
//               : status === "warning"
//                 ? AlertTriangle
//                 : Info;

//         return (
//           <View className="px-4 border-2 border-black">
//             <Toast nativeID={toastId} className={`rounded-xl p-4 ${bg}`}>
//               <HStack space="md" className="items-center">
//                 <Icon as={IconComponent} size="md" />
//                 <VStack className="flex-1">
//                   <ToastTitle className={textColor}>
//                     {message.charAt(0).toUpperCase() + message.slice(1)}
//                   </ToastTitle>
//                 </VStack>
//               </HStack>
//             </Toast>
//           </View>
//         );
//       },
//       duration: 2000,
//     });
//   };

//   return (
//     <ToastContext.Provider value={{ openToast }}>
//       {children}
//     </ToastContext.Provider>
//   );
// };

// import {
//   Toast,
//   ToastDescription,
//   ToastTitle,
//   useToast,
//   VStack,
// } from "@gluestack-ui/themed";
// import React, { createContext, useCallback, useContext } from "react";

// export type ToastStatus = "success" | "error" | "info" | "warning";

// interface ToastContextType {
//   openToast: (message: string, status: ToastStatus) => void;
// }

// const ToastContext = createContext<ToastContextType | undefined>(undefined);

// export function ToastProvider({ children }: { children: React.ReactNode }) {
//   const toast = useToast();

//   const openToast = useCallback(
//     (message: string, status: ToastStatus = "info") => {
//       toast.show({
//         placement: "top",
//         render: ({ id }) => {
//           return (
//             <Toast action={status} variant="outline">
//               <VStack space="xs">
//                 <ToastTitle>{status.toUpperCase()}</ToastTitle>
//                 <ToastDescription>{message}</ToastDescription>
//               </VStack>
//             </Toast>
//           );
//         },
//       });
//     },
//     [toast],
//   );

//   return (
//     <ToastContext.Provider value={{ openToast }}>
//       {children}
//     </ToastContext.Provider>
//   );
// }

// export const useToastContext = () => {
//   const context = useContext(ToastContext);
//   if (!context) {
//     throw new Error("useToastContext must be used within a ToastProvider");
//   }
//   return context;
// };
