import {
  GET_INGREDIENTS_SUCCESS,
  SHOW_INGREDIENT_DETAILS,
  HIDE_INGREDIENT_DETAILS,
  GET_ORDER_NUMBER_SUCCESS,
  ADD_CONSTRUCTOR_INGREDIENT,
  REMOVE_CONSTRUCTOR_INGREDIENT,
  MOVE_INGREDIENT,
  GET_INGREDIENTS_FAILED,
  GET_ORDER_NUMBER_FAILED,
} from "../actions";
import { combineReducers } from "redux";

let currId = 0;

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
          { ...action.ingredient, id: currId++ },
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

export const orderNumber = (state = "-", action) => {
  switch (action.type) {
    case GET_ORDER_NUMBER_SUCCESS: {
      return action.orderNumber;
    }
    case GET_ORDER_NUMBER_FAILED: {
      return "-";
    }
    default: {
      return state;
    }
  }
};

export const rootReducer = combineReducers({
  ingredients,
  constructorIngredients,
  shownIngredient,
  orderNumber,
});
