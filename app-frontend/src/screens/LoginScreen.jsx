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
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { Video } from 'expo-av';
import { UseUser } from "../hooks/UseUser";

const validationSchema = Yup.object({
  correo: Yup.string()
    .trim()
    .required("correo es requerido")
    .email("Ingresa un correo valido"),

  contrasenia: Yup.string()
    .trim()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("la contraseña es requerida"),
});

export default function LoginScreen() {
  const navigation = useNavigation();
  const {login} = UseUser();

  const [formulario, setFormulario] = useState({
    correo: "david@gmail.com",
    contrasenia: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (value, nombre) => {
    setFormulario({ ...formulario, [nombre]: value });
  };

  const handleSubmit = async () => {
    try {
      await validationSchema.validate(formulario, { abortEarly: false });
      await login(formulario);

      // Limpia los errores si la validación es exitosa y el inicio de sesión es exitoso
      setErrors({});
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((e) => {
          validationErrors[e.path] = e.message;
        });
        setErrors(validationErrors);
      }
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image style={styles.logo} source={require("../../assets/logo1.png")} />
        <Text style={styles.errorText}>{errors.correo}</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Correo electrónico"
            placeholderTextColor="#c9d1d9"
            onChangeText={(value) => handleChange(value, "correo")}
            value={formulario.correo}
          />  
        </View>
        <Text style={styles.errorText}>{errors.contrasenia}</Text>
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
  errorText: {
    color: "#198DA9",
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
});
