import { StyleSheet, TextInput, TextInputProps } from "react-native";

export function Input(props: TextInputProps) {
  return (
    <TextInput style={styles.input} placeholderTextColor="#666" {...props} />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "90%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#999",
    color: "#444",
  },
});
