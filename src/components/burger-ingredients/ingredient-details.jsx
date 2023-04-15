import ingredientsStyles from "./burger-ingredients.module.css";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const CompositionStat = ({ type, stat }) => {
  return (
    <div
      className={`${ingredientsStyles.compositionStat} mr-5 text_color_inactive`}
    >
      <p className="text text_type_main-small">{type}</p>
      <p className="text text_type_main-small">{stat}</p>
    </div>
  );
};

CompositionStat.propTypes = {
  type: PropTypes.string.isRequired,
  stat: PropTypes.number.isRequired,
};

const IngredientDetails = () => {
  const { id } = useParams();
  const ingredients = useSelector((store) => store.ingredients);

  const ingredient = ingredients.find((el) => el._id === id);

  return (
    <div className={`${ingredientsStyles.ingredientDetailsContainer}`}>
      <img src={ingredient.image_large} className={`ml-4`} alt="ingredient" />
      <p className="text text_type_main-medium mt-4">{ingredient.name}</p>
      <div className={`${ingredientsStyles.composition} mt-8 mb-15`}>
        <CompositionStat type="Калории, ккал" stat={ingredient.calories} />
        <CompositionStat type="Белки, г" stat={ingredient.proteins} />
        <CompositionStat type="Жиры, г" stat={ingredient.fat} />
        <CompositionStat type="Углеводы, г" stat={ingredient.carbohydrates} />
      </div>
    </div>
  );
};
export default IngredientDetails;
