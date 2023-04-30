import { ThunkAction } from "redux-thunk";
import { postOrderRequest } from "../../utils/burger-api";
import { AnyAction } from "redux";

export const GET_ORDER_NUMBER = "GET_ORDER_NUMBER";
export const GET_ORDER_NUMBER_SUCCESS = "GET_ORDER_NUMBER_SUCCESS";
export const GET_ORDER_NUMBER_FAILED = "GET_ORDER_NUMBER_FAILED";

export interface IGetOrderNumberAction {
  readonly type: typeof GET_ORDER_NUMBER;
}

export interface IGetOrderNumberSuccessAction {
  readonly type: typeof GET_ORDER_NUMBER_SUCCESS;
}

export interface IGetOrderNumberFailedAction {
  readonly type: typeof GET_ORDER_NUMBER_FAILED;
}

export type TOrderNumberActions =
  | IGetOrderNumberAction
  | IGetOrderNumberSuccessAction
  | IGetOrderNumberFailedAction;

export function postOrder(
  ingredientIds: Array<string>
): ThunkAction<void, {}, {}, AnyAction> {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_NUMBER,
    });
    postOrderRequest(ingredientIds)
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
