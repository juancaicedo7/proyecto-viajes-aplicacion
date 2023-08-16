import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../config/Colors";
import { SPACING } from "../config/Spacing";
import { useNavigation } from "@react-navigation/core";

const myList = [
  {
    titulo: "Sistema",
    icon: {
      nombre: "tools",
    },
  },
  {
    titulo: "Idioma y región",
    icon: {
      nombre: "earth",
    },
  },
  {
    titulo: "Modo Oscuro",
    icon: {
      nombre: "theme-light-dark",
    },
  },
  {
    titulo: "Permisos de la app",
    icon: {
      nombre: "lock",
    },
  },
  {
    titulo: "Estados de la cuenta",
    icon: {
      nombre: "account-circle",
    },
  },
];

export default function AjustesScreen() {
    const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Prefencias</Text>
        </View>
        <FlatList
          data={myList}
          keyExtractor={(item) => item.titulo}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.iconContainer}>
              <View style={styles.iconBackground}>
                <MaterialCommunityIcons
                  name={item.icon.nombre}
                  style={styles.icon}
                  size={25}
                />
              </View>
              <Text style={styles.text}>{item.titulo}</Text>
            </TouchableOpacity>
          )}
        />
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
    marginTop: 180,
  },
  backButton: {
    position: "absolute",
    marginTop: -135,
    left: 12,
  },
  text: {
    fontWeight: "bold",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 10,
  },
  iconContainer: {
    flexDirection: "row",
    marginBottom: 32,
    marginHorizontal: 28,
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 30,
  },
  iconBackground: {
    backgroundColor: colors.blue,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  title: {
    color: colors.white,
    fontSize: SPACING * 5,
    fontWeight: "700",
    textAlign: "center",
    bottom: 60
  },
  icon: {
    marginHorizontal: 10,
  },
});
