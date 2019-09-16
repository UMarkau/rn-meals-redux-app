import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import { MealList } from '../components/MealList';
import { DefaultText } from '../components/DefaultText';
import { CustomHeaderButton } from '../components/HeaderButton';

const FavoritesScreen = ({ navigation }) => {
  const favoriteMeals = useSelector(state => state.meals.favoriteMeals);

  if (!favoriteMeals || favoriteMeals.length === 0) {
    return (
      <View style={styles.noDataContent}>
        <DefaultText>No Favorite meals found. Start adding one!</DefaultText>
      </View>
    );
  }

  return <MealList listData={favoriteMeals} {...{ navigation }} />;
};

FavoritesScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Your Favorites',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Menu'
          iconName='ios-menu'
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  noDataContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default FavoritesScreen;
