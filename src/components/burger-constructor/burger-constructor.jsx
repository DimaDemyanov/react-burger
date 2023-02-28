import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from "./burger-constructor.module.css";
import Price from "../common/price";
import React from "react";
import OrderDetails from "./order-details";
import MainIngredient from "./main-ingredient";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { ADD_CONSTRUCTOR_INGREDIENT, createAddConstructorIngredientAction } from "../../services/actions/constructor-ingredients";
import { postOrder } from "../../services/actions/send-order";

const BurgerConstructor = () => {
  const {
    constructorIngredients: { bun, ingredients },
    orderNumber,
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop({ ingredient }) {
      dispatch(createAddConstructorIngredientAction(ingredient));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const [orderDetailsVisible, setOrderDetailsVisible] = React.useState(false);

  const onClickMakeOrder = async () => {
    dispatch(
      postOrder(
        [bun, ...ingredients, bun]
          .filter((it) => it)
          .map((ingredient) => ingredient._id)
      )
    );
    setOrderDetailsVisible(true);
  };

  const onOrderDetailsCloseClick = () => {
    setOrderDetailsVisible(false);
  };

  const countSum = (ingredients) => {
    return (
      ingredients.reduce((partialSum, a) => partialSum + a.price, 0) +
      (bun ? bun.price * 2 : 0)
    );
  };

  return (
    <div
      className={`${constructorStyles.container} ml-10 pt-25`}
      ref={dropTarget}
    >
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
        {ingredients.map((ingredient, index) => {
          return (
            <MainIngredient ingredient={ingredient} key={index} index={index} />
          );
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
          {ingredients.length > 0 && bun && (
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              onClick={onClickMakeOrder}
            >
              Оформить заказ
            </Button>
          )}
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
