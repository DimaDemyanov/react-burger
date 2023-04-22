import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import priceStyles from "./price.module.css";
import { FC } from "react";

interface IPrice {
  price: number,
  textSize?: string
}

const Price: FC<IPrice> = ({ price, textSize = "default" }) => {
  return (
    <div className={`${priceStyles.price}`}>
      <p className={`text text_type_digits-${textSize}`}>{price}</p>
      <div className="ml-1">
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

export default Price;
