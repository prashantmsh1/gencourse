import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckCircle2, Circle, Clock } from 'lucide-react-native';

export default function DailyBounties({ bounties, onCompleteBounty }: { bounties?: any[], onCompleteBounty?: (id: number) => void }) {
    const getRewardIcon = (type: string) => {
        switch (type) {
            case 'xp': return require('../../assets/images/lightning.png');
            case 'coins': return require('../../assets/images/coin.png');
            case 'gems': return require('../../assets/images/gem.png');
            default: return require('../../assets/images/coin.png');
        }
    };

    const formatTimeLeft = () => {
        if (!bounties?.[0]?.expiresAt) return "Refreshing soon";
        const expires = new Date(bounties[0].expiresAt);
        const now = new Date();
        const diff = expires.getTime() - now.getTime();
        if (diff <= 0) return "Refreshing now...";
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `Refreshes in ${hours}h ${mins}m`;
    };

    return (
        <View className="mb-8">
            <Text className="text-xl font-black text-[#f1f5f9] tracking-wider mb-4">
                Daily Bounties
            </Text>

            <View className="bg-[#0f172a] rounded-[24px] border border-[#1e293b] p-4" style={styles.cardShadow}>
                {bounties && bounties.length > 0 ? (
                    bounties.map((bounty, index) => (
                        <View key={bounty.id}>
                            <TouchableOpacity 
                                activeOpacity={0.7}
                                className="flex-row items-center justify-between py-3"
                                onPress={() => !bounty.completed && onCompleteBounty?.(bounty.id)}
                            >
                                <View className="flex-row items-center flex-1 pr-4">
                                    {bounty.completed ? (
                                        <CheckCircle2 color="#10b981" size={24} />
                                    ) : (
                                        <Circle color="#64748b" size={24} />
                                    )}
                                    
                                    <View className="ml-3 flex-1">
                                        <Text className={`text-base font-bold ${bounty.completed ? 'text-[#94a3b8] line-through' : 'text-white'}`}>
                                            {bounty.title}
                                        </Text>
                                        <Text className="text-xs text-[#64748b]" numberOfLines={1}>
                                            {bounty.description}
                                        </Text>
                                    </View>
                                </View>
                                
                                <View className={`flex-row items-center px-3 py-1.5 rounded-full ${bounty.completed ? 'bg-[#1e293b]/50' : 'bg-[#fbbf24]/10 border border-[#fbbf24]/30'}`}>
                                    <Text className={`text-xs font-black mr-1.5 ${bounty.completed ? 'text-[#64748b]' : 'text-[#fbbf24]'}`}>
                                        {bounty.rewardAmount} {bounty.rewardType.toUpperCase()}
                                    </Text>
                                    <Image source={getRewardIcon(bounty.rewardType)} className="w-5 h-5" resizeMode="contain" />
                                </View>
                            </TouchableOpacity>
                            
                            {/* Divider */}
                            {index < bounties.length - 1 && (
                                <View className="h-[1px] w-full bg-[#1e293b]" />
                            )}
                        </View>
                    ))
                ) : (
                    <View className="py-4 items-center">
                        <Text className="text-[#94a3b8] font-medium">Summoning bounties...</Text>
                    </View>
                )}

                {/* Footer / Refresh Timer */}
                <View className="mt-3 flex-row items-center justify-center border-t border-[#1e293b] pt-3">
                    <Clock size={12} color="#64748b" />
                    <Text className="text-[10px] text-[#64748b] font-bold uppercase tracking-widest ml-1.5">
                        {formatTimeLeft()}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardShadow: {
        shadowColor: "#fbbf24",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    }
});
