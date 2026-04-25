import { useUser } from "@clerk/expo";
import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, ScrollView, View, Text, Image, ActivityIndicator } from "react-native";

import PlayerCard from "../../components/camp/PlayerCard";
import QuestForge from "../../components/camp/QuestForge";
import ActiveQuest from "../../components/camp/ActiveQuest";
import DailyBounties from "../../components/camp/DailyBounties";
import ExploreRealms from "../../components/camp/ExploreRealms";
import TrophyCabinet from "../../components/camp/TrophyCabinet";
import { useUserProfile } from "../../hooks/useUserProfile";

const { width } = Dimensions.get("window");

export default function Camp() {
	const { profile, levels, activeQuest, loading } = useUserProfile();

	return (
		<View className="flex-1 bg-[#0b0c15] relative overflow-hidden">
			<StatusBar style="light" />

			{/* Atmospherics (Glows) */}
			<View style={[styles.glow, styles.glowTop]} />
			<View style={[styles.glow, styles.glowBottom]} />

			{loading && !profile ? (
				<View className="flex-1 items-center justify-center z-20">
					<ActivityIndicator size="large" color="#a855f7" />
				</View>
			) : (
				<ScrollView 
					className="flex-1 z-10" 
					contentContainerStyle={{ padding: 24, paddingBottom: 100, paddingTop: 60 }}
					showsVerticalScrollIndicator={false}
				>
					{/* Top Header */}
					<View className="flex-row justify-between items-center mb-8">
						<View>
							<Text className="text-[28px] font-black text-white tracking-tight">The Camp</Text>
							<Text className="text-sm text-[#94a3b8] font-medium">Safe Haven</Text>
						</View>
						
						<View className="flex-row items-center bg-[#111827] border border-[#1e293b] px-3 py-2 rounded-2xl">
							<View className="flex-row items-center mr-4">
								<Image source={require("../../assets/images/coin.png")} className="w-5 h-5 mr-1.5" />
								<Text className="text-white font-black text-sm">{profile?.coins?.toLocaleString() || 0}</Text>
							</View>
							<View className="flex-row items-center">
								<Image source={require("../../assets/images/lightning.png")} className="w-5 h-5 mr-1.5" />
								<Text className="text-[#38bdf8] font-black text-sm">{profile?.xp?.toLocaleString() || 0} XP</Text>
							</View>
						</View>
					</View>

					<PlayerCard profile={profile} levels={levels} />
					<QuestForge />
					<ActiveQuest questData={activeQuest} />
					<DailyBounties />
					<ExploreRealms />
					<TrophyCabinet />
				</ScrollView>
			)}
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
		backgroundColor: "#10b9811a", // Emerald glow
		top: "-10%",
		left: "-20%",
	},
	glowBottom: {
		backgroundColor: "#a855f71a", // Purple glow
		bottom: "-10%",
		right: "-30%",
	},
});
