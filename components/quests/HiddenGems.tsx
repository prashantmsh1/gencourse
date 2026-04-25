import React from 'react';
import { View, Text, Image } from 'react-native';
import { Lock } from 'lucide-react-native';

const GEMS = [
  { id: 1, title: 'The Speedster', requirement: 'Complete 3 chapters in a single day to unlock this prize.', xp: 500, status: 'unlocked', icon: 'gem' },
  { id: 2, title: 'SECRET TASK', requirement: 'Complete more courses to reveal this hidden gem.', xp: 1000, status: 'locked', icon: 'lock' },
  { id: 3, title: 'SECRET TASK', requirement: 'Complete more courses to reveal this hidden gem.', xp: 2000, status: 'locked', icon: 'lock' },
];

export default function HiddenGems() {
  return (
    <View className="mb-8">
      <View className="flex-row items-center mb-6">
        <Text className="text-[#fbbf24] text-xs font-black uppercase tracking-[2px]">Hidden Gems</Text>
        <View className="ml-2 w-1.5 h-1.5 bg-[#fbbf24] rounded-full" />
      </View>

      <View className="gap-y-4">
        {GEMS.map((gem) => (
          <View key={gem.id} className={`p-4 rounded-[24px] border flex-row items-center ${
            gem.status === 'unlocked' ? 'bg-[#111827] border-[#1e293b]' : 'bg-[#0b0c15] border-[#1e293b] opacity-60'
          }`}>
            <View className={`w-14 h-14 rounded-2xl items-center justify-center ${
              gem.status === 'unlocked' ? 'bg-[#0f172a] border border-[#1e293b]' : 'bg-[#111827] border border-[#1e293b]'
            }`}>
              {gem.status === 'unlocked' ? (
                <Image source={require('../../assets/images/gem.png')} className="w-8 h-8" />
              ) : (
                <Lock color="#475569" size={24} />
              )}
            </View>

            <View className="flex-1 ml-4">
              <View className="flex-row justify-between items-start mb-1">
                <Text className={`font-black text-sm ${gem.status === 'unlocked' ? 'text-white' : 'text-[#64748b]'}`}>
                  {gem.title}
                </Text>
                <View className="bg-[#fbbf24]/10 px-2 py-1 rounded-lg border border-[#fbbf24]/20">
                  <Text className="text-[#fbbf24] text-[10px] font-black">+{gem.xp} XP</Text>
                </View>
              </View>
              <Text className="text-[#64748b] text-[11px] font-medium leading-4 mr-8">
                {gem.requirement}
              </Text>
            </View>
            
            {gem.status === 'locked' && (
              <View className="absolute top-2 right-2 -rotate-12 bg-[#1e293b] px-2 py-0.5 rounded border border-[#334155]">
                <Text className="text-[#475569] text-[8px] font-black uppercase">Locked</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
