import { ConstructorElement, Button, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from './burger-constructor.module.css';
import Price from "../common/price";
import { INGREDIENTS_ARRAY_TYPE, INGREDIENT_TYPE } from "../../utils/types";
import React from "react";
import OrderDetails from "./order-details";

const MainIngredient = ({ ingredient }) =>
(
    <div className={`${constructorStyles.ingredient} mb-4`}>
        <DragIcon type="primary" />
        <ConstructorElement
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
            extraClass="ml-2" />
    </div>
);

MainIngredient.propTypes = {
    ingredient: INGREDIENT_TYPE
};

const BurgerConstructor = ({ ingredients }) => {
    let bun = ingredients.find(ingredient => ingredient.type === 'bun');
    const [orderDetailsVisible, setOrderDetailsVisible] = React.useState(false);

    const onClickMakeOrder = () => {
        setOrderDetailsVisible(true);
    };

    const onOrderDetailsCloseClick = () => {
        setOrderDetailsVisible(false);
    };

    return (
        <div className={`${constructorStyles.container} ml-10 pt-25`}>
            {
                bun && <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image}
                    extraClass={`${constructorStyles.bun} mb-4 ml-8`}
                />
            }
            <div className={`${constructorStyles.mainIngredients} custom-scroll`}>
                {
                    ingredients.filter(ingredient => ingredient.type !== 'bun').map((ingredient, index) => {
                        return <MainIngredient ingredient={ingredient} key={index} />
                    })
                }
            </div>
            {
                bun && <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image}
                    extraClass={`${constructorStyles.bun} mt-4 ml-8`}
                />
            }

            <div className={`${constructorStyles.makeOrder} mt-10`}>
                <Price price={100} textSize="medium" />
                <div className="ml-10">
                    <Button htmlType="button" type="primary" size="medium" onClick={onClickMakeOrder}>
                        Оформить заказ
                    </Button>
                </div>
            </div>
            {orderDetailsVisible && <OrderDetails onCloseClick={onOrderDetailsCloseClick} />}
        </div>
    )
};

BurgerConstructor.propTypes = {
    ingredients: INGREDIENTS_ARRAY_TYPE
};

export default BurgerConstructor;