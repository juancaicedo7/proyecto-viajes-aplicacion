import {
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SPACING } from "../config/Spacing";
import { colors } from "../config/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { UseUser } from "../hooks/UseUser";
import Suggestion from "../components/suggestion";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Carousel from 'react-native-snap-carousel';

export default function SuggestionScreen() {
  const navigation = useNavigation();
  const { exit, token} = UseUser();
  const [suggestions, setSuggestions] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const [isLogin,setIsLogin] = useState(false)
  const {top} = useSafeAreaInsets();
  

  const getSuggestions = async () => {
    try {
      setIsLogin(true)
      const { data } = await axios.get("/sugerencias", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(data);
      setSuggestions(data.data);
    } catch (error) {
      console.log("error en el getSuggestions", error.message);
    }
  };

  useEffect(() => {
    getSuggestions();
  }, []);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await getSuggestions();
    setIsRefreshing(false);
  }, []);

  return (
    <>  
      <View style={{ ...styles.container, top: top + 20 }}>
        <TouchableOpacity style={{ ...styles.button }} onPress={() => exit()}>
          <LinearGradient
            style={styles.gradient}
            colors={[colors["blue"], colors.blue]}
          >
            <Ionicons name="ios-exit-outline" style={styles.icon} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={{ ...styles.container, top}}>
      <Text style={styles.title}>Ensigna Viajes</Text>
      <Text style={styles.subtitle}>Viaja, sueña, vive. Elige tu próximo destino</Text>
      </View>
      <View style={{ flex: 1,justifyContent: "center",alignItems: "center",}}>
        <Carousel
          data={suggestions}
          renderItem={({ item }) => <Suggestion sugerencia={item} />}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width}
          layout="default"
          loop
          autoplay
          autoplayInterval={4000} // Tiempo de transición entre diapositivas (en milisegundos)
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 90,
  },
  button: {
    overflow: "hidden",
    borderRadius: 5,
    position: "absolute",
    right: 0,
  },

  buttonDetail: {
    color: "white",
  },

  gradient: {
    paddingHorizontal: SPACING,
    paddingVertical: SPACING / 3,
  },

  icon: {
    fontSize: 25,
    color: "white",
  },
  title: {
    color: colors.white,
    fontSize: SPACING * 5,
    fontWeight: "700",
  },
  subtitle: {
    color: colors.light,
    marginTop: SPACING / 2,
  },
});
