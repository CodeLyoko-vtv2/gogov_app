import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StatusUpdate() {
  return (
    <View style={styles.container}>
      <Text>StatusUpdate Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});