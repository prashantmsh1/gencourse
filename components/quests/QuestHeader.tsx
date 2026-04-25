import React from 'react';
import { View, Text, Image } from 'react-native';

export default function QuestHeader() {
  return (
    <View className="flex-row justify-between items-center mb-8">
      <View>
        <Text className="text-[#94a3b8] text-[10px] font-black uppercase tracking-[2px] mb-1">Epic Missions</Text>
        <Text className="text-white text-3xl font-black">Quest Log</Text>
      </View>
      <View className="flex-row items-center bg-[#1e293b] px-3 py-1.5 rounded-full border border-[#334155]">
        <Image source={require('../../assets/images/gem.png')} className="w-4 h-4 mr-2" />
        <Text className="text-white font-black text-xs">150</Text>
      </View>
    </View>
  );
}
