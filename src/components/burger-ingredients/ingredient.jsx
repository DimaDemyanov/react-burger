import ingredientsStyles from './burger-ingredients.module.css';
import Price from "../common/price";
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { INGREDIENT_TYPE } from '../../utils/types';

const Ingredient = ({ ingredient: { name, price, count = 0, image } }) => {
    return (
        <div className={`${ingredientsStyles.ingredient} ml-4`}>
            <img src={image} className="ml-4" alt="ingredient" />
            <div className="mt-1">
                <Price price={price} />
            </div>
            <p className="text text_type_main-default">{name}</p>
            {count > 0 && <Counter count={count} size="default" extraClass={ingredientsStyles.counter} />}
        </div>
    )
}

Ingredient.propTypes = {
    ingredient: INGREDIENT_TYPE
};

export default Ingredient;