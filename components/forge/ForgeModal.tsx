import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image
} from 'react-native';
import { X, Sparkles } from 'lucide-react-native';
import DifficultyCard from './DifficultyCard';
import GeneratingOverlay from './GeneratingOverlay';
import { generateCourseContent, generateCourseThumbnail } from '@/services/gemini.service';
import { createAICourse } from '@/services/course.service';
import { useRouter } from 'expo-router';

interface ForgeModalProps {
  visible: boolean;
  onClose: () => void;
  userId: number;
  isPaid?: boolean;
}

export default function ForgeModal({ visible, onClose, userId, isPaid = false }: ForgeModalProps) {
  const router = useRouter();
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [loading, setLoading] = useState(false);

  const handleSummon = async () => {
    if (!topic.trim()) return;

    try {
      setLoading(true);
      
      // 1. Generate Course Content
      const content = await generateCourseContent(topic, difficulty);
      if (!content) throw new Error("Failed to generate content");

      // 2. Generate Thumbnail Prompt/Asset
      const thumbnail = await generateCourseThumbnail(content.title, content.category);

      // 3. Save to Database
      const newCourse = await createAICourse(userId, content, difficulty, thumbnail);

      setLoading(false);
      onClose();
      
      // 4. Navigate to the new course
      // @ts-ignore
      router.push(`/(root)/course/${newCourse.id}`);

    } catch (error) {
      console.error("Summoning failed:", error);
      setLoading(false);
      // Handle error (show toast/alert)
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 bg-main/95">
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
          >
            <View className="flex-1 px-6 pt-16 pb-10">
              {/* Header */}
              <View className="flex-row justify-between items-center mb-10">
                <View className="flex-row items-center">
                  <View className="p-2 bg-primary-purple/20 rounded-xl mr-3">
                    <Sparkles color="#a855f7" size={24} />
                  </View>
                  <Text className="text-2xl font-black text-white tracking-tight">Forge Journey</Text>
                </View>
                <TouchableOpacity 
                  onPress={onClose}
                  className="p-2 bg-surface-low rounded-full border border-element-rim"
                >
                  <X color="#94a3b8" size={20} />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
                {/* Topic Input */}
                <Text className="text-[11px] font-black text-primary-purple tracking-[2px] uppercase mb-3 ml-1">
                  Topic of Exploration
                </Text>
                <View className="bg-surface-mid border border-element-rim rounded-2xl p-4 mb-8">
                  <TextInput
                    placeholder="e.g., Quantum Physics, Python for Kids, 19th Century Art..."
                    placeholderTextColor="#64748b"
                    className="text-white font-bold text-base"
                    value={topic}
                    onChangeText={setTopic}
                    multiline
                  />
                </View>

                {/* Difficulty Selector */}
                <Text className="text-[11px] font-black text-primary-purple tracking-[2px] uppercase mb-3 ml-1">
                  Choose Intensity
                </Text>
                <View className="flex-row gap-3 mb-10">
                  <DifficultyCard 
                    difficulty="easy" 
                    selected={difficulty === 'easy'} 
                    locked={false}
                    onSelect={setDifficulty}
                  />
                  <DifficultyCard 
                    difficulty="medium" 
                    selected={difficulty === 'medium'} 
                    locked={false}
                    onSelect={setDifficulty}
                  />
                  <DifficultyCard 
                    difficulty="hard" 
                    selected={difficulty === 'hard'} 
                    locked={!isPaid}
                    onSelect={setDifficulty}
                  />
                </View>

                {/* Help Text */}
                <View className="bg-surface-low border border-element-rim rounded-2xl p-5 mb-10 flex-row">
                  <Image 
                    source={require('../../assets/images/crystal.png')} 
                    className="w-12 h-12 mr-4"
                    resizeMode="contain"
                  />
                  <View className="flex-1">
                    <Text className="text-text-body font-bold text-sm mb-1">AI Summoning</Text>
                    <Text className="text-text-muted text-[11px] leading-relaxed">
                      Our AI Oracle will craft a comprehensive guide with chapters, interactive subtopics, and quizzes tailored to your request.
                    </Text>
                  </View>
                </View>
              </ScrollView>

              {/* Action Button */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleSummon}
                disabled={!topic.trim()}
                className={`w-full py-5 rounded-2xl items-center justify-center flex-row ${topic.trim() ? 'bg-success-emerald' : 'bg-surface-low border border-element-rim'}`}
                style={topic.trim() ? styles.buttonShadow : {}}
              >
                <Sparkles color={topic.trim() ? "#fff" : "#64748b"} size={20} className="mr-2" />
                <Text className={`font-black text-lg ${topic.trim() ? 'text-white' : 'text-text-muted'}`}>
                  Summon Journey
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>

          {loading && <GeneratingOverlay />}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttonShadow: {
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  }
});
