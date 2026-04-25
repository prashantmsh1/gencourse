import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ChevronLeft, Play, BookOpen, Clock, Award } from 'lucide-react-native';
import { getCourseWithContent } from '@/services/course.service';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function CourseDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchCourse();
    }
  }, [id]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const data = await getCourseWithContent(Number(id));
      setCourse(data);
    } catch (error) {
      console.error("Error fetching course:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-main items-center justify-center">
        <ActivityIndicator size="large" color="#a855f7" />
      </View>
    );
  }

  if (!course) {
    return (
      <View className="flex-1 bg-main items-center justify-center">
        <Text className="text-white font-bold">Course not found</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4">
          <Text className="text-primary-purple">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-main">
      <StatusBar style="light" />
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header Image / Thumbnail */}
        <View className="relative w-full h-80">
          <View className="absolute inset-0 bg-surface-low items-center justify-center">
             {/* Dynamic placeholder for thumbnail if not a real URL */}
             <View className="w-full h-full bg-[#0b0c15] items-center justify-center">
                <View style={[styles.glow, { backgroundColor: '#a855f72a' }]} />
                <Image 
                    source={require('../../../assets/images/scroll.png')} 
                    className="w-40 h-40"
                    resizeMode="contain"
                />
             </View>
          </View>
          
          <View className="absolute inset-0 bg-gradient-to-t from-main to-transparent opacity-60" />
          
          <TouchableOpacity 
            onPress={() => router.back()}
            className="absolute top-12 left-6 p-2 bg-main/50 rounded-full border border-element-rim"
          >
            <ChevronLeft color="#fff" size={24} />
          </TouchableOpacity>

          <View className="absolute bottom-6 left-6 right-6">
            <View className="bg-primary-purple/20 self-start px-3 py-1 rounded-lg border border-primary-purple/30 mb-2">
              <Text className="text-primary-purple font-black text-[10px] uppercase tracking-widest">{course.category || 'Journey'}</Text>
            </View>
            <Text className="text-3xl font-black text-white leading-tight mb-2">{course.title}</Text>
            <View className="flex-row items-center">
              <View className="flex-row items-center mr-4">
                <Clock color="#94a3b8" size={14} className="mr-1" />
                <Text className="text-text-secondary text-xs font-bold">{course.totalChapters} Chapters</Text>
              </View>
              <View className="flex-row items-center">
                <Award color="#fbbf24" size={14} className="mr-1" />
                <Text className="text-text-secondary text-xs font-bold">{course.xpReward} XP</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="px-6 pt-6 pb-32">
          {/* Description */}
          <View className="mb-8">
            <Text className="text-[11px] font-black text-primary-purple tracking-[2px] uppercase mb-3">Overview</Text>
            <Text className="text-text-body text-sm leading-relaxed font-medium">
              {course.description}
            </Text>
          </View>

          {/* Chapters List */}
          <Text className="text-[11px] font-black text-primary-purple tracking-[2px] uppercase mb-4">The Path Ahead</Text>
          {course.chapters.map((chapter: any, index: number) => (
            <View key={chapter.id} className="mb-6 bg-surface-mid border border-element-rim rounded-3xl overflow-hidden">
              <View className="p-5 border-b border-element-rim flex-row justify-between items-center bg-surface-low/50">
                <View className="flex-1 pr-4">
                  <Text className="text-[10px] font-black text-text-muted tracking-widest uppercase mb-1">Chapter {chapter.chapterNumber}</Text>
                  <Text className="text-lg font-bold text-white">{chapter.title}</Text>
                </View>
                <View className="w-10 h-10 rounded-2xl bg-surface-mid items-center justify-center border border-element-rim">
                  <Text className="text-primary-purple font-black">{index + 1}</Text>
                </View>
              </View>
              
              <View className="p-3">
                {chapter.subtopics.map((subtopic: any) => (
                  <TouchableOpacity 
                    key={subtopic.id}
                    onPress={() => router.push(`/(root)/course/subtopic/${subtopic.id}`)}
                    className="flex-row items-center p-3 rounded-xl active:bg-surface-low"
                  >
                    <View className="w-8 h-8 rounded-lg bg-surface-low items-center justify-center mr-3 border border-element-rim">
                      <BookOpen color="#94a3b8" size={16} />
                    </View>
                    <Text className="text-sm font-bold text-text-body flex-1">{subtopic.title}</Text>
                    <Play color="#a855f7" size={14} fill="#a855f7" />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <View className="absolute bottom-10 left-6 right-6">
        <TouchableOpacity 
          activeOpacity={0.9}
          onPress={() => {
            if (course.chapters[0]?.subtopics[0]) {
               router.push(`/(root)/course/subtopic/${course.chapters[0].subtopics[0].id}`);
            }
          }}
          className="bg-primary-purple py-5 rounded-2xl flex-row items-center justify-center"
          style={styles.buttonShadow}
        >
          <Play color="#fff" size={20} fill="#fff" className="mr-2" />
          <Text className="text-white font-black text-lg tracking-wide">Continue Quest</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    glow: {
        position: "absolute",
        width: 300,
        height: 300,
        borderRadius: 150,
    },
    buttonShadow: {
        shadowColor: "#a855f7",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 10,
    }
});
