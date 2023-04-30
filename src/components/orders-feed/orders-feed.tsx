import React, { FC, useEffect } from "react";
import styles from "./orders-feed.module.css";
import OrdersFeedItem from "../orders-feed-item/orders-feed-item";
import { useLocation, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { TOrder } from "../../utils/types";
import { WS_BURGER_BASE_API } from "../../utils/burger-api";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../services/actions/ws";

const OrdersFeed: FC = () => {
  const dispatch = useAppDispatch();
  const wsUrl = WS_BURGER_BASE_API + "/orders/all";

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      url: wsUrl,
    });

    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSED,
      });
    };
  }, [dispatch, wsUrl]);

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
