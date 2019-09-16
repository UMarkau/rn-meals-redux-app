import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TouchableNativeFeedback
} from 'react-native';

export const CategoryGridTile = ({ title, color, onSelect }) => {
  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }
  return (
    <View style={styles.container}>
      <TouchableComponent style={{ flex: 1 }} onPress={onSelect}>
        <View style={{ ...styles.gridItem, ...{ backgroundColor: color } }}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
        </View>
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10,
    overflow:
      Platform.OS === 'android' && Platform.Version >= 21
        ? 'hidden'
        : 'visible',

    /* We have to add elevaion as a fix here for shadow on Android devices. */
    elevation: 5
  },
  gridItem: {
    flex: 1,

    /* Only for IOS. Doesn't work on Android. */
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },

    padding: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'right'
  }
});
