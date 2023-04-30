import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
} from "../actions/ingredients";

import {
  ADD_CONSTRUCTOR_INGREDIENT,
  REMOVE_CONSTRUCTOR_INGREDIENT,
} from "../actions/constructor-ingredients";
import { TIngredient } from "../../utils/types";
import { AnyAction } from "redux";

export const ingredients = (state: Array<TIngredient> = [], action: AnyAction): Array<TIngredient> => {
  switch (action.type) {
    case GET_INGREDIENTS_SUCCESS: {
      return action.ingredients;
    }
    case GET_INGREDIENTS_FAILED: {
      return [];
    }
    case ADD_CONSTRUCTOR_INGREDIENT: {
      return state.map((ingredient) => {
        if (action.ingredient.type === "bun" && ingredient.type === "bun") {
          ingredient.count = 0;
        }
        if (action.ingredient._id === ingredient._id) {
          if (!ingredient.count) {
            ingredient.count = 0;
          }
          ingredient.count += 1;
        }
        return ingredient;
      });
    }
    case REMOVE_CONSTRUCTOR_INGREDIENT: {
      return state.map((a) => {
        if (action.ingredient._id === a._id && a.count) {
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