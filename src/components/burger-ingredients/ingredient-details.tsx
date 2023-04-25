import ingredientsStyles from "./burger-ingredients.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FC } from "react";
import { TIngredient } from "../../utils/types";
import { RootState } from "../../services/store";

interface ICompositionStatProps {
  type: string,
  stat?: number
}

const CompositionStat: FC<ICompositionStatProps> = ({ type, stat }) => {
  return (
    <div
      className={`${ingredientsStyles.compositionStat} mr-5 text_color_inactive`}
    >
      <p className="text text_type_main-small">{type}</p>
      <p className="text text_type_main-small">{stat}</p>
    </div>
  );
};

const IngredientDetails = () => {
  const { id } = useParams();  
  const ingredients: ReadonlyArray<TIngredient> = useSelector<RootState, ReadonlyArray<TIngredient>>((store) => store.ingredients);

  const ingredient = ingredients.find((el) => el._id === id);
  
  if (!ingredient) {
    return null;
  }

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
