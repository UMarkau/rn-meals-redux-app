import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from 'react-native';

import { DefaultText } from './DefaultText';

export const MealItem = ({
  title,
  duration,
  complexity,
  affordability,
  onSelectMeal,
  image
}) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onSelectMeal}>
      <View>
        <View style={{ ...styles.row, ...styles.mealHeader }}>
          <ImageBackground source={{ uri: image }} style={styles.bgImage}>
            {/* Adding extra View component around Text component is the special fix for IOS devices and problem related to background color. */}
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View style={{ ...styles.row, ...styles.mealDetail }}>
          <DefaultText>{duration}m</DefaultText>
          <DefaultText>{complexity.toUpperCase()}</DefaultText>
          <DefaultText>{affordability.toUpperCase()}</DefaultText>
        </View>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 15
  },
  row: {
    flexDirection: 'row'
  },
  mealHeader: {
    height: '85%'
  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '15%'
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 12
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  }
});
