import { FC } from "react";
import { useAppSelector } from "../../services/store";
import { TOrder } from "../../utils/types";
import styles from "./orders-dashboard.module.css";

const OrdersDashboard: FC = () => {
  const { orders, totalOrders, totalOrdersToday } = useAppSelector(
    (store) => store.ws
  );

  const ordersReady: TOrder[] = orders
    .filter((order: TOrder) => order.status === "done")
    .slice(0, 20);
  const ordersInProgress: TOrder[] = orders
    .filter((order: TOrder) => order.status === "pending")
    .slice(0, 20);

  return (
    <div className={`${styles.container} ml-15`}>
      <div className={styles.statuses}>
        <div className={styles.status}>
          <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
          <div className={`${styles.numbers} text text_type_digits-default`}>
            {ordersReady.map((item) => (
              <div
                className={`${styles.number} mb-2 text text_type_digits-default`}
                key={item._id}
              >
                {item.number}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.status}>
          <h2 className="text text_type_main-medium mb-6">В работе:</h2>
          <div className={styles.orderDashboardNumbers}>
            {ordersInProgress.map((item) => (
              <span
                className={`${styles.number} mb-2 text text_type_digits-default`}
                key={item._id}
              >
                {item.number}
              </span>
            ))}
          </div>
        </div>
      </div>
      <h2 className="text text_type_main-medium mt-15">
        Выполнено за все время:
      </h2>
      <h2 className="text text_type_digits-large">{totalOrders}</h2>
      <h2 className="text text_type_main-medium mt-15">
        Выполнено за сегодня:
      </h2>
      <h2 className="text text_type_digits-large">{totalOrdersToday}</h2>
    </div>
  );
};

export default OrdersDashboard;
