import { combineReducers } from "redux";
import { constructorIngredients } from "./constructor-ingredients";
import { shownIngredient } from "./ingredient-details";
import { ingredients } from "./ingredients";
import { orderNumber } from "./order";

export const rootReducer = combineReducers({
  ingredients,
  constructorIngredients,
  shownIngredient,
  orderNumber,
});
