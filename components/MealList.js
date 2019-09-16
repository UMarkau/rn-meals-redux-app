import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { MealItem } from './MealItem';

export const MealList = ({ navigation, listData }) => {
  const favoriteMeals = useSelector(state => state.meals.favoriteMeals);

  const renderMealItem = ({ item }) => (
    <MealItem
      title={item.title}
      duration={item.duration}
      complexity={item.complexity}
      affordability={item.affordability}
      image={item.imageUrl}
      onSelectMeal={() => {
        navigation.navigate('MealDetail', {
          mealId: item.id,
          mealTitle: item.title,
          mealIsFavorite: favoriteMeals.some(
            favoriteMeal => favoriteMeal.id === item.id
          )
        });
      }}
    />
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={listData}
        keyExtractor={item => item.id}
        renderItem={renderMealItem}
        style={{ width: '100%' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
