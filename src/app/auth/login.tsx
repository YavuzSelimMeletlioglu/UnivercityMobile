import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import { APIRequest } from "@/src/api/rest";
import { useRouter } from "expo-router";
import { Input } from "@/src/components/Input";
import { Button } from "@/src/components/Button";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const instance = APIRequest.INSTANCE();

  const login = async () => {
    if (email != "" && password != "") {
      const response = await instance.post("auth", { email, password });
      console.log(response);
      if (response && response.success) {
        router.replace("/dashboard/information");
        return;
      } else {
        alert("Giriş yapılamadı!");
      }
    } else {
      alert("Gerekli bilgileri giriniz!");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Input placeholder="Email" onChangeText={(text) => setEmail(text)} />
      <Input placeholder="Şifre" onChangeText={(text) => setPassword(text)} />
      <View style={styles.buttonContainer}>
        <Button title="Giriş Yap" onPress={login} />
        <Button
          title="Kayıt Ol"
          onPress={() => router.push("/auth/register")}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 10,
  },
  buttonContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
