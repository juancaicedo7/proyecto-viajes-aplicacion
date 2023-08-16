import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../config/Colors'
import { SPACING } from '../config/Spacing'
import { useNavigation } from '@react-navigation/native';
import { Ionicons} from "@expo/vector-icons";

export default function SupportScreen() {
  const navigation = useNavigation();
  return (
    <>
    <View style={styles.container}>
      <Text style={styles.title}>¿Tienes alguna duda?</Text>
      <Text style={styles.subtitle}>Escribenos</Text>
      <Text style={styles.email}>ensigna@gmail.com</Text>
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    top:10,

  },
    title: {
      color: colors.white,
      fontSize: SPACING * 5,
      fontWeight: "500",
      textAlign: "center",
      bottom: 100
    },
    subtitle: {
      color: colors.blue,
      marginTop: SPACING / 2,
      bottom: 10,
      fontSize: 50,
      fontWeight: "bold",
    },
    email:{
      color: colors.light,
      fontSize: 25
    },

    backButton: {
      position: "absolute",
      top: 50,
      left: 10,
    },
})