import {
  HIDE_INGREDIENT_DETAILS,
  SHOW_INGREDIENT_DETAILS,
} from "../actions/ingredient-details";

export const shownIngredient = (state = null, action) => {
  switch (action.type) {
    case SHOW_INGREDIENT_DETAILS: {
      return action.ingredient;
    }
    case HIDE_INGREDIENT_DETAILS: {
      return null;
    }
    default: {
      return state;
    }
  }
};
