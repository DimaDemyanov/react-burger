import {
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";
import { createAddConstructorIngredientAction } from "../../services/actions/constructor-ingredients";
import { postOrder } from "../../services/actions/send-order";
import {
  AppDispatch,
  useAppDispatch,
  useAppSelector,
} from "../../services/store";
import { countSum } from "../../utils/helpers";
import { TIngredient } from "../../utils/types";
import Price from "../common/price";
import constructorStyles from "./burger-constructor.module.css";
import MainIngredient from "./main-ingredient";
import OrderDetails from "./order-details";

const BurgerConstructor = () => {
  const {
    constructorIngredients: { bun, ingredients },
    orderNumber,
    auth: { isLoggedIn },
  } = useAppSelector((state) => state);
  const navigate = useNavigate();

  const dispatch: AppDispatch = useAppDispatch();

  const [, dropTarget] = useDrop<{ ingredient: TIngredient }>({
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
    if (!isLoggedIn) {
      navigate("/login");
    }
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
        {ingredients.map((ingredient: TIngredient, index: number) => {
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
        <Price price={countSum(ingredients, bun)} textSize="medium" />
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

export default BurgerConstructor;
