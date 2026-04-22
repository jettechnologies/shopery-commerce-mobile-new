import { AppButton } from "@/components/app-button";
import { AppHeader } from "@/components/app-header";
import KeyboardAvoidingModal from "@/components/keyboard-aware-components/modal";
import { SafeScreen } from "@/components/safe-screen";
import {
  useCreateAddress,
  useGetProfile,
  useUpdateAddress,
} from "@/services/tanstack-query/queries/use-profile-query";
import { ProfileAddress } from "@/types/response-types.";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Pencil, Plus } from "lucide-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { z } from "zod";

const AddressSchema = z.object({
  address1: z.string().min(3, "Address is required"),
  address2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().min(2, "ZIP is required"),
  country: z.string().min(2, "Country is required"),
});

type AddressFormData = z.infer<typeof AddressSchema>;

const Addresses = () => {
  const { data: profile, isLoading } = useGetProfile();
  const createAddressMutation = useCreateAddress();
  const updateAddressMutation = useUpdateAddress();

  const [modalVisible, setModalVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState<ProfileAddress | null>(
    null,
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
  });

  const addresses = profile?.Address || [];

  const onOpenModal = (address?: ProfileAddress) => {
    if (address) {
      setEditingAddress(address);
      reset({
        address1: address.address1,
        address2: address.address2 || "",
        city: address.city,
        state: address.state,
        zip: address.zip,
        country: address.country,
      });
    } else {
      setEditingAddress(null);
      reset({
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        country: "",
      });
    }
    setModalVisible(true);
  };

  const onSubmit = async (data: AddressFormData) => {
    try {
      if (editingAddress) {
        await updateAddressMutation.mutateAsync({
          id: editingAddress.id.toString(),
          data,
        });
      } else {
        await createAddressMutation.mutateAsync(data);
      }
      setModalVisible(false);
    } catch (err) {
      // Error handled by mutation meta
      console.log(err);
    }
  };

  if (isLoading) {
    return (
      <SafeScreen>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#7c3aed" />
        </View>
      </SafeScreen>
    );
  }

  return (
    <SafeScreen>
      <View className="flex-1 px-5 pt-4">
        <AppHeader
          title="My Address"
          variant="secondary"
          rightElement={
            <Pressable
              onPress={() => onOpenModal()}
              className="w-10 h-10 bg-purple-600 rounded-full items-center justify-center"
            >
              <Plus size={20} color="#fff" />
            </Pressable>
          }
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40, marginTop: 10 }}
        >
          {addresses.length === 0 ? (
            <View className="items-center justify-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              <MapPin size={48} color="#9ca3af" />
              <Text className="text-gray-500 mt-4 font-medium">
                No addresses saved yet
              </Text>
            </View>
          ) : (
            addresses.map((address) => (
              <View
                key={address.id.toString()}
                className="bg-white p-5 rounded-3xl mb-4 border border-gray-100 shadow-sm"
              >
                <View className="flex-row justify-between items-start mb-2">
                  <View className="flex-row items-center bg-purple-50 px-3 py-1 rounded-full">
                    <MapPin size={14} color="#7c3aed" />
                    <Text className="ml-1 text-purple-600 text-xs font-bold">
                      Address
                    </Text>
                  </View>
                  <View className="flex-row">
                    <Pressable
                      onPress={() => onOpenModal(address)}
                      className="p-2 bg-gray-50 rounded-full mr-2"
                    >
                      <Pencil size={16} color="#4b5563" />
                    </Pressable>
                  </View>
                </View>

                <Text className="text-gray-900 font-bold text-lg mb-1">
                  {address.address1}
                </Text>
                {address.address2 && (
                  <Text className="text-gray-600 text-sm mb-1">
                    {address.address2}
                  </Text>
                )}
                <Text className="text-gray-600 text-sm">
                  {address.city}, {address.state} {address.zip}
                </Text>
                <Text className="text-gray-600 text-sm">{address.country}</Text>
              </View>
            ))
          )}
        </ScrollView>

        <KeyboardAvoidingModal
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
        >
          <View className="pb-4">
            <Text className="text-xl font-bold text-gray-900 mb-6">
              {editingAddress ? "Edit Address" : "Add New Address"}
            </Text>

            <View className="flex flex-col gap-y-4">
              <View>
                <Text className="text-gray-700 font-semibold mb-2">
                  Address Line 1
                </Text>
                <Controller
                  control={control}
                  name="address1"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className={`bg-gray-50 p-4 rounded-2xl border ${
                        errors.address1 ? "border-red-500" : "border-gray-200"
                      }`}
                      placeholder="Street address, P.O. box"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                {errors.address1 && (
                  <Text className="text-red-500 text-xs mt-1">
                    {errors.address1.message}
                  </Text>
                )}
              </View>

              <View>
                <Text className="text-gray-700 font-semibold mb-2">
                  Address Line 2 (Optional)
                </Text>
                <Controller
                  control={control}
                  name="address2"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className="bg-gray-50 p-4 rounded-2xl border border-gray-200"
                      placeholder="Apartment, suite, unit, building, floor"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
              </View>

              <View className="flex flex-row gap-x-4">
                <View className="flex-1">
                  <Text className="text-gray-700 font-semibold mb-2">City</Text>
                  <Controller
                    control={control}
                    name="city"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        className={`bg-gray-50 p-4 rounded-2xl border ${
                          errors.city ? "border-red-500" : "border-gray-200"
                        }`}
                        placeholder="City"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                  {errors.city && (
                    <Text className="text-red-500 text-xs mt-1">
                      {errors.city.message}
                    </Text>
                  )}
                </View>

                <View className="flex-1">
                  <Text className="text-gray-700 font-semibold mb-2">
                    State
                  </Text>
                  <Controller
                    control={control}
                    name="state"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        className={`bg-gray-50 p-4 rounded-2xl border ${
                          errors.state ? "border-red-500" : "border-gray-200"
                        }`}
                        placeholder="State"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                  {errors.state && (
                    <Text className="text-red-500 text-xs mt-1">
                      {errors.state.message}
                    </Text>
                  )}
                </View>
              </View>

              <View className="flex flex-row gap-x-4">
                <View className="flex-1">
                  <Text className="text-gray-700 font-semibold mb-2">ZIP</Text>
                  <Controller
                    control={control}
                    name="zip"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        className={`bg-gray-50 p-4 rounded-2xl border ${
                          errors.zip ? "border-red-500" : "border-gray-200"
                        }`}
                        placeholder="ZIP"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                  {errors.zip && (
                    <Text className="text-red-500 text-xs mt-1">
                      {errors.zip.message}
                    </Text>
                  )}
                </View>

                <View className="flex-1">
                  <Text className="text-gray-700 font-semibold mb-2">
                    Country
                  </Text>
                  <Controller
                    control={control}
                    name="country"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        className={`bg-gray-50 p-4 rounded-2xl border ${
                          errors.country ? "border-red-500" : "border-gray-200"
                        }`}
                        placeholder="Country"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                  {errors.country && (
                    <Text className="text-red-500 text-xs mt-1">
                      {errors.country.message}
                    </Text>
                  )}
                </View>
              </View>
            </View>
            <AppButton
              title={editingAddress ? "Update Address" : "Save Address"}
              onPress={handleSubmit(onSubmit)}
              isLoading={
                createAddressMutation.isPending ||
                updateAddressMutation.isPending
              }
              className="mt-8 bg-purple-600 rounded-2xl h-14"
            />
          </View>
        </KeyboardAvoidingModal>
      </View>
    </SafeScreen>
  );
};

export default Addresses;
