import { Middleware, MiddlewareAPI } from "redux";
import { TWS } from "../utils/types";
import { TWSActions } from "./actions/ws";
import { AppDispatch, RootState } from "./store";

const addHandlers = (
  socket: WebSocket | null,
  dispatch: AppDispatch,
  wsActions: TWS,
  messageType: "orders" | "userOrders"
) => {
  const { onOpen, onClose, onError, onMessage } = wsActions;

  if (socket) {
    socket.onopen = (event) => {
      dispatch({ type: onOpen, event });
    };

    socket.onerror = (event) => {
      dispatch({ type: onError, event });
    };

    socket.onmessage = (event) => {
      const { data } = event;
      dispatch({ type: onMessage, message: data, messageType: messageType });
    };

    socket.onclose = (event) => {
      dispatch({ type: onClose, event: event });
    };
  }
};

export const socketMiddleware = (wsActions: TWS): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let userSocket: WebSocket | null = null;

    return (next) => (action: TWSActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(action.url);
        userSocket = new WebSocket(action.userUrl);
      }

      addHandlers(socket, dispatch, wsActions, "orders");
      addHandlers(userSocket, dispatch, wsActions, "userOrders");

      next(action);
    };
  }) as Middleware;
};
