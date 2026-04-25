import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Plus } from 'lucide-react-native';

export default function ForgeCard({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable 
      onPress={onPress}
      className="bg-[#111827] border border-[#1e293b] rounded-[24px] p-4 flex-row items-center mb-10 active:opacity-90"
    >
      <View className="w-16 h-16 bg-[#0f172a] rounded-2xl items-center justify-center border border-[#1e293b]">
        <Image source={require('../../assets/images/scroll.png')} className="w-10 h-10" />
      </View>
      <View className="flex-1 ml-4">
        <Text className="text-white font-black text-lg">Forge New Journey</Text>
        <Text className="text-[#64748b] text-xs font-medium">Use AI to craft a custom learning path</Text>
      </View>
      <View className="w-10 h-10 bg-[#10b981] rounded-full items-center justify-center">
        <Plus color="white" size={24} />
      </View>
    </Pressable>
  );
}
