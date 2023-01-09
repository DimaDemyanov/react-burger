import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import React from "react"
import { INGREDIENTS_ARRAY_TYPE } from "../../utils/types";
import ingredientStyles from './burger-ingredients.module.css';
import IngredientsGroup from "./ingredient-group";

const IngredientTabs = () => {
	const [current, setCurrent] = React.useState('Buns')
	return (
		<div className={`${ingredientStyles.tabs} mt-5`}>
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
};

const BurgerIngredients = ({ ingredients }) => {
	return (
		<div className={ingredientStyles.container}>
			<p className="text text_type_main-large mt-10">Соберите бургер</p>
			<IngredientTabs />
			<div className={`${ingredientStyles.allIngredients}  custom-scroll`}>
				<IngredientsGroup type={"bun"} ingredients={ingredients.filter(it => it.type === "bun")} key={0} />
				<IngredientsGroup type={"sauce"} ingredients={ingredients.filter(it => it.type === "sauce")} key={1} />
				<IngredientsGroup type={"main"} ingredients={ingredients.filter(it => it.type === "main")} key={2} />
			</div>
		</div>
	);
}

BurgerIngredients.propTypes = {
	ingredients: INGREDIENTS_ARRAY_TYPE
}

export default BurgerIngredients;