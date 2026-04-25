import { useAuth } from "@clerk/expo";
import { Redirect, Tabs } from "expo-router";
import { BarChart2, Map, Tent, User } from "lucide-react-native";

export default function RootLayout() {
	const { isSignedIn } = useAuth();

	if (!isSignedIn) {
		return <Redirect href="/" />;
	}

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor: "#111827", // Surface Low
					position: "absolute",
					bottom: 24,
					left: 20,
					right: 20,
					borderRadius: 32,
					height: 75, // Taller to accommodate labels
					paddingBottom: 14,
					paddingTop: 10,
					borderWidth: 1,
					borderColor: "#1e293b",
					borderTopWidth: 1, // Explicitly set for all edges
					borderTopColor: "#1e293b",
					elevation: 12,
					shadowColor: "#000",
					shadowOffset: { width: 0, height: 10 },
					shadowOpacity: 0.4,
					shadowRadius: 20,
				},
				tabBarActiveTintColor: "#a855f7", // Primary Purple
				tabBarInactiveTintColor: "#94a3b8", // Text Secondary
				tabBarLabelStyle: {
					fontSize: 12,
					fontWeight: "700",
					marginTop: -2,
				},
				tabBarHideOnKeyboard: true,
			}}>
			<Tabs.Screen
				name="camp"
				options={{
					title: "Camp",
					tabBarIcon: ({ color, size }) => <Tent color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="quests"
				options={{
					title: "Quests",
					tabBarIcon: ({ color, size }) => <Map color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="stats"
				options={{
					title: "Stats",
					tabBarIcon: ({ color, size }) => <BarChart2 color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
				}}
			/>
		</Tabs>
	);
}
