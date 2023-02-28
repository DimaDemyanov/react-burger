import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
} from "../actions/ingredients";

import {
  ADD_CONSTRUCTOR_INGREDIENT,
  REMOVE_CONSTRUCTOR_INGREDIENT,
} from "../actions/constructor-ingredients";

export const ingredients = (state = [], action) => {
  switch (action.type) {
    case GET_INGREDIENTS_SUCCESS: {
      return action.ingredients;
    }
    case GET_INGREDIENTS_FAILED: {
      return [];
    }
    case ADD_CONSTRUCTOR_INGREDIENT: {
      return state.map((a) => {
        if (action.ingredient.type === "bun") {
          a.count = 0;
        }
        if (action.ingredient._id === a._id) {
          if (!a.count) {
            a.count = 0;
          }
          a.count += 1;
        }
        return a;
      });
    }
    case REMOVE_CONSTRUCTOR_INGREDIENT: {
      return state.map((a) => {
        if (action.ingredient._id === a._id) {
          a.count -= 1;
        }
        return a;
      });
    }
    default: {
      return state;
    }
  }
};