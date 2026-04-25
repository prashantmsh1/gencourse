import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ChevronLeft, CheckCircle2, XCircle, ArrowRight, HelpCircle } from 'lucide-react-native';
import { getSubtopicWithQuiz, completeSubtopic } from '@/services/course.service';
import { useUser } from '@clerk/expo';
import { getUserProfile } from '@/services/user.service';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function SubtopicDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useUser();
  const [data, setData] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Quiz state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (id && user) {
      fetchData();
    }
  }, [id, user]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [subtopicData, profileData] = await Promise.all([
        getSubtopicWithQuiz(Number(id)),
        getUserProfile(user!.id)
      ]);
      setData(subtopicData);
      setProfile(profileData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuizSubmit = async () => {
    if (selectedOption === null || !profile) return;
    
    const correct = selectedOption === data.quiz.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    // Save progress to database
    try {
      await completeSubtopic(profile.id, Number(id), correct);
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-main items-center justify-center">
        <ActivityIndicator size="large" color="#a855f7" />
      </View>
    );
  }

  if (!data) {
    return (
      <View className="flex-1 bg-main items-center justify-center">
        <Text className="text-white font-bold">Content not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-main">
      <StatusBar style="light" />
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View className="pt-12 pb-4 px-6 flex-row items-center border-b border-element-rim bg-surface-low/50">
        <TouchableOpacity onPress={() => router.back()} className="p-2 bg-surface-mid rounded-full mr-4">
          <ChevronLeft color="#fff" size={20} />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-[10px] font-black text-text-muted tracking-widest uppercase">Subtopic {data.subtopicNumber}</Text>
          <Text className="text-white font-bold text-base truncate" numberOfLines={1}>{data.title}</Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
        {/* Content Section */}
        <View className="mb-10">
          <Text className="text-white text-lg font-bold mb-6 leading-relaxed">
            {data.title}
          </Text>
          
          <Text className="text-text-body text-base leading-7 font-medium">
             {data.content}
          </Text>
        </View>

        {/* Quiz Section */}
        {data.quiz && (
          <View className="mt-6 p-6 bg-surface-mid border border-element-rim rounded-[32px]">
            <View className="flex-row items-center mb-6">
              <View className="w-10 h-10 bg-primary-purple/20 rounded-xl items-center justify-center mr-3">
                <HelpCircle color="#a855f7" size={24} />
              </View>
              <Text className="text-xl font-black text-white">Knowledge Check</Text>
            </View>

            <Text className="text-white font-bold text-base mb-6 leading-relaxed">
              {data.quiz.question}
            </Text>

            <View className="gap-3">
              {data.quiz.options.map((option: string, index: number) => {
                let optionStyle = "border-element-rim bg-surface-low";
                let textStyle = "text-text-body";
                let icon = null;

                if (showResult) {
                  if (index === data.quiz.correctAnswer) {
                    optionStyle = "border-success-emerald bg-success-emerald/10";
                    textStyle = "text-success-emerald";
                    icon = <CheckCircle2 color="#10b981" size={18} />;
                  } else if (index === selectedOption && !isCorrect) {
                    optionStyle = "border-red-500 bg-red-500/10";
                    textStyle = "text-red-500";
                    icon = <XCircle color="#ef4444" size={18} />;
                  }
                } else if (selectedOption === index) {
                  optionStyle = "border-primary-purple bg-primary-purple/10";
                  textStyle = "text-white";
                }

                return (
                  <TouchableOpacity
                    key={index}
                    disabled={showResult}
                    onPress={() => setSelectedOption(index)}
                    className={`p-4 rounded-2xl border flex-row items-center justify-between ${optionStyle}`}
                  >
                    <Text className={`font-bold flex-1 pr-4 ${textStyle}`}>{option}</Text>
                    {icon}
                  </TouchableOpacity>
                );
              })}
            </View>

            {showResult && (
              <View className="mt-6 p-4 bg-surface-low rounded-2xl border border-element-rim">
                <Text className="text-text-muted text-[10px] font-black uppercase tracking-[2px] mb-2">The Oracle Explains</Text>
                <Text className="text-text-body text-sm font-medium leading-relaxed">
                  {data.quiz.explanation}
                </Text>
              </View>
            )}

            {!showResult ? (
              <TouchableOpacity
                disabled={selectedOption === null}
                onPress={handleQuizSubmit}
                className={`mt-8 py-4 rounded-2xl items-center justify-center ${selectedOption !== null ? 'bg-primary-purple' : 'bg-surface-low border border-element-rim'}`}
              >
                <Text className={`font-black ${selectedOption !== null ? 'text-white' : 'text-text-muted'}`}>Submit Answer</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => router.back()}
                className="mt-8 py-4 bg-success-emerald rounded-2xl flex-row items-center justify-center"
              >
                <Text className="text-white font-black mr-2">Continue Journey</Text>
                <ArrowRight color="#fff" size={18} />
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
