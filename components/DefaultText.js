import React from 'react';
import { Text, StyleSheet } from 'react-native';

export const DefaultText = ({ children }) => (
  <Text style={styles.container}>{children}</Text>
);

const styles = StyleSheet.create({
  container: {
    fontFamily: 'open-sans'
  }
});
