import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SPACING } from "../config/Spacing";
import { colors } from "../config/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";


export default function Viaje({viaje}) {
    const navigation = useNavigation();

  return (
    <LinearGradient
    key={viaje._id}
    colors={[colors["dark-gray"], colors.black]}
    style={styles.gradient}
  >
    <Image
      style={styles.image}
      resizeMode="contain"
      source={{ uri: viaje.imgUrl }}
    />
    <View style={styles.header}>
    <View>
      <Text style={styles.title}>{viaje.titulo}</Text>
      <Text style={styles.subtitle}>{viaje.descripcion}</Text>
      <Text style={styles.subtitle}>{viaje.ciudad}</Text>
    </View>
    {/* <View style={styles.buttonContainer}> */}
      <TouchableOpacity
        style={styles.buttonRadius}
        onPress={() => navigation.navigate("DetailScreen", viaje._id)}
      >
        <LinearGradient
          style={styles.gradientTwo}
          colors={[colors["blue"], colors.blue]}
        >
          <Ionicons name="arrow-forward" color={colors.blue} size={30} style={styles.icon}/>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  </LinearGradient>
  )
}

const styles = StyleSheet.create({

    gradient: {
        height: 300,
        borderRadius: SPACING,
        padding: SPACING * 5,
        marginBottom: SPACING * 5,
        top: 15
      },
      image: {
        width: "100%",
        height: 160,
        marginBottom: SPACING
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
        alignItems: "center"
      },
      gradientTwo: {
        paddingHorizontal: SPACING,
        paddingVertical: SPACING / 3,
      },
    
      header:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      icon: {
        fontSize: 25,
        color: "white",
      },



})