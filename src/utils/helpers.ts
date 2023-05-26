import { TIngredient } from "./types";

export const countSum = (
  ingredients: ReadonlyArray<TIngredient>,
  bun: TIngredient
) => {
  return (
    ingredients.reduce((partialSum, a) => partialSum + a.price, 0) +
    (bun ? bun.price * 2 : 0)
  );
};

export function getImgUrlList(
  ingredientsIdArray: Array<string>,
  ingredients: Array<TIngredient>
) {
  const imgList = ingredientsIdArray.map((id) => {
    const ingredientImgUrl = ingredients.find(
      (ingredient) => ingredient._id === id
    )?.image_mobile;
    return ingredientImgUrl;
  });
  const notDisplayedImgsQty = imgList.length - 5;
  const urlObj = { imgList: imgList.slice(0, 6), notDisplayedImgsQty };
  return urlObj;
}

export function getIngredientInfoById(
  ingredientsIdArray: Array<string>,
  ingredients: Array<TIngredient>
) {
  const urlPriceName: Array<any> = [];
  const checkedId: Array<string> = [];
  ingredientsIdArray.forEach((id) => {
    if (id) {
      const ingredient = ingredients.find((el) => el._id === id);
      if (!checkedId.includes(ingredient!._id ?? "")) {
        urlPriceName.push({
          _id: ingredient?._id,
          url: ingredient?.image_mobile,
          price: ingredient?.price,
          name: ingredient?.name,
          qty: 1,
        });
        checkedId.push(id);
      } else {
        urlPriceName.forEach((item, index) => {
          if (item._id === id) {
            urlPriceName[index].qty += 1;
          }
        });
      }
    }
  });
  return urlPriceName;
}

export function countTotalById(
  ingredientsIdArray: Array<string>,
  ingredients: Array<TIngredient>
) {
  let total: number = 0;
  ingredientsIdArray.forEach((id) => {
    if (id) {
      total += ingredients.find((ingredient) => ingredient._id === id)!.price;
    } else {
      total += 0;
    }
  });
  return total;
}
