import { Middleware, MiddlewareAPI } from "redux";
import { TWS } from "../utils/types";
import { TWSActions } from "./actions/ws";
import { AppDispatch, RootState } from "./store";

export const socketMiddleware = (wsActions: TWS): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TWSActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(action.url);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          dispatch({ type: onMessage, message: data });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, event: event });
        };
      }

      next(action);
    };
  }) as Middleware;
};
