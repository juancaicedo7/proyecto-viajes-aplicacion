import { StyleSheet, Text, TouchableOpacity} from "react-native";
import React from "react";

export default function FormSubmitButton({ titulo, submitting, onPress }) {

    const backgroundColor = "#198DA9";

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }]}
      onPress={() => onPress()}
    >
      <Text style={{ fontSize: 18, color: "white" }}>{titulo}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container: {
        height: 45,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        top: 30
      },
})