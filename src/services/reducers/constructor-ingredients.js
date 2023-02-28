import {
  ADD_CONSTRUCTOR_INGREDIENT,
  MOVE_INGREDIENT,
  REMOVE_CONSTRUCTOR_INGREDIENT,
} from "../actions/constructor-ingredients";

const INITIAL_CONSTRUCTOR_INGREDIENTS = {
  bun: null,
  ingredients: [],
};

export const constructorIngredients = (
  state = INITIAL_CONSTRUCTOR_INGREDIENTS,
  action
) => {
  switch (action.type) {
    case ADD_CONSTRUCTOR_INGREDIENT: {
      if (action.ingredient.type === "bun") {
        return { ...state, bun: action.ingredient };
      }
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          { ...action.ingredient, id: action.id },
        ],
      };
    }
    case REMOVE_CONSTRUCTOR_INGREDIENT: {
      if (action.ingredient.type === "bun") {
        return { ...state, bun: null };
      }
      return {
        ...state,
        ingredients: [
          ...state.ingredients.filter((a) => {
            return a.id !== action.ingredient.id;
          }),
        ],
      };
    }
    case MOVE_INGREDIENT: {
      const item = state.ingredients.splice(action.from, 1)[0];
      state.ingredients.splice(action.to, 0, item);
      return {
        ...state,
        ingredients: state.ingredients,
      };
    }
    default: {
      return state;
    }
  }
};
