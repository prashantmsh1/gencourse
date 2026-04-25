import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function QuestForge({ onPress }: { onPress?: () => void }) {
    return (
        <TouchableOpacity 
            activeOpacity={0.9} 
            className="mb-8"
            onPress={onPress}
        >
            <View className="relative overflow-hidden rounded-[32px] border border-[#a855f7] bg-[#0f172a]" style={styles.glowShadow}>
                <View className="absolute inset-0 bg-[#6366f1] opacity-20" />
                <View className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#a855f7] opacity-40" />
                
                <View className="p-6 flex-row items-center justify-between">
                    <View className="flex-1 pr-4">
                        <Text className="text-[22px] font-black text-white mb-2 tracking-wide leading-tight">
                            Summon a New Quest
                        </Text>
                        <Text className="text-[#94a3b8] text-sm">
                            Craft a custom AI-generated learning path.
                        </Text>
                    </View>
                    
                    <Image 
                        source={require('../../assets/images/crystal.png')} 
                        className="w-20 h-20"
                        resizeMode="contain"
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    glowShadow: {
        shadowColor: "#a855f7",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 10,
    }
});
