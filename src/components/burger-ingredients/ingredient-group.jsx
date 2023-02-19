import ingredientsStyles from "./burger-ingredients.module.css";
import Ingredient from "./ingredient.jsx";
import PropTypes from "prop-types";
import { INGREDIENTS_ARRAY_TYPE } from "../../utils/types";

const TYPES = {
  bun: "Булки",
  main: "Начинки",
  sauce: "Соусы",
};

const IngredientsGroup = ({ type, ingredients }) => {
  return (
    <div id={`${type}_tab_header`}>
      <p  className="text text_type_main-medium mt-10">{TYPES[type]}</p>
      <div className={ingredientsStyles.ingredientsGroup}>
        {ingredients.map((ingredient, index) => {
          return <Ingredient ingredient={ingredient} key={index} />;
        })}
      </div>
    </div>
  );
};

IngredientsGroup.propTypes = {
  ingredients: INGREDIENTS_ARRAY_TYPE,
  type: PropTypes.string.isRequired,
};

export default IngredientsGroup;
