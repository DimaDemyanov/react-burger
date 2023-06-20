import { GET_ORDER_NUMBER_FAILED, GET_ORDER_NUMBER_SUCCESS } from "../actions/send-order";
import { orderNumber } from "./order";

describe("order reducer", () => {
  it("should return the initial state", () => {
    expect(orderNumber(undefined, { type: "none" })).toEqual("-");
  });

  it("should handle GET_ORDER_NUMBER_SUCCESS", () => {
    expect(
      orderNumber("-", {
        type: GET_ORDER_NUMBER_SUCCESS,
        orderNumber: 123,
      })
    ).toEqual("123");
  });

  it("should handle GET_ORDER_NUMBER_FAILED", () => {
    expect(
      orderNumber("123", {
        type: GET_ORDER_NUMBER_FAILED,
      })
    ).toEqual("-");
  });
});
