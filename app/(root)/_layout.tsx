import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";

export default function RootLayout() {
	const { isSignedIn } = useAuth();

	if (!isSignedIn) {
		return <Redirect href="/" />;
	}

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="(tabs)" />
			<Stack.Screen name="course/[id]" />
			<Stack.Screen name="course/subtopic/[id]" />
		</Stack>
	);
}
