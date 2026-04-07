import { ReusableDrawer } from "@/components/shared/reusable-drawer";
import { useDrawerStore } from "@/store/drawer-store";
import { Image } from "expo-image";
import { Search, X } from "lucide-react-native";
import React from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

const LAST_SEARCHES = ["Electronics", "Pants", "Three Second", "Long shirt"];
const POPULAR_SEARCHES = [
  {
    id: "1",
    name: "Lunilo Hills jacket",
    searches: "1,6k",
    tag: "Hot",
    color: "bg-red-50 text-red-500",
    image: "https://placeholder.com/100",
  },
  {
    id: "2",
    name: "Denim Jeans",
    searches: "1k",
    tag: "New",
    color: "bg-orange-50 text-orange-500",
    image: "https://placeholder.com/100",
  },
  {
    id: "3",
    name: "Redil Backpack",
    searches: "1,23k",
    tag: "Popular",
    color: "bg-green-50 text-green-500",
    image: "https://placeholder.com/100",
  },
  {
    id: "4",
    name: "JBL Speakers",
    searches: "1,1k",
    tag: "New",
    color: "bg-orange-50 text-orange-500",
    image: "https://placeholder.com/100",
  },
];

export const SearchDrawer = () => {
  const { isSearchOpen, closeSearch } = useDrawerStore();
  const [query, setQuery] = React.useState("");

  return (
    <ReusableDrawer
      isOpen={isSearchOpen}
      onClose={closeSearch}
      size="full"
      anchor="right"
    >
      <View className="pt-2">
        <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 mb-6">
          <Search size={20} color="#9CA3AF" />
          <TextInput
            className="flex-1 ml-3 text-gray-900 font-medium"
            placeholder="Search products..."
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery("")}>
              <X size={18} color="#9CA3AF" />
            </Pressable>
          )}
        </View>

        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-900 font-bold text-lg">Last Search</Text>
          <Pressable>
            <Text className="text-purple-600 font-semibold text-sm">
              Clear All
            </Text>
          </Pressable>
        </View>

        <View className="flex-row flex-wrap gap-2 mb-8">
          {LAST_SEARCHES.map((item, i) => (
            <View
              key={i}
              className="flex-row items-center bg-gray-50 border border-gray-100 rounded-xl px-4 py-2"
            >
              <Text className="text-gray-600 mr-2">{item}</Text>
              <X size={14} color="#9CA3AF" />
            </View>
          ))}
        </View>

        <Text className="text-gray-900 font-bold text-lg mb-4">
          Popular Search
        </Text>

        <ScrollView showsVerticalScrollIndicator={false} className="mb-10">
          {POPULAR_SEARCHES.map((item) => (
            <View
              key={item.id}
              className="flex-row items-center mb-4 bg-gray-50/50 p-3 rounded-2xl"
            >
              <View className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden">
                <Image source={item.image} className="w-full h-full" />
              </View>
              <View className="flex-1 ml-4">
                <Text className="text-gray-900 font-bold">{item.name}</Text>
                <Text className="text-gray-400 text-xs mt-1">
                  {item.searches} Search today
                </Text>
              </View>
              <View className={`${item.color} px-3 py-1 rounded-lg`}>
                <Text className="text-[10px] font-bold uppercase">
                  {item.tag}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </ReusableDrawer>
  );
};
