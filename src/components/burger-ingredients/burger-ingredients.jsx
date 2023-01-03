import { Tab, Counter} from "@ya.praktikum/react-developer-burger-ui-components"
import React from "react"
import { INGREDIENTS_ARRAY_TYPE, INGREDIENT_TYPE } from "../../utils/types";
import Price from "../common/price";
import ingredientsStyles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';

const TYPES = {
  bun: "Булки",
  main: "Начинки",
  sauce: "Соусы"
}

const IngredientsTabs = () => {
  const [current, setCurrent] = React.useState('Buns')
  return (
    <div style={{ display: 'flex' }} className="mt-5">
      <Tab value="Buns" active={current === 'Buns'} onClick={setCurrent}>
          Булки
      </Tab>
      <Tab value="Sauces" active={current === 'Sauces'} onClick={setCurrent}>
          Соусы
      </Tab>
      <Tab value="Filling" active={current === 'Filling'} onClick={setCurrent}>
          Начинки
      </Tab>
    </div>
  )
}

const Ingredient = ({ ingredient: {name, price, count = 0, image} }) => {
  return <div className={`${ingredientsStyles.ingredient} ml-6`}> 
    <img src={image} className="ml-4" alt="ingredient"/>
    <div className="mt-1">
      <Price price={price} />
    </div>
    <p className="text text_type_main-default">{name}</p>
    { count > 0 && <Counter count={count} size="default" extraClass={ingredientsStyles.counter} />}
  </div>
}

Ingredient.propTypes = {
  ingredient: INGREDIENT_TYPE
};

const IngredientsGroup = ({type, ingredients}) => {
  return <>
    <p className="text text_type_main-medium mt-10">{TYPES[type]}</p>
    <div className={ingredientsStyles.ingredientsGroup}>
      {
        ingredients.map((ingredient, index) => {
          return <Ingredient ingredient={ingredient} key={index}/>
        })
      }
    </div>
  </>;
}

IngredientsGroup.propTypes = {
  ingredients: INGREDIENTS_ARRAY_TYPE,
  type: PropTypes.string.isRequired
};

const groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

const BurgerIngredients = ({ingredients}) => {
    const typeToIngredients = groupBy(ingredients, 'type');
    const groups = [];
    let i = 0;
    for (const type in typeToIngredients) {
      groups.push(<IngredientsGroup type={type} ingredients={typeToIngredients[type]} key={i++}/>);
    }

    return <div className={ingredientsStyles.container}>
        <p className="text text_type_main-large mt-10">Соберите бургер</p>
        <IngredientsTabs />
        <div className={ingredientsStyles.allIngredients}>
          {
            groups
          }
        </div>
    </div>
}

BurgerIngredients.propTypes = {
  ingredients: INGREDIENTS_ARRAY_TYPE
}

export default BurgerIngredients;