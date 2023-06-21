import { mockedIngredientsData } from "../../utils/mocked-data/mocked-data-general";
import {
  ADD_CONSTRUCTOR_INGREDIENT,
  REMOVE_CONSTRUCTOR_INGREDIENT,
} from "../actions/constructor-ingredients";
import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
} from "../actions/ingredients";
import { ingredients } from "./ingredients";

const ingredient = mockedIngredientsData.find(
  (ingredient) => ingredient._id === "643d69a5c3f7b9001cfa0941"
);

describe("ingredients reducer", () => {
  it("should return the initial state", () => {
    expect(ingredients(undefined, { type: "none" })).toEqual([]);
  });

  it("should handle GET_INGREDIENTS_SUCCESS", () => {
    expect(
      ingredients([], {
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: mockedIngredientsData,
      })
    ).toEqual(mockedIngredientsData);
  });

  it("should handle GET_INGREDIENTS_FAILED", () => {
    expect(
      ingredients(mockedIngredientsData, {
        type: GET_INGREDIENTS_FAILED,
      })
    ).toEqual([]);
  });

  it("should handle ADD_CONSTRUCTOR_INGREDIENT", () => {
    expect(
      mockedIngredientsData.find(
        (ingredient) => ingredient._id === "643d69a5c3f7b9001cfa0941"
      )?.count
    ).toEqual(undefined);

    const updatedIngredients = ingredients(mockedIngredientsData, {
      type: ADD_CONSTRUCTOR_INGREDIENT,
      ingredient: ingredient,
    });

    expect(
      updatedIngredients.find(
        (ingredient) => ingredient._id === "643d69a5c3f7b9001cfa0941"
      )?.count
    ).toEqual(1);
  });

  it("should handle REMOVE_CONSTRUCTOR_INGREDIENT", () => {
    const data = mockedIngredientsData.map(i => {
      i.count = 0;
      return i;
    });

    const updatedIngredientsAfterAdd = ingredients(data, {
      type: ADD_CONSTRUCTOR_INGREDIENT,
      ingredient: ingredient,
    });

    expect(
      updatedIngredientsAfterAdd.find(
        (ingredient) => ingredient._id === "643d69a5c3f7b9001cfa0941"
      )?.count
    ).toBeGreaterThan(0);

    const updatedIngredientsAfterRemove = ingredients(data, {
      type: REMOVE_CONSTRUCTOR_INGREDIENT,
      ingredient: ingredient,
    });

    expect(
      updatedIngredientsAfterRemove.find(
        (ingredient) => ingredient._id === "643d69a5c3f7b9001cfa0941"
      )?.count
    ).toEqual(0);
  });
});
