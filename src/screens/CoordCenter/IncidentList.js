import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function IncidentList() {
  return (
    <View style={styles.container}>
      <Text>IncidentList Screen</Text>
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