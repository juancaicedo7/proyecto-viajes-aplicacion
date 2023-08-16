import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { colors } from "../../config/Colors";

export default function FormInput(props) {
    const { label, placeholder, error } = props;
  return (
    <>
    <View style={styles.container}>
      {/* <Text style={styles.textLabel}>{label}</Text> */}
      {error && <Text style={styles.textError}>{error}</Text>}
    </View>

    <TextInput {...props} style={styles.input} placeholder={placeholder} placeholderTextColor="#c9d1d9"/>
  </>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
        textAlign:"center",
        justifyContent: "center"
       
      },
      textLabel: {
        fontWeight: "bold",
        color: colors.white,
        left: 20
      },
      textError: {
        fontSize: 12,
        color: "#198DA9",
        marginTop: 5,
        fontWeight: "bold",
      },
      input: {
        borderWidth: 1,
        borderColor: "#161b22",
        height: 50,
        width: "80%",
        borderRadius: 10,
        fontSize: 16,
        paddingLeft: 10,
        marginBottom: 25,
        backgroundColor: "#161b22",
        left: 33,
        justifyContent: "center",
        padding: 10,
        color: "white"
      },
})

