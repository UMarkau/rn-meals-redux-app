import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/meals';

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: []
};

export default (state = initialState, { type, ...payload }) => {
  switch (type) {
    case TOGGLE_FAVORITE:
      const isFavorite = state.favoriteMeals.some(
        favoriteMeal => favoriteMeal.id === payload.mealId
      );
      if (isFavorite) {
        return {
          ...state,
          favoriteMeals: state.favoriteMeals.filter(
            favoriteMeal => favoriteMeal.id !== payload.mealId
          )
        };
      } else {
        return {
          ...state,
          favoriteMeals: [
            ...state.favoriteMeals,
            state.meals.find(meal => meal.id === payload.mealId)
          ]
        };
      }
    case SET_FILTERS: {
      const { filters } = payload;
      return {
        ...state,
        filteredMeals: state.meals.filter(meal => {
          for (const appliedFilter in filters) {
            if (filters[appliedFilter] && !meal[appliedFilter]) return false;
          }
          return true;
        })
      };
    }
    default:
      return state;
  }
};
