import ingredientsStyles from "./burger-ingredients.module.css";
import Ingredient from "./ingredient";
import { TIngredient } from "../../utils/types";
import { FC, RefObject } from "react";

export enum Type {
  Bun = "Булки",
  Main = "Начинки",
  Sauce = "Соусы",
}

interface IIngredientsGroupProps {
  type: Type,
  ingredients: Array<TIngredient>,
  tabRef: RefObject<HTMLDivElement>
}

const IngredientsGroup: FC<IIngredientsGroupProps> = ({ type, ingredients, tabRef }) => {
  return (
    <div id={`${type}_tab_header`} ref={tabRef}>
      <p  className="text text_type_main-medium mt-10">{type}</p>
      <div className={ingredientsStyles.ingredientsGroup}>
        {ingredients.map((ingredient, index) => {
          return <Ingredient ingredient={ingredient} key={index} />;
        })}
      </div>
    </div>
  );
};

export default IngredientsGroup;
