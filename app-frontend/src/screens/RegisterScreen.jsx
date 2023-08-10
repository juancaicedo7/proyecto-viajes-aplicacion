import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import { UseUser } from "../hooks/UseUser";

const validationSchema = Yup.object({
  nombre: Yup.string()
  .trim()
  .matches(/^[a-zA-Z\s]+$/, "El nombre debe contener solo letras")
  .min(4, "el nombre debe tener al menos 4 caracteres")
  .max(25, "el nombre debe tener maximo 25 caracteres")
  .required("nombre es requerido"),

  correo: Yup.string()
    .trim()
    .required("correo es requerido")
    .email("Ingresa un correo valido"),

  contrasenia: Yup.string()
    .trim()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("la contraseña es requerida"),
});

export default function RegisterScreen() {
  const navigation = useNavigation();

  const { register } = UseUser();

  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    contrasenia: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (value, nombre) => {
    setFormulario({ ...formulario, [nombre]: value });
  };

  const handleSubmit = async () => {
    try {
      await validationSchema.validate(formulario, { abortEarly: false });
      await register(formulario);

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
  };

  return (
    <View style={styles.container}>
      <Text style={styles.frase}>
        Regístrate para ver los viajes de tús amigos.
      </Text>
      <Text style={styles.logo}>ENSIGNA</Text>
      <Text style={styles.errorText}>{errors.nombre}</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Nombre de usuario"
          placeholderTextColor="#c9d1d9"
          onChangeText={(value) => handleChange(value, "nombre")}
          value={formulario.nombre}
        />
      </View>
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
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.register}>Ya tengo una cuenta</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerBtn} onPress={handleSubmit}>
        <Text style={styles.registerText}>Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#0d1117",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  frase: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    color: "#c9d1d9",
    marginBottom: 40,
  },

  logo: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#c9d1d9",
    marginBottom: 40,
  },

  inputView: {
    width: "80%",
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

  registerBtn: {
    width: "80%",
    backgroundColor: "#198DA9",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },

  registerText: {
    color: "white",
  },
  errorText: {
    color: "#198DA9",
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
});
