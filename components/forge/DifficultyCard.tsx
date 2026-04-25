import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Shield, Sword, Flame, Lock } from 'lucide-react-native';

interface DifficultyCardProps {
  difficulty: 'easy' | 'medium' | 'hard';
  selected: boolean;
  locked: boolean;
  onSelect: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

export default function DifficultyCard({ difficulty, selected, locked, onSelect }: DifficultyCardProps) {
  const config = {
    easy: {
      title: 'Easy',
      desc: 'Introductory level, simplified concepts.',
      color: '#10b981', // Emerald
      icon: <Shield color={selected ? '#fff' : '#10b981'} size={24} />,
    },
    medium: {
      title: 'Medium',
      desc: 'Standard depth, core principles.',
      color: '#a855f7', // Purple
      icon: <Sword color={selected ? '#fff' : '#a855f7'} size={24} />,
    },
    hard: {
      title: 'Hard',
      desc: 'Deep dive, advanced mastery.',
      color: '#fbbf24', // Amber
      icon: <Flame color={selected ? '#fff' : '#fbbf24'} size={24} />,
    },
  }[difficulty];

  return (
    <TouchableOpacity
      activeOpacity={locked ? 1 : 0.8}
      onPress={() => !locked && onSelect(difficulty)}
      className={`flex-1 p-4 rounded-2xl border ${selected ? 'border-primary-purple' : 'border-element-rim'} ${locked ? 'opacity-60' : 'opacity-100'} ${selected ? 'bg-primary-purple/10' : 'bg-surface-low'}`}
      style={selected ? [styles.selectedShadow, { shadowColor: config.color }] : {}}
    >
      <View className="flex-row justify-between items-start mb-2">
        <View className={`p-2 rounded-xl ${selected ? 'bg-primary-purple' : 'bg-surface-mid'}`}>
          {config.icon}
        </View>
        {locked && (
          <View className="bg-alert-amber px-1.5 py-0.5 rounded-md flex-row items-center">
            <Lock color="#000" size={10} />
            <Text className="text-[8px] font-black text-black ml-1 uppercase">PRO</Text>
          </View>
        )}
      </View>
      
      <Text className={`font-black text-sm mb-1 ${selected ? 'text-white' : 'text-text-body'}`}>
        {config.title}
      </Text>
      <Text className="text-[10px] text-text-muted leading-tight">
        {config.desc}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  selectedShadow: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  }
});
