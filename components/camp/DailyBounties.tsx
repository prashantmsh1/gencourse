import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckCircle2, Circle } from 'lucide-react-native';

const BOUNTIES = [
    { id: 1, title: 'Study for 15 minutes', reward: '50 Coins', icon: require('../../assets/images/coin.png'), completed: true },
    { id: 2, title: 'Ace 1 Quiz', reward: '1 Gem', icon: require('../../assets/images/gem.png'), completed: false },
    { id: 3, title: 'Start a new Topic', reward: '20 XP', icon: require('../../assets/images/rocket.png'), completed: false },
];

export default function DailyBounties() {
    return (
        <View className="mb-8">
            <Text className="text-xl font-black text-[#f1f5f9] tracking-wider mb-4">
                Daily Bounties
            </Text>

            <View className="bg-[#0f172a] rounded-[24px] border border-[#1e293b] p-4" style={styles.cardShadow}>
                {BOUNTIES.map((bounty, index) => (
                    <View key={bounty.id}>
                        <TouchableOpacity 
                            activeOpacity={0.7}
                            className="flex-row items-center justify-between py-3"
                        >
                            <View className="flex-row items-center flex-1 pr-4">
                                {bounty.completed ? (
                                    <CheckCircle2 color="#10b981" size={24} />
                                ) : (
                                    <Circle color="#64748b" size={24} />
                                )}
                                
                                <Text className={`ml-3 text-base font-bold ${bounty.completed ? 'text-[#94a3b8] line-through' : 'text-white'}`}>
                                    {bounty.title}
                                </Text>
                            </View>
                            
                            <View className={`flex-row items-center px-3 py-1.5 rounded-full ${bounty.completed ? 'bg-[#1e293b]/50' : 'bg-[#fbbf24]/10 border border-[#fbbf24]/30'}`}>
                                <Text className={`text-xs font-black mr-1.5 ${bounty.completed ? 'text-[#64748b]' : 'text-[#fbbf24]'}`}>
                                    {bounty.reward}
                                </Text>
                                <Image source={bounty.icon} className="w-5 h-5" resizeMode="contain" />
                            </View>
                        </TouchableOpacity>
                        
                        {/* Divider */}
                        {index < BOUNTIES.length - 1 && (
                            <View className="h-[1px] w-full bg-[#1e293b]" />
                        )}
                    </View>
                ))}
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
