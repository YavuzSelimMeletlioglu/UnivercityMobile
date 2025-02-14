import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="dashboard"
        options={{
          headerBackVisible: false,
          headerTitle: "",
        }}
      />
      <Stack.Screen name="auth/login" />
      <Stack.Screen
        name="auth/register"
        options={{
          headerShown: true,
          headerBackVisible: true,
          headerTitle: "",
          headerBackTitle: "Giriş",
        }}
      />
    </Stack>
  );
}
