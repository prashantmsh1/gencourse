import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function PlayerCard({ profile, levels }: { profile?: any, levels?: any[] }) {
    const name = profile?.name || "Nomad";
    const level = profile?.level || 1;
    const title = profile?.title || "Nomad";
    const xp = profile?.xp || 0;
    const imageUrl = profile?.image_url;
    
    // Find next level data from reference table
    const currentLevelData = levels?.find(l => l.level === level);
    const nextLevelData = levels?.find(l => l.level === level + 1);
    const nextLevelXp = nextLevelData?.xpRequired || (level * 1000); // Fallback
    const currentLevelXp = currentLevelData?.xpRequired || 0;
    
    // XP within current level
    const xpInLevel = xp - currentLevelXp;
    const xpRequiredForNext = nextLevelXp - currentLevelXp;
    const xpProgress = Math.min((xpInLevel / xpRequiredForNext) * 100, 100);
    
    return (
        <View className="mb-6 relative overflow-hidden rounded-[24px]" style={styles.cardShadow}>
            {/* Neon Gradient Background Simulation */}
            <View className="absolute inset-0 bg-[#0f172a]" />
            <View className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-[#a855f7] opacity-30" />
            <View className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-[#38bdf8] opacity-30" />

            <View className="p-6 flex-row items-center border border-[#1e293b] rounded-[24px] z-10">
                <Image 
                    source={imageUrl ? { uri: imageUrl } : require('../../assets/images/avatar.png')} 
                    className="w-16 h-16 rounded-full border-2 border-[#a855f7]"
                />
                
                <View className="ml-4 flex-1">
                    <Text className="text-xl font-bold text-[#f8fafc]">{name}</Text>
                    <Text className="text-xs font-black text-[#38bdf8] mt-1 tracking-widest uppercase">
                        Level {level} {title}
                    </Text>
                    
                    <View className="mt-3">
                        <View className="flex-row justify-between mb-1">
                            <Text className="text-xs text-[#94a3b8] font-bold">XP</Text>
                            <Text className="text-xs text-[#94a3b8] font-bold">{xp} / {nextLevelXp}</Text>
                        </View>
                        <View className="h-2 w-full bg-[#1e293b] rounded-full overflow-hidden">
                            <View className="h-full bg-[#a855f7]" style={{ width: `${xpProgress}%` }} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardShadow: {
        shadowColor: "#a855f7",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 5,
    }
});
