import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from "./burger-constructor.module.css";
import Price from "../common/price";
import React, { useContext } from "react";
import OrderDetails from "./order-details";
import IngredientsContext from "../../services/contexts";
import { postOrder } from "../../utils/api";
import MainIngredient from "./main-ingredient";
import BURGER_API_URL from "../../config/api";

const BurgerConstructor = () => {
  const ingredients = useContext(IngredientsContext);

  const bun = ingredients.find((ingredient) => ingredient.type === "bun");
  const [orderDetailsVisible, setOrderDetailsVisible] = React.useState(false);

  const onClickMakeOrder = async () => {
    await postOrder(
      `${BURGER_API_URL}/orders`,
      [...ingredients, bun].map((ingredient) => ingredient._id),
      setOrderNumber
    );
    setOrderDetailsVisible(true);
  };

  const onOrderDetailsCloseClick = () => {
    setOrderDetailsVisible(false);
  };

  const [orderNumber, setOrderNumber] = React.useState(0);

  const countSum = (ingredients) => {
    return ingredients
      .map((ingredient) => {
        if (ingredient.type === "bun") {
          return ingredient.price * 2;
        } else {
          return ingredient.price;
        }
      })
      .reduce((partialSum, a) => partialSum + a, 0);
  };

  return (
    <div className={`${constructorStyles.container} ml-10 pt-25`}>
      {bun && (
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={`${constructorStyles.bun} mb-4 ml-8`}
        />
      )}
      <div className={`${constructorStyles.mainIngredients} custom-scroll`}>
        {ingredients
          .filter((ingredient) => ingredient.type !== "bun")
          .map((ingredient, index) => {
            return <MainIngredient ingredient={ingredient} key={index} />;
          })}
      </div>
      {bun && (
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={`${constructorStyles.bun} mt-4 ml-8`}
        />
      )}

      <div className={`${constructorStyles.makeOrder} mt-10`}>
        <Price price={countSum(ingredients)} textSize="medium" />
        <div className="ml-10">
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            onClick={onClickMakeOrder}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
      {orderDetailsVisible && (
        <OrderDetails
          orderNumber={orderNumber}
          onCloseClick={onOrderDetailsCloseClick}
        />
      )}
    </div>
  );
};

BurgerConstructor.propTypes = {};

export default BurgerConstructor;
