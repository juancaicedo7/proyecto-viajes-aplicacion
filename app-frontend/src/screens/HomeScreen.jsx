import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SPACING } from "../config/Spacing";
import { colors } from "../config/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { UseUser } from "../hooks/UseUser";

export default function HomeScreen() {
  const navigation = useNavigation();
  const {exit} = UseUser()

  return (
    <View style={{ ...styles.container}}>
      <Text>HomeScreen</Text>
      <Button
        title="ir a detalles"
        onPress={() => navigation.navigate("DetailScreen")}
      />
      <TouchableOpacity style={{ ...styles.button }} onPress={() => exit()}>
        <LinearGradient
          style={styles.gradient}
          colors={[colors["blue"], colors.blue]}
        >
          <Ionicons name="ios-exit-outline" style={styles.icon} />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 90,
    top:40
  },
  button: {
    overflow: "hidden",
    borderRadius: 5,
    position: "absolute",
    right: 0,
  },

  buttonDetail:{
    color: "white"
  },

  gradient: {
    paddingHorizontal: SPACING,
    paddingVertical: SPACING / 3,
  },

  icon: {
    fontSize: 25,
    color: "white",
  },
});
