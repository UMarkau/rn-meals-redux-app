import React, { useEffect, useCallback } from 'react';
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton } from '../components/HeaderButton';
import { DefaultText } from '../components/DefaultText';
import { toggleFavorite } from '../store/actions/meals';

const ListItem = ({ children }) => (
  <View style={styles.listItem}>
    <DefaultText>{children}</DefaultText>
  </View>
);

const MealDetailScreen = ({ navigation }) => {
  const availableMeals = useSelector(state => state.meals.meals);

  const mealId = navigation.getParam('mealId');

  const mealIsFavorite = useSelector(state =>
    state.meals.favoriteMeals.some(favoriteMeal => favoriteMeal.id === mealId)
  );

  const selectedMeal = availableMeals.find(meal => meal.id === mealId);

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    navigation.setParams({ toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    navigation.setParams({ mealIsFavorite });
  }, [mealIsFavorite]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {/* We don't use the FlatList component here because there are not big amount of items in the list and we don't need optimization here. */}
      {selectedMeal.ingredients.map(ingredient => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map(step => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = ({ navigation }) => {
  const mealTitle = navigation.getParam('mealTitle');
  const toggleFavorite = navigation.getParam('toggleFavoriteHandler');
  const mealIsFavorite = navigation.getParam('mealIsFavorite');
  return {
    headerTitle: mealTitle,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Favorite'
          iconName={mealIsFavorite ? 'ios-star' : 'ios-star-outline'}
          onPress={() => toggleFavorite()}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center'
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10
  }
});

export default MealDetailScreen;
