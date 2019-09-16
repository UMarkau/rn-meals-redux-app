import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import { CustomHeaderButton } from '../components/HeaderButton';
import Colors from '../constants/Colors';
import { setFilters } from '../store/actions/meals';

const FilterSwitch = ({ label, value, onValueChange }) => (
  <View style={styles.filterContainer}>
    <Text>{label}</Text>
    <Switch
      trackColor={{ true: Colors.primaryColor }}
      thumbColor={Colors.primaryColor}
      {...{ value, onValueChange }}
    />
  </View>
);

const FiltersScreen = ({ navigation }) => {
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      isGlutenFree,
      isLactoseFree,
      isVegan,
      isVegetarian
    };
    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

  useEffect(() => {
    navigation.setParams({ saveFilters });
  }, [saveFilters]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Filters</Text>
      <FilterSwitch
        label='Gluten-free'
        value={isGlutenFree}
        onValueChange={newValue => {
          setIsGlutenFree(newValue);
        }}
      />
      <FilterSwitch
        label='Lactose-free'
        value={isLactoseFree}
        onValueChange={newValue => setIsLactoseFree(newValue)}
      />
      <FilterSwitch
        label='Vegan'
        value={isVegan}
        onValueChange={newValue => setIsVegan(newValue)}
      />
      <FilterSwitch
        label='Vegetarian'
        value={isVegetarian}
        onValueChange={newValue => setIsVegetarian(newValue)}
      />
    </View>
  );
};

FiltersScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Filter Meals',
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
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Save'
          iconName='ios-save'
          onPress={navigation.getParam('saveFilters')}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 10
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    margin: 20,
    textAlign: 'center'
  }
});

export default FiltersScreen;
