import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="[course_id]"
        options={{
          headerShown: true,
          headerBackVisible: true,
          headerTitle: "",
          headerBackTitle: "Kurslar",
        }}
      />
    </Stack>
  );
}
