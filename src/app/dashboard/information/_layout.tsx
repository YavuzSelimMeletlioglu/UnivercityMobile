import { Stack } from "expo-router";

export default function InformationLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackVisible: true,
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Üniversiteler",
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="faculty"
        options={{
          title: "Fakülteler",
        }}
      />
      <Stack.Screen
        name="department"
        options={{
          title: "Bölümler",
        }}
      />
      <Stack.Screen
        name="course"
        options={{
          title: "Dersler",
        }}
      />
    </Stack>
  );
}
