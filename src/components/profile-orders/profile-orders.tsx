import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import OrdersFeedItem from "../../components/orders-feed-item/orders-feed-item";
import { useAppSelector } from "../../services/store";
import { TOrder } from "../../utils/types";
import styles from "./profile-orders.module.css";

export const ProfileOrders: FC = () => {
  const { userOrders } = useAppSelector((store) => {
    return store.ws;
  });

  const location = useLocation();

  return (
    <main className={styles.profileMain}>
      <section className={styles.profileOrdersSection}>
        <div className={`${styles.profileOrdersContainer} pr-2`}>
          {userOrders?.map((order: TOrder) => (
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
