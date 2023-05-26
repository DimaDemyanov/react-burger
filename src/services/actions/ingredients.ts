import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { getIngredientsRequest } from "../../utils/burger-api";

export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export interface IGetIngredientsAction {
  readonly type: typeof GET_INGREDIENTS;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TIngredientsActions =
  | IGetIngredientsAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction;

export function getIngredients(): ThunkAction<void, {}, {}, AnyAction> {
  return function (dispatch) {
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
