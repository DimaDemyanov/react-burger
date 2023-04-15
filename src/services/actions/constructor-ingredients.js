import { v4 as uuidv4 } from "uuid";
export const GET_CONSTRUCTOR_INGREDIENTS = "GET_CONSTRUCTOR_INGREDIENTS";
export const ADD_CONSTRUCTOR_INGREDIENT = "ADD_CONSTRUCTOR_INGREDIENT";
export const REMOVE_CONSTRUCTOR_INGREDIENT = "REMOVE_CONSTRUCTOR_INGREDIENT";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";

export const createAddConstructorIngredientAction = (ingredient) => {
    return { type: ADD_CONSTRUCTOR_INGREDIENT, ingredient, id: uuidv4() }
};