import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Play, Sparkles, Map, Plus } from 'lucide-react-native';

interface ActiveQuestProps {
  questData?: any;
  onPress?: () => void;
  onSummon?: () => void;
}

export default function ActiveQuest({ questData, onPress, onSummon }: ActiveQuestProps) {
    if (!questData) {
        return (
            <View className="mb-8">
                <Text className="text-xl font-black text-[#f1f5f9] tracking-wider mb-4">
                    Current Quest
                </Text>

                <View className="bg-[#0f172a] rounded-[24px] border border-[#1e293b] p-6 items-center" style={styles.cardShadow}>
                    <View className="w-16 h-16 bg-[#1e293b] rounded-2xl items-center justify-center mb-4">
                        <Sparkles color="#a855f7" size={32} />
                    </View>
                    
                    <Text className="text-lg font-bold text-white text-center mb-2">
                        No Active Quests
                    </Text>
                    <Text className="text-sm text-[#94a3b8] text-center mb-6 px-4">
                        You haven't started any journeys yet. Summon a new course or explore the realms.
                    </Text>

                    <View className="flex-row w-full gap-3">
                        <TouchableOpacity 
                            activeOpacity={0.8}
                            onPress={onSummon}
                            className="bg-[#a855f7] flex-1 flex-row items-center justify-center py-[12px] rounded-[16px]"
                        >
                            <Plus color="#fff" size={18} />
                            <Text className="text-white font-bold text-sm ml-2">Summon</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            activeOpacity={0.8}
                            className="bg-[#1e293b] flex-1 flex-row items-center justify-center py-[12px] rounded-[16px] border border-[#334155]"
                        >
                            <Map color="#38bdf8" size={18} />
                            <Text className="text-white font-bold text-sm ml-2">Explore</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    const { enrollment, course } = questData;
    const progress = Math.round((enrollment.completedChapters / course.totalChapters) * 100);

    return (
        <View className="mb-8">
            <Text className="text-xl font-black text-[#f1f5f9] tracking-wider mb-4">
                Current Quest
            </Text>

            <View className="bg-[#0f172a] rounded-[24px] border border-[#1e293b] p-5" style={styles.cardShadow}>
                <View className="flex-row justify-between items-center mb-5">
                    <View className="flex-1 pr-4">
                        <Text className="text-[11px] font-black text-[#10b981] tracking-[2px] uppercase mb-1">
                            Chapter {enrollment.currentChapter} • In Progress
                        </Text>
                        <Text className="text-lg font-bold text-white mb-1">
                            {course.title}
                        </Text>
                        <Text className="text-sm text-[#94a3b8]">
                            Finish to unlock <Text className="font-bold text-[#fbbf24]">{course.xpReward} XP</Text>
                        </Text>
                    </View>
                    
                    {/* Progress Circle */}
                    <View className="w-[60px] h-[60px] rounded-full border-[4px] border-[#1e293b] justify-center items-center relative">
                        <View 
                            className="absolute -top-1 -bottom-1 -left-1 -right-1 rounded-full border-[4px] border-[#a855f7] border-t-transparent border-r-transparent" 
                            style={{ transform: [{ rotate: `${(progress / 100) * 360 - 45}deg` }] }}
                        />
                        <Text className="text-white font-bold text-sm">{progress}%</Text>
                    </View>
                </View>

                <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={onPress}
                    className="bg-[#a855f7] flex-row items-center justify-center py-[14px] rounded-[16px]"
                    style={styles.buttonShadow}
                >
                    <Play color="#fff" size={20} fill="#fff" />
                    <Text className="text-white font-bold text-base ml-2">Continue Quest</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardShadow: {
        shadowColor: "#1e293b",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    buttonShadow: {
        shadowColor: "#a855f7",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 6,
    }
});
