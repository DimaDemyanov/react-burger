import { mockedConstructorIngredients } from "../../utils/mocked-data/mocked-data-constructor";
import {
  mockedBun,
  mockedFilling,
} from "../../utils/mocked-data/mocked-data-general";
import {
  ADD_CONSTRUCTOR_INGREDIENT,
  MOVE_INGREDIENT,
  REMOVE_CONSTRUCTOR_INGREDIENT,
} from "../actions/constructor-ingredients";
import { constructorIngredients } from "./constructor-ingredients";

describe("constructor ingredients reducer", () => {
  it("should return the initial state", () => {
    const initialState = constructorIngredients(undefined, { type: "none" });
    expect(initialState.bun).toBeUndefined();
    expect(initialState.ingredients.length).toEqual(0);
  });

  it("should handle ADD_CONSTRUCTOR_INGREDIENT for bun", () => {
    expect(
      constructorIngredients(
        {
          ingredients: mockedConstructorIngredients,
          bun: undefined,
        },
        {
          type: ADD_CONSTRUCTOR_INGREDIENT,
          ingredient: mockedBun,
        }
      ).bun
    ).toEqual(mockedBun);
  });

  it("should handle ADD_CONSTRUCTOR_INGREDIENT for filling", () => {
    expect(
      constructorIngredients(
        {
          ingredients: mockedConstructorIngredients,
          bun: undefined,
        },
        {
          type: ADD_CONSTRUCTOR_INGREDIENT,
          ingredient: mockedFilling,
        }
      ).ingredients.length
    ).toEqual(mockedConstructorIngredients.length + 1);
  });

  it("should handle REMOVE_CONSTRUCTOR_INGREDIENT for bun", () => {
    expect(
      constructorIngredients(
        {
          ingredients: mockedConstructorIngredients,
          bun: mockedBun,
        },
        {
          type: REMOVE_CONSTRUCTOR_INGREDIENT,
          ingredient: mockedConstructorIngredients[0],
        }
      ).bun
    ).toBeNull();
  });

  it("should handle REMOVE_CONSTRUCTOR_INGREDIENT for filling", () => {
    expect(
      constructorIngredients(
        {
          ingredients: mockedConstructorIngredients,
          bun: undefined,
        },
        {
          type: REMOVE_CONSTRUCTOR_INGREDIENT,
          ingredient: mockedConstructorIngredients[1],
        }
      ).ingredients.length
    ).toEqual(mockedConstructorIngredients.length - 1);
  });

  it("should handle MOVE_INGREDIENT", () => {
    const from = 1;
    const to = 3;

    const fromEl = mockedConstructorIngredients[from];

    const updatedIngredients = constructorIngredients(
      {
        ingredients: mockedConstructorIngredients,
        bun: undefined,
      },
      {
        type: MOVE_INGREDIENT,
        from: from,
        to: to,
      }
    );

    expect(updatedIngredients.ingredients[to]).toEqual(fromEl);
  });
});
