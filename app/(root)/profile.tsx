import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import { useAuth, useUser } from "@clerk/expo";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");

export default function Profile() {
  const { signOut } = useAuth();
  const { user } = useUser();

  return (
    <View className="flex-1 bg-main items-center justify-center relative overflow-hidden">
      <StatusBar style="light" />
      
      {/* Atmospherics (Glows) */}
      <View style={[styles.glow, styles.glowTop]} />
      <View style={[styles.glow, styles.glowBottom]} />

      <View className="z-10 items-center justify-center px-6 w-full flex-1">
        <Text className="text-[32px] font-black tracking-widest text-text-primary text-center mb-2">
          PROFILE
        </Text>
        <Text className="text-base text-text-secondary font-normal text-center mb-12">
          {user?.emailAddresses[0]?.emailAddress || "Nomad Profile"}
        </Text>

        <Pressable 
          className="w-full border border-element-rim bg-surface-mid rounded-2xl py-4 items-center justify-center active:opacity-80 mt-10"
          onPress={() => signOut()}
        >
          <Text className="text-alert-amber text-base font-bold tracking-wider">
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
});
