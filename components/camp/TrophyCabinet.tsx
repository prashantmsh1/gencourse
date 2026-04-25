import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const TROPHIES = [
    { id: 1, title: '7-Day Streak', icon: require('../../assets/images/fire.png') },
    { id: 2, title: 'Night Owl', icon: require('../../assets/images/star.png') },
    { id: 3, title: 'First Quiz Perfect Score', icon: require('../../assets/images/medal.png') },
];

export default function TrophyCabinet() {
    return (
        <View className="mb-8">
            <Text className="text-xl font-black text-[#f1f5f9] tracking-wider mb-4">
                Trophy Cabinet
            </Text>

            <View className="bg-[#0f172a] rounded-[24px] border border-[#1e293b] p-5 flex-row justify-between" style={styles.cardShadow}>
                {TROPHIES.map((trophy) => (
                    <View key={trophy.id} className="items-center flex-1">
                        <View className="w-16 h-16 bg-[#111827] rounded-full items-center justify-center mb-3 border border-[#1e293b]">
                            <Image source={trophy.icon} className="w-10 h-10" resizeMode="contain" />
                        </View>
                        <Text className="text-xs font-bold text-[#94a3b8] text-center" numberOfLines={2}>
                            {trophy.title}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardShadow: {
        shadowColor: "#f59e0b",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    }
});
