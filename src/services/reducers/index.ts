import { combineReducers } from "redux";
import { constructorIngredients } from "./constructor-ingredients";
import { ingredients } from "./ingredients";
import { orderNumber } from "./order";
import { auth } from "./auth";
import { ws } from "./ws";

export const rootReducer = combineReducers({
  auth,
  ingredients,
  constructorIngredients,
  orderNumber,
  ws
});
