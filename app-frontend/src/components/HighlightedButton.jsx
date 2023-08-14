import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../config/Colors";
import { UseUser } from "../hooks/UseUser";

export default function HighlightedButton() {
  const { exit } = UseUser();

  return (
    <TouchableOpacity style={{ ...styles.button }} onPress={() => exit()}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="logout" size={25} />
        </View>
        <Text style={styles.text}>Salir</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    marginLeft: 90,
    fontSize: 16,
    fontWeight: "bold",
    fontWeight: "700",
    color: colors.white,
  },
  iconContainer: {
    backgroundColor: colors.redLight,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  container: {
    flexDirection: "row",
    backgroundColor: colors.red,
    fontWeight: "bold",
    fontWeight: "700",
    marginBottom: 23,
    marginHorizontal: 28,
    alignItems: "center",
    elevation: 20,
    borderRadius: 30,
    bottom: 85,
  },
});
