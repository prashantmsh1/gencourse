import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const ICON_MAP: { [key: string]: any } = {
    'fire': require('../../assets/images/fire.png'),
    'star': require('../../assets/images/star.png'),
    'medal': require('../../assets/images/medal.png'),
    'trophy': require('../../assets/images/trophy.png'),
    'gem': require('../../assets/images/gem.png'),
    'lightning': require('../../assets/images/lightning.png'),
    'shield': require('../../assets/images/shield.png'),
    'crown': require('../../assets/images/medal.png'), // Fallback
};

interface TrophyCabinetProps {
    allTrophies: any[];
    userTrophies: any[];
}

export default function TrophyCabinet({ allTrophies = [], userTrophies = [] }: TrophyCabinetProps) {
    const earnedTrophyIds = new Set(userTrophies.map(t => t.id));

    return (
        <View className="mb-8">
            <Text className="text-xl font-black text-[#f1f5f9] tracking-wider mb-4">
                Trophy Cabinet
            </Text>

            <View className="bg-[#0f172a] rounded-[32px] border border-[#1e293b] p-6" style={styles.cardShadow}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 20 }}>
                    {allTrophies.length > 0 ? (
                        allTrophies.map((trophy) => {
                            const isEarned = earnedTrophyIds.has(trophy.id);
                            return (
                                <View key={trophy.id} className="items-center w-24">
                                    <View 
                                        className={`w-16 h-16 rounded-2xl items-center justify-center mb-3 border ${
                                            isEarned ? 'bg-[#1e293b] border-[#a855f7]/50' : 'bg-[#111827]/50 border-[#1e293b] opacity-40'
                                        }`}
                                    >
                                        <Image 
                                            source={ICON_MAP[trophy.icon] || ICON_MAP['trophy']} 
                                            className="w-10 h-10" 
                                            style={{ opacity: isEarned ? 1 : 0.4 }}
                                            resizeMode="contain" 
                                        />
                                        {isEarned && (
                                            <View className="absolute -top-1 -right-1 bg-[#a855f7] w-5 h-5 rounded-full items-center justify-center border-2 border-[#0f172a]">
                                                <View className="w-1.5 h-1.5 bg-white rounded-full" />
                                            </View>
                                        )}
                                    </View>
                                    <Text 
                                        className={`text-[11px] font-black text-center uppercase tracking-tighter ${
                                            isEarned ? 'text-white' : 'text-[#64748b]'
                                        }`} 
                                        numberOfLines={1}
                                    >
                                        {trophy.title}
                                    </Text>
                                    {!isEarned && (
                                        <Text className="text-[9px] text-[#475569] text-center mt-1 font-medium leading-tight">
                                            {trophy.requirement}
                                        </Text>
                                    )}
                                </View>
                            );
                        })
                    ) : (
                        <View className="py-4 items-center justify-center w-full">
                            <Text className="text-[#64748b] font-medium italic">No trophies available yet.</Text>
                        </View>
                    )}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardShadow: {
        shadowColor: "#a855f7",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 5,
    }
});
