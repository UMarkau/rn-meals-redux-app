import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';

import { CATEGORIES } from '../data/dummy-data';
import { MealList } from '../components/MealList';
import { DefaultText } from '../components/DefaultText';

const CategoryMealsScreen = ({ navigation }) => {
  const categoryId = navigation.getParam('categoryId');

  const availableMeals = useSelector(state => state.meals.filteredMeals);

  const displayedMeals = availableMeals.filter(meal =>
    meal.categoryIds.includes(categoryId)
  );

  if (displayedMeals.length === 0) {
    return (
      <View style={styles.noDataContent}>
        <DefaultText>No meals found, maybe check your filters?</DefaultText>
      </View>
    );
  }

  return <MealList listData={displayedMeals} {...{ navigation }} />;
};

CategoryMealsScreen.navigationOptions = navigationData => {
  const categoryId = navigationData.navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find(
    category => category.id === categoryId
  );
  return {
    headerTitle: selectedCategory.title
  };
};

const styles = StyleSheet.create({
  noDataContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CategoryMealsScreen;
