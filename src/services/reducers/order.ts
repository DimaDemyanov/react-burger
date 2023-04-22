import { AnyAction } from "redux";
import {
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
} from "../actions/send-order";

export const orderNumber = (state = "-", action: AnyAction) => {
  switch (action.type) {
    case GET_ORDER_NUMBER_SUCCESS: {
      return "" + action.orderNumber;
    }
    case GET_ORDER_NUMBER_FAILED: {
      return "-";
    }
    default: {
      return state;
    }
  }
};