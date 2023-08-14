import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../config/Colors'
import { SPACING } from '../config/Spacing'
import { useNavigation } from '@react-navigation/native';
import Ionicons from "@expo/vector-icons/Ionicons";

export default function UpdateData() {
    const navigation = useNavigation();

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.title}>Actualizar Datos</Text>
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
    title: {
        color: colors.white,
        fontSize: SPACING * 5,
        fontWeight: "700",
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 90,
        top: 120,
    },
    backButton: {
        position: "absolute",
        top: 55,
        left: 12,
      },
})