import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {colors} from "../config/Colors";
import { useFonts } from "expo-font";

export default function WelcomeText(props) {
  const [loaded] = useFonts({
    Montserrat: require("../config/montserrat/Montserrat-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.textWrapper}>
      <View>
        <Text style={styles.textWelcome}>Hola, {props.name}👋</Text>
        <Text style={styles.textTravel}>Viajemos ahora</Text>
      </View>

        <View style={styles.icono}>
        <TouchableOpacity onPress={props.onPress}>
            <MaterialCommunityIcons
            name="bell-badge-outline"
            size={40}
            color= "white"
            />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textWelcome: {
    fontWeight: "bold",
    // fontWeight: "700",
    fontSize: 25,
    color: colors.white,
    right: 30 
  },
  textTravel: {
    fontWeight: "bold",
    // fontWeight: "700",
    fontSize: 20,
    color: colors.white,
    right: 30
  },
  textWrapper: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 35,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 42,
    top: 100
  },
  icono: {
    left: 30,
  }
});
