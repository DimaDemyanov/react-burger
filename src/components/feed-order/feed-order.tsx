import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../services/store";
import { countTotalById, getIngredientInfoById } from "../../utils/helpers";
import styles from "./feed-order.module.css";
import Preloader from "../preloader/preloader";

const formatStatus = (status: string) => {
  switch (status) {
    case "created":
      return "Создан";
    case "pending":
      return "Готовится";
    case "done":
      return "Выполнен";
    default:
      return "Неизвестен";
  }
};

function FeedOrder({
  isModal,
  isProfileOrder
}: {
  isModal: boolean;
  isProfileOrder: boolean;
}): JSX.Element {
  const { id } = useParams();

  const orders = useAppSelector((store) => {
    return isProfileOrder ? store.ws.userOrders : store.ws.orders;
  });
  const ingredients = useAppSelector((store) => store.ingredients);

  const order = orders?.find((el: any) => el.number + '' === id);

  if (!order) {
    return <Preloader />;
  }

  const urlPriceQtyList = getIngredientInfoById(
    order!.ingredients,
    ingredients
  );
  const total = countTotalById(order!.ingredients, ingredients);
  const status = order && (
    <p className={`mb-15 text text_type_main-small ${styles.status_colored}`}>
      <span>{formatStatus(order.status)}</span>
    </p>
  );
  return (
    <div className="p-10">
      {!isModal && (
        <h1
          className={`mb-10 text text_type_digits-default ${styles.header_id}`}
        >
          #{order?.number}
        </h1>
      )}
      <p className="mb-3 text text_type_main-medium">{order?.name}</p>
      {status && status}
      <h2 className="mb-6 text text_type_main-medium">Состав:</h2>
      <div className={`mb-10 ${styles.ingredients_box}`}>
        {urlPriceQtyList.map((el, index) => (
          <Ingredient
            url={el.url}
            price={el.price}
            name={el.name}
            qty={el.qty}
            key={index}
          />
        ))}
      </div>
      <div className={`${styles.footer}`}>
        <p className="text text_type_main-small text_color_inactive">
          <FormattedDate date={new Date(order!.createdAt)} />
        </p>
        <div className={`${styles.flex_wrapper}`}>
          <p className="text text_type_digits-default">{total}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}

function Ingredient({
  url,
  price,
  name,
  qty,
}: {
  url: string;
  price: number;
  name: string;
  qty: number;
}): JSX.Element {
  return (
    <div className={`mr-6 ${styles.ingredient}`}>
      <div className={`${styles.flex_wrapper}`}>
        <div className={`${styles.img_wrapper}`}>
          <img src={url} alt="test" className={`${styles.ingredients_img}`} />
        </div>
        <p className="text text_type_main-small">{name}</p>
      </div>
      <div className={`${styles.flex_wrapper}`}>
        <p className="text text_type_digits-default">
          {qty} x {price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
}

export { FeedOrder };
