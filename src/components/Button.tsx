import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

type ButtonProps = {
  title: string;
} & PressableProps;

export function Button({ title, ...props }: ButtonProps) {
  return (
    <Pressable style={styles.button} {...props}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#444",
    padding: 8,
    borderWidth: 1,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
