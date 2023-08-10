import { StyleSheet, Text, View,Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/core";

export default function DetailScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ ...styles.container}}>
      <Text>DetailScreen</Text>
      <Button
        title="ir a homeScreen"
        onPress={() => navigation.navigate("HomeScreen")}
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
