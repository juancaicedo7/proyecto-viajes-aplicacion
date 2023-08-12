import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../config/Colors'
import { SPACING } from '../config/Spacing'

export default function DetailScreen() {
  return (
    <View>
      <View>
        <Text style={styles.title}>titulo</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

    title: {
        color: colors.white,
        fontSize: SPACING * 5,
        fontWeight: "700",
      },
})