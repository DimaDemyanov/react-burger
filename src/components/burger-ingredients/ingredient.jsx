import ingredientsStyles from "./burger-ingredients.module.css";
import Price from "../common/price";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { INGREDIENT_TYPE } from "../../utils/types";
import { useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import { SHOW_INGREDIENT_DETAILS } from "../../services/actions/ingredient-details";

const Ingredient = ({ ingredient }) => {
  const dispatch = useDispatch();

  const openIngredientDetails = () => {
    dispatch({
      type: SHOW_INGREDIENT_DETAILS,
      ingredient: ingredient,
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
    <div className={`${ingredientsStyles.ingredient} ml-4`} ref={dragRef}>
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
      {ingredient.count > 0 && (
        <Counter
          count={ingredient.count}
          size="default"
          extraClass={ingredientsStyles.counter}
        />
      )}
    </div>
  );
};

Ingredient.propTypes = {
  ingredient: INGREDIENT_TYPE,
};

export default Ingredient;
