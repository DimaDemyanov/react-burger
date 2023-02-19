import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from "./burger-constructor.module.css";
import Price from "../common/price";
import React from "react";
import OrderDetails from "./order-details";
import MainIngredient from "./main-ingredient";
import BURGER_API_URL from "../../config/api";
import { useSelector } from "react-redux";
import { ADD_CONSTRUCTOR_INGREDIENT, postOrder } from "../../services/actions";
import { useDispatch } from "react-redux";
import { useDrop } from "react-dnd";

const BurgerConstructor = () => {
  const { constructorIngredients: { bun, ingredients } , orderNumber } = useSelector(
    (state) => state
  );

  const dispatch = useDispatch();

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop({ ingredient }) {
      dispatch({type: ADD_CONSTRUCTOR_INGREDIENT, ingredient: ingredient});
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const [orderDetailsVisible, setOrderDetailsVisible] = React.useState(false);

  const onClickMakeOrder = async () => {
    await dispatch(
      postOrder(
        `${BURGER_API_URL}/orders`,
        [...ingredients, bun, "60d3b41abdacab0026a733c9"]
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
        {ingredients
          .map((ingredient, index) => {
            return <MainIngredient ingredient={ingredient} key={index} index={index}/>;
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
