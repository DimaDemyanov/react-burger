export type TIngredient = {
  type: "bun" | "main" | "sauce",
  name: string,
  price: number,
  image: string,
  image_mobile?: string,
  image_large?: string,
  _id?: string,
  proteins?: number,
  fat?: number,
  carbohydrates?: number,
  calories?: number,
  __v?: number,
  count?: number
};

export type TIngredientsArray = Array<TIngredient>;
