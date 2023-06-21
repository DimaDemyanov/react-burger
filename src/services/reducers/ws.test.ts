import { mockedWsFeedOrders } from "../../utils/mocked-data/mocked-ws";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "../actions/ws";
import { TWSState, ws } from "./ws";

const initialState: TWSState = {
  wsConnected: false,
  orders: [],
  userOrders: [],
  totalOrders: null,
  totalOrdersToday: null,
};

const event = new Event("");
const message = {
  orders: mockedWsFeedOrders,
  total: 3333,
  totalToday: 25,
  dataReceived: true,
};

describe("web socket reducer", () => {
  it("should handle WS_CONNECTION_SUCCESS", () => {
    expect(
      ws(initialState, {
        type: WS_CONNECTION_SUCCESS,
        event: event,
      })
    ).toMatchObject({
      error: undefined,
      wsConnected: true,
    });
  });

  it("should handle WS_CONNECTION_ERROR", () => {
    expect(
      ws(initialState, {
        type: WS_CONNECTION_ERROR,
        event: event,
      })
    ).toMatchObject({
      error: event,
      wsConnected: false,
    });
  });

  it("should handle WS_CONNECTION_CLOSED", () => {
    expect(
      ws(initialState, {
        type: WS_CONNECTION_CLOSED,
      })
    ).toMatchObject({
      error: undefined,
      wsConnected: false,
    });
  });

  it("should handle WS_GET_MESSAGE orders", () => {
    expect(
      ws(initialState, {
        type: WS_GET_MESSAGE,
        messageType: "orders",
        message: JSON.stringify(message),
      })
    ).toMatchObject({
      error: undefined,
      orders: mockedWsFeedOrders,
      totalOrders: message.total,
      totalOrdersToday: message.totalToday,
    });
  });

  it("should handle WS_GET_MESSAGE userOrders", () => {
    expect(
      ws(initialState, {
        type: WS_GET_MESSAGE,
        messageType: "userOrders",
        message: JSON.stringify(message),
      })
    ).toMatchObject({
      error: undefined,
      userOrders: mockedWsFeedOrders,
    });
  });
});
