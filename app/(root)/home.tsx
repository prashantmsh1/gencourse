import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import { useAuth, useUser } from "@clerk/expo";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");

export default function Home() {
  const { signOut } = useAuth();
  const { user } = useUser();

  return (
    <View className="flex-1 bg-main items-center justify-center relative overflow-hidden">
      <StatusBar style="light" />
      
      {/* Atmospherics (Glows) */}
      <View style={[styles.glow, styles.glowTop]} />
      <View style={[styles.glow, styles.glowBottom]} />

      <View className="z-10 items-center justify-center px-6 w-full flex-1">
        <View className="mb-4 bg-success-emerald/20 px-4 py-2 rounded-full">
          <Text className="text-[11px] font-black tracking-widest text-success-emerald uppercase">
            Phase 2 / Explorer
          </Text>
        </View>

        <Text className="text-[32px] font-black tracking-widest text-text-primary text-center mb-2">
          HQ EVOLVED
        </Text>
        <Text className="text-base text-text-secondary font-normal text-center mb-12">
          Welcome back, {user?.emailAddresses[0]?.emailAddress || "Nomad"}.
        </Text>

        <View className="bg-surface-mid border border-element-rim rounded-[24px] p-6 w-full items-center mb-10" style={styles.cardShadow}>
          <Text className="text-xl font-bold text-text-body mb-2">Sanctum Access Granted</Text>
          <Text className="text-sm text-text-muted text-center">Your learning journey is saved and secured by Clerk.</Text>
        </View>
        
        <Pressable 
          className="w-full border border-element-rim rounded-2xl py-4 items-center justify-center active:opacity-80 mt-10"
          onPress={() => signOut()}
        >
          <Text className="text-text-secondary text-base font-bold tracking-wider">
            DISCONNECT (SIGN OUT)
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
    backgroundColor: "#10b9812a", // Emerald glow
    top: "-15%",
    left: "-20%",
  },
  glowBottom: {
    backgroundColor: "#a855f72a", // Purple glow
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
});
