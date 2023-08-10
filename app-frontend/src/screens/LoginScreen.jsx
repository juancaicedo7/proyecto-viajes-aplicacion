import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Video } from 'expo-av';

export default function LoginScreen() {
  const navigation = useNavigation();

  const [formulario, setFormulario] = useState({
    correo: "bccd@gmail.com",
    contrasenia: "",
  });

  const handleChange = (value, nombre) => {
    setFormulario({ ...formulario, [nombre]: value });
  };

  const handleSubmit = async () => {
    await login(formulario);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image style={styles.logo} source={require("../../assets/logo1.png")} />
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Correo electrónico"
            placeholderTextColor="#c9d1d9"
            onChangeText={(value) => handleChange(value, "correo")}
            value={formulario.correo}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Contraseña"
            placeholderTextColor="#c9d1d9"
            onChangeText={(value) => handleChange(value, "contrasenia")}
            value={formulario.contrasenia}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.register}>
            ¿Aún no tienes una cuenta? registrarse
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
          <Text style={styles.loginText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 160,
    height: 160,
    borderRadius: 75,
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    // width: 300,
    backgroundColor: "#161b22",
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "#c9d1d9",
  },
  register: {
    color: "#818586",
    fontSize: 11,
  },
  loginBtn: {
    width: "80%",
    // width: 300,
    backgroundColor: "#198DA9",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
});
