import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Play } from 'lucide-react-native';

export default function ActiveQuest() {
    return (
        <View className="mb-8">
            <Text className="text-xl font-black text-[#f1f5f9] tracking-wider mb-4">
                Current Quest
            </Text>

            <View className="bg-[#0f172a] rounded-[24px] border border-[#1e293b] p-5" style={styles.cardShadow}>
                <View className="flex-row justify-between items-center mb-5">
                    <View className="flex-1 pr-4">
                        <Text className="text-[11px] font-black text-[#10b981] tracking-[2px] uppercase mb-1">
                            Chapter 3 • In Progress
                        </Text>
                        <Text className="text-lg font-bold text-white mb-1">
                            Advanced State Management
                        </Text>
                        <Text className="text-sm text-[#94a3b8]">
                            Finish this chapter to unlock <Text className="font-bold text-[#fbbf24]">100 XP</Text>
                        </Text>
                    </View>
                    
                    {/* Fake circular progress */}
                    <View className="w-[60px] h-[60px] rounded-full border-[4px] border-[#1e293b] justify-center items-center relative">
                        <View className="absolute -top-1 -bottom-1 -left-1 -right-1 rounded-full border-[4px] border-[#a855f7] border-t-transparent border-r-transparent rotate-45" />
                        <Text className="text-white font-bold text-sm">60%</Text>
                    </View>
                </View>

                <TouchableOpacity 
                    activeOpacity={0.8}
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
