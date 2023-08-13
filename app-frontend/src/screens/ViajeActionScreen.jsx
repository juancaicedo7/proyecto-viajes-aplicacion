import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../config/Colors";
import { SPACING } from "../config/Spacing";
import * as Yup from "yup";
import { Formik } from "formik";
import FormContainer from "../components/Form/FormContainer";
import FormInput from "../components/Form/FormInput";
import FormSubmitButton from "../components/Form/FormSubmitButton";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { UseUser } from "../hooks/UseUser";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";

const validationSchema = Yup.object({
  titulo: Yup.string()
    .trim()
    .min(3, "titulo invalido")
    .required("titulo es requerido"),

  descripcion: Yup.string()
    .trim()
    .min(3, "descripcion invalida")
    .required("descripcion es requerida"),
});

export default function ViajeActionScreen({ route }) {
  const { token } = UseUser();
  const viaje = route.params;
  const navigation = useNavigation();
  const [image, setImage] = useState(viaje?.imgUrl || "");
  const [isLoading, setIsLoading] = useState(false);
  const { top } = useSafeAreaInsets();

  const viajeInfo = {
    titulo: viaje?.titulo || "",
    descripcion: viaje?.descripcion || "",
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
      });

      console.log(result.assets[0].uri.split("/").pop());

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Error en pickImage", error.message);
    }
  };

  const saveViaje = async (formData) => {
    try {
      setIsLoading(true);
      await axios.post("/viajes", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error en saveViaje", error.message);
    }
  };

  const updateViaje = async (formData) => {
    try {
      setIsLoading(true);
      await axios.put(`/viajes/${viaje._id}`, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error en updateViaje", error.message);
    }
  };

  const actions = async (values, formikActions) => {
    const { titulo, descripcion } = values;
    const formData = new FormData();

    if (viaje) {
      if (viaje.imgUrl !== image) {
        formData.append("img", {
          name: image.split("/").pop(),
          uri: image,
          type: "image/jpg",
        });
      }
    } else {
      if (image) {
        formData.append("img", {
          name: image.split("/").pop(),
          uri: image,
          type: "image/jpg",
        });
      }
    }


    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);

    viaje ? await updateViaje(formData) : await saveViaje(formData);

    formikActions.resetForm();
    formikActions.setSubmitting(false);

    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="red" size={80} />
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <FormContainer>
          <Formik
            initialValues={viajeInfo}
            validationSchema={validationSchema}
            onSubmit={actions}
          >
            {({
              values,
              errors,
              touched,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => {
              const { titulo, descripcion } = values;
              return (
                <>
                  <View style={{ ...styles.contain, top: top - 145 }}>
                    <TouchableOpacity
                      style={{ ...styles.button }}
                      onPress={() => exit()}
                    >
                      <LinearGradient
                        style={styles.gradient}
                        colors={[colors["red"], colors.red]}
                      >
                        <Ionicons name="ios-exit-outline" style={styles.icon} />
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>

                  <View style={{ ...styles.contain, top: top - 125 }}>
                    <Text style={styles.title}>
                      CREA TU PROPIO VIAJE INOLVIDABLE
                    </Text>
                    <Text style={styles.subtitle}>
                      Explora el mundo y descubre quién eres realmente.
                    </Text>
                  </View>
                  <View style={styles.header}>
                    <FormInput
                      value={values.titulo}
                      errors={touched.titulo && errors.titulo}
                      onChangeText={handleChange("titulo")}
                      onBlur={handleBlur("titulo")}
                      label="Titulo"
                      placeholder="Titulo"
                    />

                    <FormInput
                      value={values.descripcion}
                      errors={touched.descripcion && errors.descripcion}
                      onChangeText={handleChange("descripcion")}
                      onBlur={handleBlur("descripcion")}
                      label="Descripcion"
                      placeholder="Descripcion"
                    />

                    {/* imagen */}
                    <View>
                      <TouchableOpacity
                        style={styles.uploadBtnContainer}
                        onPress={() => pickImage()}
                      >
                        {image ? (
                          <Image
                            source={{ uri: image }}
                            style={{ width: "100%", height: "100%" }}
                          />
                        ) : (
                          <Text style={styles.uploadBtn}>
                            Seleccionar imagen
                          </Text>
                        )}
                      </TouchableOpacity>
                    </View>

                    <FormSubmitButton
                      submitting={isSubmitting}
                      onPress={handleSubmit}
                      titulo={viaje ? "Actualizar" : "Guardar"}
                    />
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING * 2,
  },
  contain: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 90,
  },
  title: {
    color: colors.light,
    fontSize: SPACING * 2,
    fontWeight: "bold",
  },
  centrar: {
    justifyContent: "center",
    alignItems: "center",
  },

  subtitle: {
    color: colors.light,
    marginTop: SPACING / 2,
  },
  uploadBtnContainer: {
    height: 125,
    width: 125,
    borderRadius: 60,
    borderColor: colors.light,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    overflow: "hidden",
    marginVertical: 10,
    // marginLeft: 100,
  },
  uploadBtn: {
    textAlign: "center",
    fontSize: 16,
    opacity: 0.3,
    fontWeight: "bold",
    color: colors.light,
  },
  backButton: {
    position: "absolute",
    top: 75,
    left: -5,
  },
  gradient: {
    paddingHorizontal: SPACING,
    paddingVertical: SPACING / 3,
  },

  icon: {
    fontSize: 25,
    color: "white",
  },
  button: {
    overflow: "hidden",
    borderRadius: 5,
    position: "absolute",
    right: 0,
  },
  header: {
    bottom: 100,
  },
});
