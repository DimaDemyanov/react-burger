import { AnyAction } from "redux";
import {
  ADD_CONSTRUCTOR_INGREDIENT,
  MOVE_INGREDIENT,
  REMOVE_CONSTRUCTOR_INGREDIENT,
} from "../actions/constructor-ingredients";
import { TIngredient } from "../../utils/types";

const INITIAL_CONSTRUCTOR_INGREDIENTS: IConstructorIngredients = {
  bun: undefined,
  ingredients: [],
};

interface IConstructorIngredients {
  bun?: TIngredient,
  ingredients: Array<TIngredient & { id: number }>,
}

export const constructorIngredients = (
  state: IConstructorIngredients = INITIAL_CONSTRUCTOR_INGREDIENTS,
  action: AnyAction
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
