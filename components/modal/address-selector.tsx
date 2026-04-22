import type { UserProfile } from "@/types/response-types.";
import { router } from "expo-router";
import { Check, MapPin, Plus } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { AppButton } from "../app-button";
import KeyboardAvoidingModal from "../keyboard-aware-components/modal";

interface AddressSelectorModalProps {
  isVisible: boolean;
  onClose: () => void;
  profile?: UserProfile;
  isProfileLoading?: boolean;
  onSelectAddress: (addressId: number) => void;
  selectedAddressId?: number;
}

export const AddressSelectorModal = ({
  isVisible,
  onClose,
  onSelectAddress,
  profile,
  isProfileLoading,
  selectedAddressId,
}: AddressSelectorModalProps) => {
  const addresses = profile?.Address || [];
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);

  useEffect(() => {
    if (isVisible) {
      setSelectedAddress(selectedAddressId ?? null);
    }
  }, [isVisible, selectedAddressId]);

  const handleSelect = () => {
    if (!selectedAddress) return;
    onSelectAddress(selectedAddress);
    onClose();
  };

  return (
    <KeyboardAvoidingModal isVisible={isVisible} onClose={onClose}>
      <View className="flex-row items-center justify-between mb-6 border-b border-gray-100 pb-4">
        <Text className="font-bold text-xl text-gray-900">
          Select Shipping Address
        </Text>

        <Pressable
          onPress={() => {
            onClose();
            router.push("/profile/addresses");
          }}
          className="p-2 bg-purple-50 rounded-full"
        >
          <Plus size={18} color="#7c3aed" />
        </Pressable>
      </View>

      {isProfileLoading ? (
        <View className="py-10">
          <ActivityIndicator color="#7c3aed" />
        </View>
      ) : addresses.length === 0 ? (
        <View className="py-10 items-center">
          <MapPin size={40} color="#9ca3af" />
          <Text className="text-gray-500 mt-4 text-center">
            No addresses found.{"\n"}Please add one to continue.
          </Text>
        </View>
      ) : (
        addresses.map((address) => {
          const isSelected = selectedAddress === address.id;

          return (
            <Pressable
              key={address.id.toString()}
              onPress={() => setSelectedAddress(Number(address.id))}
              className={`flex-row items-center p-4 mb-3 rounded-2xl border-2 ${
                isSelected
                  ? "bg-purple-50 border-purple-500"
                  : "bg-white border-gray-200"
              }`}
            >
              <View
                className={`w-10 h-10 rounded-full items-center justify-center mr-4 ${
                  isSelected ? "bg-purple-100" : "bg-gray-100"
                }`}
              >
                <MapPin size={20} color={isSelected ? "#4338ca" : "#6b7280"} />
              </View>

              <View className="flex-1 pr-4">
                <Text className="font-bold text-gray-900 text-base mb-1">
                  {address.address1}
                </Text>
                <Text className="text-gray-500 text-sm leading-5">
                  {address.city}, {address.state} {address.zip}
                </Text>
              </View>

              {isSelected && (
                <View className="w-6 h-6 rounded-full bg-purple-600 items-center justify-center">
                  <Check size={14} color="#fff" strokeWidth={3} />
                </View>
              )}
            </Pressable>
          );
        })
      )}

      <View className="mt-4 border-t border-gray-100 pt-5">
        <AppButton
          title="Select Address"
          onPress={handleSelect}
          isDisabled={!selectedAddress}
        />
      </View>
    </KeyboardAvoidingModal>
  );
};

// import { UserProfile } from "@/types/response-types.";
// import { router } from "expo-router";
// import { Check, MapPin, Plus } from "lucide-react-native";
// import { useState } from "react";
// import { ActivityIndicator, Pressable, Text, View } from "react-native";
// import { AppButton } from "../app-button";
// import KeyboardAvoidingModal from "../keyboard-aware-components/modal";

// interface AddressSelectorModalProps {
//   isVisible: boolean;
//   onClose: () => void;
//   profile?: UserProfile;
//   isProfileLoading?: boolean;
//   onSelectAddress: (addressId: number) => void;
//   selectedAddressId?: number;
// }

// export const AddressSelectorModal = ({
//   isVisible,
//   onClose,
//   onSelectAddress,
//   profile,
//   isProfileLoading,
//   selectedAddressId,
// }: AddressSelectorModalProps) => {
//   const addresses = profile?.Address || [];
//   const [selectedAddress, setSelectedAddress] = useState<number | null>(null);

//   return (
//     <KeyboardAvoidingModal isVisible={isVisible} onClose={onClose}>
//       <View className="flex-row items-center justify-between mb-6 border-b border-gray-100 pb-4">
//         <Text className="font-bold text-xl text-gray-900">
//           Select Shipping Address
//         </Text>
//         <Pressable
//           onPress={() => {
//             router.push("/profile/addresses");
//             onClose();
//           }}
//           className="p-2 bg-purple-50 rounded-full"
//         >
//           <Plus size={18} color="#7c3aed" />
//         </Pressable>
//       </View>

//       {isProfileLoading ? (
//         <View className="py-10">
//           <ActivityIndicator color="#7c3aed" />
//         </View>
//       ) : addresses.length === 0 ? (
//         <View className="py-10 items-center">
//           <MapPin size={40} color="#9ca3af" />
//           <Text className="text-gray-500 mt-4 text-center">
//             No addresses found.{"\n"}Please add one to continue.
//           </Text>
//         </View>
//       ) : (
//         addresses.map((address) => {
//           const isSelected = selectedAddress === address.id;

//           console.log(isSelected, "selected address");

//           return (
//             <Pressable
//               key={address.id.toString()}
//               onPress={() => {
//                 setSelectedAddress(Number(address.id));
//               }}
//               className={`flex-row items-center p-4 mb-3 rounded-2xl border ${
//                 isSelected
//                   ? "bg-purple-50 border-purple-200"
//                   : "bg-white border-gray-200"
//               }`}
//             >
//               <View
//                 className={`w-10 h-10 rounded-full items-center justify-center mr-4 ${
//                   isSelected ? "bg-purple-100" : "bg-gray-100"
//                 }`}
//               >
//                 <MapPin size={20} color={isSelected ? "#4338ca" : "#6b7280"} />
//               </View>

//               <View className="flex-1 pr-4">
//                 <Text className="font-bold text-gray-900 text-base mb-1">
//                   {address.address1}
//                 </Text>
//                 <Text className="text-gray-500 text-sm leading-5">
//                   {address.city}, {address.state} {address.zip}
//                 </Text>
//               </View>

//               {isSelected && (
//                 <View className="w-6 h-6 rounded-full bg-purple-600 items-center justify-center">
//                   <Check size={14} color="#fff" strokeWidth={3} />
//                 </View>
//               )}
//             </Pressable>
//           );
//         })
//       )}

//       {/* Cancel button */}
//       <View className="mt-4 border-t border-gray-100 pt-5">
//         <AppButton
//           title="Select Address"
//           onPress={() => {
//             onSelectAddress(selectedAddress!);
//             onClose();
//           }}
//           disabled={!selectedAddress}
//         />
//       </View>
//     </KeyboardAvoidingModal>
//   );
// };
