import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../services/store";
import { TOrder } from "../../utils/types";
import OrdersFeedItem from "../orders-feed-item/orders-feed-item";
import styles from "./orders-feed.module.css";

const OrdersFeed: FC = () => {
  const { orders } = useAppSelector((store) => store.ws);
  const location = useLocation();

  return (
    <div className={`${styles.container} pr-2`}>
      {orders.map((order: TOrder) => (
        <Link
          to={{
            pathname: `${location.pathname}/${order.number}`,
          }}
          state={{ background: location }}
          key={order._id}
        >
          <OrdersFeedItem
            createdAt={order.createdAt}
            ingredients={order.ingredients}
            name={order.name}
            number={order.number}
            status={order.status}
            updatedAt={order.updatedAt}
            _id={order._id}
            displayStatus={false}
          />
        </Link>
      ))}
    </div>
  );
};

export default OrdersFeed;
