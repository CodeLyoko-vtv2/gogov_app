// src/components/UserArrow.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function UserArrow({ style }) {
  return <Text style={[styles.arrow, style]}>›</Text>;
}

const styles = StyleSheet.create({
  arrow: {
    fontSize: 35,
    color: '#CCCCCC',
    lineHeight: 35,
  }
});