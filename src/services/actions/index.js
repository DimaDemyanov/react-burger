export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const GET_CONSTRUCTOR_INGREDIENTS = "GET_CONSTRUCTOR_INGREDIENTS";
export const ADD_CONSTRUCTOR_INGREDIENT = "ADD_CONSTRUCTOR_INGREDIENT";
export const REMOVE_CONSTRUCTOR_INGREDIENT = "REMOVE_CONSTRUCTOR_INGREDIENT";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";

export const SHOW_INGREDIENT_DETAILS = "SHOW_INGREDIENT_DETAILS";
export const HIDE_INGREDIENT_DETAILS = "HIDE_INGREDIENT_DETAILS";

export const GET_ORDER_NUMBER_SUCCESS = "GET_ORDER_NUMBER_SUCCESS";
export const GET_ORDER_NUMBER_FAILED = "GET_ORDER_NUMBER_FAILED";

export function getIngredients(url) {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS,
    });
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          dispatch({
            type: GET_INGREDIENTS_FAILED,
          });
          throw new Error("HTTP status " + response.status);
        }
        return response.json();
      })
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

export function postOrder(url, ingredients) {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS,
    });
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ ingredients: ingredients }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          dispatch({
            type: GET_ORDER_NUMBER_FAILED,
          });
          throw new Error("HTTP status " + response.status);
        }
        return response.json();
      })
      .then((json) => {
        console.log(json);
        dispatch({
          type: GET_ORDER_NUMBER_SUCCESS,
          orderNumber: json.order.number,
        });
      })
      .catch((er) => {
        dispatch({
          type: GET_ORDER_NUMBER_FAILED,
        });
        console.error(er);
      });
  };
}
