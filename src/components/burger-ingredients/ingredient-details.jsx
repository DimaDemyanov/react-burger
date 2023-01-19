import ingredientsStyles from "./burger-ingredients.module.css";
import { Modal } from "../common/modal";
import { INGREDIENT_TYPE } from "../../utils/types";
import PropTypes from "prop-types";

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

const IngredientDetails = (props) => {
  return (
    <Modal {...props}>
      <img
        src={props.ingredient.image_large}
        className={`ml-4`}
        alt="ingredient"
      />
      <p className="text text_type_main-medium mt-4">{props.ingredient.name}</p>
      <div className={`${ingredientsStyles.composition} mt-8 mb-15`}>
        <CompositionStat
          type="Калории, ккал"
          stat={props.ingredient.calories}
        />
        <CompositionStat type="Белки, г" stat={props.ingredient.proteins} />
        <CompositionStat type="Жиры, г" stat={props.ingredient.fat} />
        <CompositionStat
          type="Углеводы, г"
          stat={props.ingredient.carbohydrates}
        />
      </div>
    </Modal>
  );
};

IngredientDetails.propTypes = {
  ...Modal.propTypes,
  ingredient: INGREDIENT_TYPE,
};

export default IngredientDetails;
