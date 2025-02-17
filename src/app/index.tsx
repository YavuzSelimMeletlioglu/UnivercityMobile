import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Button,
  Pressable,
} from "react-native";
import { APIRequest } from "../api/rest";
import { Redirect, useRouter } from "expo-router";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const instance = APIRequest.INSTANCE();

  const login = async () => {
    if (email != "" && password != "") {
      const response = await instance.get("login");
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

  return <Redirect href={"/auth/login"} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 10,
  },
  input: {
    width: "90%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#999",
    color: "#444",
  },
  buttonContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "#333",
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
