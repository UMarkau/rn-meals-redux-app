import React from 'react';
import { FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { CATEGORIES } from '../data/dummy-data';
import { CategoryGridTile } from '../components/CategoryGridTile';
import { CustomHeaderButton } from '../components/HeaderButton';

const CategoriesScreen = ({ navigation }) => {
  const renderGridItem = ({ item }) => (
    <CategoryGridTile
      title={item.title}
      color={item.color}
      onSelect={() => {
        navigation.navigate('CategoryMeals', {
          categoryId: item.id
        });
      }}
    />
  );

  return (
    <FlatList
      keyExtractor={item => item.id}
      data={CATEGORIES}
      renderItem={renderGridItem}
      numColumns={2}
    />
  );
};

CategoriesScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Meal Categories',
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

export default CategoriesScreen;
