import { v4 as uuidv4 } from "uuid";
import { TIngredient } from "../../utils/types";

export const GET_CONSTRUCTOR_INGREDIENTS = "GET_CONSTRUCTOR_INGREDIENTS";
export const ADD_CONSTRUCTOR_INGREDIENT = "ADD_CONSTRUCTOR_INGREDIENT";
export const REMOVE_CONSTRUCTOR_INGREDIENT = "REMOVE_CONSTRUCTOR_INGREDIENT";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";

export interface IGetConstructorIngredientsAction {
  readonly type: typeof GET_CONSTRUCTOR_INGREDIENTS;
}

export interface IAddConstructorIngredientAction {
  readonly type: typeof ADD_CONSTRUCTOR_INGREDIENT;
}

export interface IRemoveConstructorIngredientAction {
  readonly type: typeof REMOVE_CONSTRUCTOR_INGREDIENT;
}

export interface IMoveIngredientAction {
  readonly type: typeof MOVE_INGREDIENT;
}

export type TConstructorIngredientsActions =
  | IGetConstructorIngredientsAction
  | IAddConstructorIngredientAction
  | IRemoveConstructorIngredientAction
  | IMoveIngredientAction;

export const createAddConstructorIngredientAction = (
  ingredient: TIngredient
) => {
  return {
    type: ADD_CONSTRUCTOR_INGREDIENT,
    ingredient,
    id: uuidv4(),
  };
};
