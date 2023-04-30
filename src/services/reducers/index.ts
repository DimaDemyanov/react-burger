import { combineReducers } from "redux";
import { constructorIngredients } from "./constructor-ingredients";
import { ingredients } from "./ingredients";
import { orderNumber } from "./order";
import { authReducer } from "./auth";

export const rootReducer = combineReducers({
  auth: authReducer,
  ingredients,
  constructorIngredients,
  orderNumber,
});
