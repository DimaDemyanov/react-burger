import {
  TWSActions,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "../actions/ws";

export type TWSState = {
  wsConnected: boolean;
  orders: [];
  userOrders: [];
  totalOrders: number | null;
  totalOrdersToday: number | null;
  error?: Event;
};

const initialState: TWSState = {
  wsConnected: false,
  orders: [],
  userOrders: [],
  totalOrders: null,
  totalOrdersToday: null,
};

export const ws = (state = initialState, action: TWSActions) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.event,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      if (action.messageType === "orders") {
        return {
          ...state,
          error: undefined,
          orders: JSON.parse(action.message).orders,
          totalOrders: JSON.parse(action.message).total,
          totalOrdersToday: JSON.parse(action.message).totalToday,
        };
      } else {
        return {
          ...state,
          error: undefined,
          userOrders: JSON.parse(action.message).orders,
        };
      }

    default:
      return state;
  }
};
