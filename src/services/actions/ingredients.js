import { getIngredientsRequest } from "../../utils/burger-api";

export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export function getIngredients() {
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