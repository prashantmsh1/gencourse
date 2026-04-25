import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ChevronRight, BookOpen, Clock } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface ActiveMissionsProps {
  missions?: any[];
}

export default function ActiveMissions({ missions = [] }: ActiveMissionsProps) {
  const router = useRouter();

  return (
    <View className="mb-10">
      <View className="flex-row items-center mb-4">
        <Text className="text-[#94a3b8] text-xs font-black uppercase tracking-wider mr-2">Active Missions</Text>
        <View className="bg-[#1e293b] px-2 py-0.5 rounded-md">
          <Text className="text-[#94a3b8] text-[10px] font-black">{missions.length}</Text>
        </View>
      </View>

      {missions.length === 0 ? (
        <View className="bg-[#0f172a]/50 border border-dashed border-[#1e293b] rounded-[24px] py-12 items-center justify-center">
          <Text className="text-[#64748b] font-medium">No active missions. Start a new one!</Text>
        </View>
      ) : (
        <View className="gap-4">
          {missions.map((mission) => {
            const { enrollment, course } = mission;
            const progress = Math.round((enrollment.completedChapters / course.totalChapters) * 100);
            
            return (
              <TouchableOpacity
                key={course.id}
                activeOpacity={0.8}
                onPress={() => router.push(`/course/${course.id}`)}
                className="bg-[#0f172a] border border-[#1e293b] rounded-[24px] p-4 flex-row items-center"
                style={styles.cardShadow}
              >
                {/* Course Icon/Thumbnail placeholder */}
                <View className="w-14 h-14 bg-[#1e293b] rounded-2xl items-center justify-center mr-4 border border-[#334155]">
                   <BookOpen color="#a855f7" size={24} />
                </View>

                <View className="flex-1">
                   <Text className="text-white font-bold text-base mb-1" numberOfLines={1}>
                     {course.title}
                   </Text>
                   
                   <View className="flex-row items-center">
                      <View className="flex-1 h-1.5 bg-[#1e293b] rounded-full mr-3 overflow-hidden">
                        <View 
                          className="h-full bg-[#a855f7] rounded-full" 
                          style={{ width: `${progress}%` }} 
                        />
                      </View>
                      <Text className="text-[10px] font-black text-[#94a3b8]">{progress}%</Text>
                   </View>

                   <View className="flex-row items-center mt-2">
                      <Text className="text-[10px] font-bold text-[#10b981] uppercase tracking-wider">
                        Chapter {enrollment.currentChapter}
                      </Text>
                      <View className="w-1 h-1 bg-[#334155] rounded-full mx-2" />
                      <Text className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">
                        {course.difficulty}
                      </Text>
                   </View>
                </View>

                <View className="ml-2">
                   <ChevronRight color="#334155" size={20} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  }
});
