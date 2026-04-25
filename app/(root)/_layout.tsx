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
					backgroundColor: "#030712", // dark bg
					borderTopWidth: 1,
					borderTopColor: "#1e293b",
					height: 60,
					paddingBottom: 8,
					paddingTop: 8,
				},
				tabBarActiveTintColor: "#a855f7", // purple
				tabBarInactiveTintColor: "#64748b", // slate
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
