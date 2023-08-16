import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../config/Colors";
import { SPACING } from "../config/Spacing";
import { Dimensions } from "react-native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { UseUser } from "../hooks/UseUser";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import WelcomeText from "../components/WelcomeText";
import nameDatabase from "../database/nameDatabase";

const screenHeight = Dimensions.get("screen").height;

export default function DetailScreen({route}) {
  const id = route.params;
  const {exit,token} = UseUser()
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [viaje, setViaje] = useState({});
  const [isRemoving, setIsRemoving] = useState(false);
  const { top } = useSafeAreaInsets();

  const getViaje = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`/viajes/${id}`, {headers:{Authorization:`Bearer ${token}`}});
      setViaje(data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error en el getViaje", error.message);
    }
  };

  useEffect(() => {
    isFocused && getViaje();
  }, [isFocused]);

  const deleteViaje = async () => {
    try {
      setIsRemoving(true);
      const { data } = await axios.delete(`/viajes/${viaje._id}`,{headers:{Authorization:`Bearer ${token}`}});

      setIsRemoving(false);
      navigation.navigate("ViajeScreen");
    } catch (error) {
      setIsRemoving(false);
      console.log("error en deleteViaje", error.message);
    }
  };

  if (isLoading || isRemoving) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="red" size={80} />
      </View>
    );
  }


  return (
    
    <ScrollView style={styles.scroll}>
      {/* <View style={{ ...styles.container, top: top + 44}}>
        <TouchableOpacity style={{ ...styles.button }} onPress={() => exit()}>
          <LinearGradient
            style={styles.gradient}
            colors={[colors["red"], colors.red]}
          >
            <Ionicons name="ios-exit-outline" style={styles.icon} />
          </LinearGradient>
        </TouchableOpacity>
      </View> */}
      <View style={styles.header}>
      <WelcomeText
        name={`${nameDatabase.name}`}
        onPress={() => navigation.navigate("MenuScreen")}
      />
      </View>
      <View style={styles.imageContainer}>
        <View style={styles.imageBorder}>
          <Image source={{ uri: viaje.imgUrl }} style={styles.image} />
        </View>
      </View>

      <View style={{marginTop: -5}}>
        <Text style={styles.title}>{viaje.titulo}</Text>
        <Text style={styles.subtitle}>{viaje.descripcion}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.buttonRadius}
          onPress={() => navigation.navigate("ViajeActionScreen", viaje)}
        >
          <LinearGradient
            style={styles.gradient}
            colors={[colors["green"], colors.green]}
          >
            <Ionicons
              name="create-outline"
              color={colors.white}
              size={SPACING * 2}
            />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonRadius}
          onPress={() => deleteViaje()}
        >
          <LinearGradient
            style={styles.gradient}
            colors={[colors["red"], colors.red]}
          >
            <Ionicons
              name="trash-outline"
              color={colors.white}
              size={SPACING * 2}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* buttoback */}
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
    </ScrollView>
  )
}

const styles = StyleSheet.create({

  imageContainer: {
    width: "100%",
    height: screenHeight * 0.5,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    overflow: "hidden",
    top: 50
  },
  imageBorder: {
    flex: 1,
    // overflow: "hidden",
    // borderBottomEndRadius: 25,
    // borderBottomStartRadius: 25,
  },
  image: {
    flex: 1,
    resizeMode: "contain",
  },
  title: {
    color: colors.white,
    fontSize: SPACING * 2,
    fontWeight: "bold",
  },
  subtitle: {
    color: colors.light,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: -5,
  },
  buttonsContainer: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignposts: "center",
  },
  buttonRadius: {
    overflow: "hidden",
    borderRadius: SPACING / 2,
  },

  gradient: {
    paddingHorizontal: SPACING,
    paddingVertical: SPACING / 3,
  },
  button: {
    overflow: "hidden",
    borderRadius: 5,
    position: "absolute",
    right: 0,
  },
 gradientt: {
    paddingHorizontal: SPACING,
    paddingVertical: SPACING / 3,
  },

  icon: {
    fontSize: 25,
    color: "white",
  },
  header:{
    top: 10
  }

})