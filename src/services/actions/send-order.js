import { sendOrderAPI } from "../../utils/burger-api";

export const GET_ORDER_NUMBER = "GET_ORDER_NUMBER";
export const GET_ORDER_NUMBER_SUCCESS = "GET_ORDER_NUMBER_SUCCESS";
export const GET_ORDER_NUMBER_FAILED = "GET_ORDER_NUMBER_FAILED";

export function postOrder(ingredientIds) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_NUMBER,
    });
    sendOrderAPI(ingredientIds)
      .then((json) => {
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
