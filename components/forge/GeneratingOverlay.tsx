import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { Sparkles } from 'lucide-react-native';

const STATUS_MESSAGES = [
  "Summoning the AI Oracle...",
  "Forging chapters...",
  "Crafting quizzes...",
  "Generating visual metaphors...",
  "Encoding knowledge scrolls...",
  "Polishing the experience...",
];

export default function GeneratingOverlay() {
  const [statusIndex, setStatusIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // Change text when invisible
        setStatusIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
        // Fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={StyleSheet.absoluteFill} className="bg-main/90 items-center justify-center z-[100] px-10">
      <View className="bg-surface-mid border border-element-rim p-10 rounded-[40px] items-center w-full" style={styles.cardShadow}>
        <View className="w-20 h-20 bg-success-emerald/10 rounded-3xl items-center justify-center mb-6 relative">
          <ActivityIndicator size="large" color="#10b981" />
          <View className="absolute">
            <Sparkles color="#10b981" size={30} />
          </View>
        </View>

        <Text className="text-xl font-black text-white text-center mb-2 tracking-tight">
          Forging New Journey
        </Text>
        
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text className="text-sm text-text-secondary text-center font-medium h-5">
            {STATUS_MESSAGES[statusIndex]}
          </Text>
        </Animated.View>

        <View className="flex-row gap-2 mt-8">
          {[0, 1, 2].map((i) => (
            <View 
              key={i} 
              className={`w-1.5 h-1.5 rounded-full ${i === statusIndex % 3 ? 'bg-success-emerald' : 'bg-element-rim'}`} 
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 20,
  }
});
