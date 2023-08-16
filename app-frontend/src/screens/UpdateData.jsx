import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../config/Colors";
import { SPACING } from "../config/Spacing";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FormInput from "../components/Form/FormInput";
import FormContainer from "../components/Form/FormContainer";
import { Formik } from "formik";
import * as Yup from "yup";
import { UseUser } from "../hooks/UseUser";
import FormSubmitButton from "../components/Form/FormSubmitButton";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const validationSchema = Yup.object({
  nombre: Yup.string()
    .trim()
    .matches(/^[a-zA-Z\s]+$/, "El nombre debe contener solo letras")
    .min(4, "El nombre debe tener al menos 4 caracteres")
    .max(25, "El nombre debe tener maximo 25 caracteres")
    .required("Nombre es requerido"),

  correo: Yup.string()
    .trim()
    .min(3, "Correo invalida")
    .required("Correo es requerida")
    .email("Ingresa un correo valido"),
  contrasenia: Yup.string()
    .trim()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es requerida"),
});

export default function UpdateData({ route }) {
  const { token } = UseUser();
  const navigation = useNavigation();
  const usuario = route.params;
  const [isLoading, setIsLoading] = useState(false);
  console.log(usuario)

  const usuarioInfo = {
    nombre: usuario?.nombre || "",
    correo: usuario?.correo || "",
    contrasenia: usuario?.contrasenia|| "",
  };

  const updateUsuario = async ({formData, nombre, correo, contrasenia}) => {
    try {
      setIsLoading(true);
      const { data } = await axios.put(`/usuarios/${usuario._id}`, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error en updateViaje", error.message);
    }
  };

  const actions = async (values, formikActions) => {
    const { nombre, correo, contrasenia } = values;
    Alert.alert(
      "Confirmar Actualización",
      "¿Estás seguro de que deseas actualizar tus datos?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Actualizar",
          onPress: async () => {
            const formData = new FormData();

            formData.append("nombre", nombre);
            formData.append("correo", correo);
            formData.append("contrasenia", contrasenia);

            if (usuario) {
              await updateUsuario(formData, nombre, correo, contrasenia);
            }

            formikActions.resetForm();
            formikActions.setSubmitting(false);

            if (navigation.canGoBack()) {
              navigation.goBack();
            }
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="red" size={80} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <FormContainer>
            <Formik
              initialValues={usuarioInfo}
              validationSchema={validationSchema}
              onSubmit={actions}
              
            >
              {
              
              ({
                values,
                errors,
                touched,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                
              }) => {
                return (
                  
                  <>
                    <View style={styles.header}>
                      <Text style={styles.title}>Actualizar Datos</Text>
                    </View>
                    <View style={styles.contain}>
                      
                      <FormInput
                        value={values.nombre}
                        error={touched.nombre && errors.nombre}
                        onChangeText={handleChange("nombre")}
                        onBlur={handleBlur("nombre")}
                        label="Nombre"
                        placeholder="Nombre"
                      />
                      
                     
                      <FormInput
                        value={values.correo}
                        error={touched.correo && errors.correo}
                        onChangeText={handleChange("correo")}
                        onBlur={handleBlur("correo")}
                        label="Correo"
                        placeholder="Correo"
                      />
               
                    
                      <FormInput
                        value={values.contrasenia}
                        error={touched.contrasenia && errors.contrasenia}
                        onChangeText={handleChange("contrasenia")}
                        onBlur={handleBlur("contrasenia")}
                        label="Contrasenia"
                        placeholder="Contrasenia"
                        secureTextEntry
                      />
                    </View>

                    <View style={styles.submitting}>
                      <View style={styles.bottonUpdate}>
                        <FormSubmitButton
                          submitting={isSubmitting}
                          onPress={handleSubmit}
                          titulo={"Actualizar"}
                        />
                      </View>
                    </View>
                  </>
                );
                
              }}
            </Formik>
          </FormContainer>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back-outline"
              color={"white"}
              size={SPACING * 6}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.white,
    fontSize: SPACING * 5,
    fontWeight: "500",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 90,
    top: 50,
  },
  backButton: {
    position: "absolute",
    bottom: 470,
    left: -70,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING * 2,
  },
  contain: {
    bottom: 5,
  },
  submitting: {
    bottom: 10,
  },
  safeArea: {
    top: 20,
  },
  scrollContent: {
    padding: 80,
  },
});
