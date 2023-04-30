import { FC, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import OrdersFeedItem from "../../components/orders-feed-item/orders-feed-item";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../services/actions/ws";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { WS_BURGER_BASE_API } from "../../utils/burger-api";
import { getCookie } from "../../utils/cookie";
import { TOrder } from "../../utils/types";
import styles from "./profile-orders.module.css";

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();

  const { isLoading, error } = useAppSelector((store) => store.auth);

  const wsUrl =
    WS_BURGER_BASE_API +
    "/orders?token=" +
    getCookie("accessToken")?.replace("Bearer", "").trimStart();

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

  const { orders } = useAppSelector((store) => {
    return store.ws;
  });

  const location = useLocation();

  if (isLoading) {
    return <h1>Загрузка</h1>;
  }

  if (!isLoading && error && error.length > 0) {
    return <h1>Ошибка</h1>;
  }

  return (
    <main className={styles.profileMain}>
      <section className={styles.profileOrdersSection}>
        <div className={`${styles.profileOrdersContainer} pr-2`}>
          {orders?.map((order: TOrder) => (
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
                displayStatus={true}
              />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};
