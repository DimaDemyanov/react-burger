import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { INGREDIENT_TYPE } from "../../utils/types";
import constructorStyles from "./burger-constructor.module.css";

const MainIngredient = ({ ingredient }) => (
  <div className={`${constructorStyles.ingredient} mb-4`}>
    <DragIcon type="primary" />
    <ConstructorElement
      text={ingredient.name}
      price={ingredient.price}
      thumbnail={ingredient.image}
      extraClass="ml-2"
    />
  </div>
);

MainIngredient.propTypes = {
  ingredient: INGREDIENT_TYPE.isRequired,
};

export default MainIngredient;
