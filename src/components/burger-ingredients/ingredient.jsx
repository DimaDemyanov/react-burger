import ingredientsStyles from './burger-ingredients.module.css';
import Price from "../common/price";
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { INGREDIENT_TYPE } from '../../utils/types';
import React from 'react';
import IngredientDetails from './ingredient-details';

const Ingredient = ({ ingredient }) => {
    const [ingredientDetailsVisible, setIngredientDetailsVisible] = React.useState(false);

    const openIngredientDetails = () => {
        setIngredientDetailsVisible(true);
    }

    const closeIngredientDetails = () => {
        setIngredientDetailsVisible(false);
    }

    return (
        <>
            <div className={`${ingredientsStyles.ingredient} ml-4`}>
                <img src={ingredient.image} className={`${ingredientsStyles.ingredientImg} ml-4`} alt="ingredient" onClick={openIngredientDetails} />
                <div className="mt-1">
                    <Price price={ingredient.price} />
                </div>
                <p className="text text_type_main-default">{ingredient.name}</p>
                {ingredient.count > 0 && <Counter count={ingredient.count} size="default" extraClass={ingredientsStyles.counter} />}
            </div>
            {
                ingredientDetailsVisible &&
                <IngredientDetails header="Детали ингредиента" onCloseClick={closeIngredientDetails} ingredient={ingredient} />
            }
        </>
    )
}

Ingredient.propTypes = {
    ingredient: INGREDIENT_TYPE
};

export default Ingredient;