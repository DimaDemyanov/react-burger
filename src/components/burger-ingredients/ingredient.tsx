import ingredientsStyles from "./burger-ingredients.module.css";
import Price from "../common/price";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../utils/types";
import { useDrag } from "react-dnd";
import { useLocation, useNavigate } from "react-router-dom";
import { FC } from "react";

interface IIngredientProps {
  ingredient: TIngredient;
}

const Ingredient: FC<IIngredientProps> = ({ ingredient }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const openIngredientDetails = () => {
    navigate(`/ingredients/${ingredient._id}`, {
      state: { background: location },
    });
  };

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { ingredient },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <div className={`${ingredientsStyles.ingredient} ml-4`} ref={dragRef} data-cy={ingredient.type}>
      <img
        src={ingredient.image}
        className={`${ingredientsStyles.ingredientImg} ml-4`}
        alt="ingredient"
        onClick={openIngredientDetails}
      />
      <div className="mt-1">
        <Price price={ingredient.price} />
      </div>
      <p className="text text_type_main-default">{ingredient.name}</p>
      {ingredient.count && ingredient.count > 0 && (
        <Counter
          count={ingredient.count}
          size="default"
          extraClass={ingredientsStyles.counter}
        />
      )}
    </div>
  );
};

export default Ingredient;
