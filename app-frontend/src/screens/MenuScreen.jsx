import { StyleSheet, Text, View, FlatList,TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {colors} from "../config/Colors";
import { useFonts } from "expo-font";
import HighlightedButton from "../components/HighlightedButton";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SPACING } from "../config/Spacing";
import { Animated } from 'react-native';


const myList = [
  {
    titulo: "Cuenta",
    icon: {
      nombre: "account",
    },
  },
  {
    titulo: "Ajustes",
    icon: {
      nombre: "cog-outline",
    },
  },
  {
    titulo: "Soporte",
    icon: {
      nombre: "email-outline",
    },
  },
  {
    titulo: "Mis favoritos",
    icon: {
      nombre: "heart-outline",
    },
  },
];

export default function MenuScreen() {
  const navigation = useNavigation();
  const [loaded] = useFonts({
    Montserrat: require("../config/montserrat/Montserrat-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }

//   useEffect(() => {
//     startLogoAnimation();
//   }, []);

//   const startLogoAnimation = () => {
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(logoPosition, {
//           toValue: 80, // Cambia este valor para controlar la cantidad de movimiento
//           duration: 1000, // Cambia la duración según sea necesario
//           useNativeDriver: false,
//         }),
//         Animated.timing(logoPosition, {
//           toValue: 0,
//           duration: 1000,
//           useNativeDriver: false,
//         }),
//       ]),
//       { iterations: 2 }
//     ).start();
    
//   };

  return (
    <>
    <View style={styles.wrapper}>
      <View style={styles.container}>
      <Animated.Image style={styles.logo} source={require("../../assets/imageViaje.png")} />
        <View style={styles.menu}>
        <FlatList
          data={myList}
          keyExtractor={(item) => item.titulo}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.iconContainer} onPress={() => {
                if (item.titulo === "Cuenta") {
                    navigation.navigate("UpdateData");
                }
              }}>
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
        </View>
        <HighlightedButton />

        <Text style={styles.copyrightText}>
          All rights reserved 2023 ©
        </Text>
      </View>
    </View>
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
  
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    top: 70
  },
  logo: {
    width: 220,
    height: 220,
    borderRadius: 75,
    marginBottom: 40,
    marginTop: 100,
    left: 90,
    bottom: 60,
  },
  copyrightText: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
    marginTop: -35,
    marginBottom: 25,
    marginHorizontal: 28,
    color: colors.white
  },
  text: {
    fontWeight: "bold",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 10,
  },
  iconBackground: {
    backgroundColor: colors.blue,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  icon: {
    marginHorizontal: 10,
  },
  iconContainer: {
    flexDirection: "row",
    marginBottom: 32,
    marginHorizontal: 28,
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 30,
  },
  container: {
    flex: 1,
    marginTop: 20,
  },
  backButton: {
    position: "absolute",
    top: 55,
    left: 20,
  },
  menu:{
    bottom: 100
  }
});
