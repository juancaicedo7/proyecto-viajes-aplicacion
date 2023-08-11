import { StyleSheet, Text, View,Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/core";

export default function ViajeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ ...styles.container}}>
      <Text>ViajeScreen</Text>
      <Button
        title="ir a SuggestionScreen"
        onPress={() => navigation.navigate("SuggestionScreen")}
      />
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
});
