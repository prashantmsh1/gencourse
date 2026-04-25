import React from 'react';
import { View, Text } from 'react-native';

interface ActiveMissionsProps {
  missions?: any[];
}

export default function ActiveMissions({ missions = [] }: ActiveMissionsProps) {
  return (
    <View className="mb-10">
      <View className="flex-row items-center mb-4">
        <Text className="text-[#94a3b8] text-xs font-black uppercase tracking-wider mr-2">Active Missions</Text>
        <View className="bg-[#1e293b] px-2 py-0.5 rounded-md">
          <Text className="text-[#94a3b8] text-[10px] font-black">{missions.length}</Text>
        </View>
      </View>

      {missions.length === 0 ? (
        <View className="bg-[#0f172a]/50 border border-dashed border-[#1e293b] rounded-[24px] py-12 items-center justify-center">
          <Text className="text-[#64748b] font-medium">No active missions. Start a new one!</Text>
        </View>
      ) : (
        <View>
          {/* Mission cards would go here */}
        </View>
      )}
    </View>
  );
}
