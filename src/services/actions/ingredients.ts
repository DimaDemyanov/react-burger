import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { getIngredientsRequest } from "../../utils/burger-api";
import { AnyAction } from "redux";

export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export function getIngredients(): ThunkAction<void, {}, {}, AnyAction> {
    return function (dispatch: ThunkDispatch<{}, {}, AnyAction>) {
      dispatch({
        type: GET_INGREDIENTS,
      });
      getIngredientsRequest()
        .then((json) => {
          let ingredients = json.data;
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: ingredients,
          });
        })
        .catch((er) => {
          dispatch({
            type: GET_INGREDIENTS_FAILED,
          });
          console.error(er);
        });
    };
  }