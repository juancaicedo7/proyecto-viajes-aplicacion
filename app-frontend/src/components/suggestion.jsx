import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SPACING } from "../config/Spacing";
import { colors } from "../config/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
import { UseUser } from "../hooks/UseUser";

export default function Suggestion({ sugerencia }) {
  const navigation = useNavigation();

  const { token } = UseUser();


  const addToMyViajes = async () => {
    try {
      const { data } = await axios.post(`/favoritos/addviaje`, sugerencia, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Alert.alert(" Viaje agregado con éxito", data.message);
    } catch (error) {
      if (error.response && error.response.data && !error.response.data.ok) {
        return Alert.alert(
          "¡Ya tienes este viaje!",
          error.response.data.message
        );
      }
      console.log("error en addFavorites", error.message);
    }
  };

  return (
    <LinearGradient
      key={sugerencia._id}
      colors={[colors["dark-gray"], colors.black]}
      style={styles.gradient}
    >
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{ uri: sugerencia.imgUrl }}
      />
      <View style={styles.header}>
        <View style={styles.titleRight}>
          <Text style={styles.title}>{sugerencia.titulo}</Text>
          <Text style={styles.subtitle}>{sugerencia.descripcion}</Text>
          <Text style={styles.subtitle}>{sugerencia.ciudad}</Text>
        </View>
        {/* <View style={styles.buttonContainer}> */}
        <TouchableOpacity
          style={styles.buttonRadius}
          onPress={() => addToMyViajes()}
        >
          <LinearGradient
            style={styles.gradientTwo}
            colors={[colors["blue"], colors.blue]}
          >
            <Ionicons
              name="heart"
              size={30}
              style={styles.icon}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonCenter}>
        <TouchableOpacity
          style={styles.buttonViaje}
          onPress={() => navigation.navigate("ViajeScreen", sugerencia._id)}
        >
          {/* <LinearGradient
            style={styles.gradientTwo}
            colors={[colors["blue"], colors.blue]}
          >
            <Ionicons name="heart" color={colors.blue} size={30} style={styles.icon}/>
          </LinearGradient> */}
          <Text style={styles.irViajes}>Ver mis viajes</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    height: 300,
    borderRadius: SPACING,
    padding: SPACING * 5,
    marginBottom: SPACING * 5,
  },
  image: {
    width: "100%",
    height: 160,
    marginBottom: SPACING,
  },
  title: {
    color: colors.light,
    fontSize: SPACING * 2,
    fontWeight: "700",
    marginBottom: SPACING,
  },
  subtitle: {
    color: colors.light,
    marginTop: SPACING / 2,
  },
  buttonContainer: { alignItems: "center" },
  buttonRadius: {
    overflow: "hidden",
    borderRadius: SPACING / 2,
    alignItems: "center",
    left: 35,
  },
  gradientTwo: {
    paddingHorizontal: SPACING,
    paddingVertical: SPACING / 3,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    fontSize: 25,
    color: "white",
  },
  buttonCenter: {
    top: 80,
  },
  irViajes: {
    fontSize: 18,
    color: "white",
    backgroundColor: "#4EB759",
    borderRadius: 10,
    padding: 18,
    paddingRight: 30,
    paddingLeft: 30,
  },
  buttonViaje: {
    overflow: "hidden",
    borderRadius: SPACING / 2,
    alignItems: "center",
  },
  titleRight: {
    right: 25,
  },
});
