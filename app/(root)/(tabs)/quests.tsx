import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, Text, View, ScrollView } from "react-native";
import QuestHeader from "@/components/quests/QuestHeader";
import ForgeCard from "@/components/quests/ForgeCard";
import ActiveMissions from "@/components/quests/ActiveMissions";
import HiddenGems from "@/components/quests/HiddenGems";
import ForgeModal from "@/components/forge/ForgeModal";
import { useUserProfile } from "@/hooks/useUserProfile";

const { width } = Dimensions.get("window");

export default function Quests() {
	const { profile } = useUserProfile();
	const [forgeModalVisible, setForgeModalVisible] = useState(false);

	return (
		<View className="flex-1 bg-[#0b0c15] relative overflow-hidden">
			<StatusBar style="light" />

			{/* Atmospherics (Glows) */}
			<View style={[styles.glow, styles.glowTop]} />
			<View style={[styles.glow, styles.glowBottom]} />

			<ScrollView 
				className="flex-1 z-10" 
				contentContainerStyle={{ padding: 24, paddingBottom: 100, paddingTop: 60 }}
				showsVerticalScrollIndicator={false}
			>
				<QuestHeader />
				<ForgeCard onPress={() => setForgeModalVisible(true)} />
				<ActiveMissions missions={[]} />
				<HiddenGems />
			</ScrollView>

			<ForgeModal 
				visible={forgeModalVisible} 
				onClose={() => setForgeModalVisible(false)} 
				userId={profile?.id}
				isPaid={profile?.is_paid === 1}
			/>
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
