import { StyleSheet, Text, View,Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/core";

export default function DetailScreen() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>DetailScreen</Text>
      <Button
        title="ir a homeScreen"
        onPress={() => navigation.navigate("HomeScreen")}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
