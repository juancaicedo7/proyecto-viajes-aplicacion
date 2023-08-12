import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "react-native";
import {useIsFocused,  useNavigation } from "@react-navigation/core";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SPACING } from "../config/Spacing";
import { colors } from "../config/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { UseUser } from "../hooks/UseUser";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Viaje from "../components/viaje";

export default function ViajeScreen() {
  const navigation = useNavigation();
  const { exit, token } = UseUser();
  const [viajes, setViajes] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const { top } = useSafeAreaInsets();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const getViajes = async () => {
    try {
      setIsLogin(true);
      const { data } = await axios.get("/viajes", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setViajes(data.data);
    } catch (error) {
      console.log("error en el getViajes", error.message);
    }
  };

  useEffect(() => {
    isFocused && getViajes();
  }, [isFocused]);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await getPosts();
    setIsRefreshing(false);
  }, []);

  return (
    <>
      <View style={{ ...styles.container, top: top + 2 }}>
        <TouchableOpacity style={{ ...styles.button }} onPress={() => exit()}>
          <LinearGradient
            style={styles.gradient}
            colors={[colors["blue"], colors.blue]}
          >
            <Ionicons name="ios-exit-outline" style={styles.icon} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={{ ...styles.container, top }}>
        <Text style={styles.title}>Mis Viajes</Text>
        <Text style={styles.subtitle}>Recurdos de por vida</Text>
        <TouchableOpacity
          style={{ ...styles.button, top: top + 50 }}
          onPress={() => navigation.navigate("DetailScreen")}
        >
          <LinearGradient
            style={styles.gradient}
            colors={[colors["blue"], colors.blue]}
          >
            <Ionicons
              name="add-circle-outline"
              color={colors.light}
              size={25}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <FlatList
        data={viajes}
        renderItem={({ item }) => <Viaje viaje={item} />}
        keyExtractor={(item) => item._id.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={[colors.light]}
            progressBackgroundColor={colors["dark-gray"]}
          />
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 90,
    top: 40,
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
