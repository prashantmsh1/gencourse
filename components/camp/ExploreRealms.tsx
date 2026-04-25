import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Lock } from 'lucide-react-native';

const REALMS = [
    { id: 1, title: 'React Native Realm', icon: require('../../assets/images/map.png'), status: 'Trending', locked: false, color: '#fbbf24' },
    { id: 2, title: 'State Citadel', icon: require('../../assets/images/fortress.png'), status: 'Locked', locked: true, color: '#64748b' },
    { id: 3, title: 'API Outpost', icon: require('../../assets/images/outpost.png'), status: 'New', locked: false, color: '#38bdf8' },
];

export default function ExploreRealms() {
    return (
        <View className="mb-8">
            <Text className="text-xl font-black text-[#f1f5f9] tracking-wider mb-4">
                Unlockable Realms
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-6 px-6">
                {REALMS.map((realm, index) => (
                    <TouchableOpacity 
                        key={realm.id}
                        activeOpacity={0.8}
                        className={`w-40 mr-4 rounded-[24px] bg-[#0f172a] border ${realm.locked ? 'border-[#1e293b] opacity-80' : 'border-[#1e293b]'}`}
                        style={!realm.locked && styles.cardShadow}
                    >
                        {/* Status Badge */}
                        <View className="absolute top-3 right-3 z-10">
                            {realm.locked ? (
                                <View className="bg-[#1e293b] p-1.5 rounded-full">
                                    <Lock color="#94a3b8" size={14} />
                                </View>
                            ) : (
                                <View className="bg-[#0b0c15]/80 px-2 py-1 rounded-full border border-element-rim">
                                    <Text className="text-[9px] font-black uppercase text-white tracking-widest" style={{ color: realm.color }}>
                                        {realm.status}
                                    </Text>
                                </View>
                            )}
                        </View>

                        <View className="p-5 items-center justify-center">
                            <View className={`w-16 h-16 rounded-full items-center justify-center mb-3 ${realm.locked ? 'bg-[#1e293b]' : 'bg-[#1e293b]'}`}>
                                <Image source={realm.icon} className="w-10 h-10" resizeMode="contain" style={{ opacity: realm.locked ? 0.5 : 1 }} />
                            </View>
                            
                            <Text className={`text-center font-bold text-sm ${realm.locked ? 'text-[#94a3b8]' : 'text-white'}`}>
                                {realm.title}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
                <View className="w-6" /> {/* Right padding for scroll */}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    cardShadow: {
        shadowColor: "#38bdf8",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    }
});
