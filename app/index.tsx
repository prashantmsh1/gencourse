import { Pressable, Text, View, StyleSheet, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");

export default function Index() {
  return (
    <View className="flex-1 bg-main items-center justify-center relative overflow-hidden">
      <StatusBar style="light" />
      
      {/* Atmospherics (Glows) */}
      <View style={[styles.glow, styles.glowTop]} />
      <View style={[styles.glow, styles.glowBottom]} />

      {/* Content Container */}
      <View className="z-10 items-center justify-center px-6 w-full flex-1">
        
        {/* Title Section */}
        <View className="items-center mb-12">
          <View className="mb-4 bg-primary-purple/20 px-4 py-2 rounded-full">
            <Text className="text-[11px] font-black tracking-widest text-primary-purple uppercase">
              Phase 1 / Nomad
            </Text>
          </View>
          <Text className="text-[32px] font-black tracking-widest text-text-primary text-center mb-2">
            GENCOURSE AI
          </Text>
          <Text className="text-base text-text-secondary font-normal text-center max-w-[80%]">
            Level up your skills. The ultimate cyber-gamified learning experience.
          </Text>
        </View>

        {/* Feature Cards / High-Fidelity preview */}
        <View className="w-full space-y-4 mb-16 gap-4">
          <View className="bg-surface-mid border border-element-rim rounded-[24px] p-5 w-full flex-row items-center" style={styles.cardShadow}>
            <View className="w-12 h-12 bg-success-emerald/20 rounded-full items-center justify-center mr-4">
              <Text className="text-success-emerald font-black text-xl">AI</Text>
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-text-body mb-1">AI Generated Quests</Text>
              <Text className="text-sm text-text-muted">Dynamic learning paths adapted to you.</Text>
            </View>
          </View>
        </View>

      </View>

      {/* Bottom Action Area */}
      <View className="w-full px-6 pb-12 pt-6 z-10 absolute bottom-0">
        <Pressable 
          className="w-full bg-primary-purple rounded-2xl py-5 items-center justify-center active:opacity-80"
          style={styles.buttonShadow}
          onPress={() => {console.log("Start Journey Pressed")}}
        >
          <Text className="text-white text-lg font-bold tracking-wider">
            START JOURNEY
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  glow: {
    position: "absolute",
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
  },
  glowTop: {
    backgroundColor: "#7e22ce2a", // Purple glow
    top: "-15%",
    left: "-20%",
  },
  glowBottom: {
    backgroundColor: "#0ea5e92a", // Cyan glow
    bottom: "-10%",
    right: "-30%",
  },
  cardShadow: {
    shadowColor: "#1e293b",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonShadow: {
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
  }
});
