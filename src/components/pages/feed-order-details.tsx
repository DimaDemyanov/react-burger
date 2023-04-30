import { useAppSelector } from "../../services/store";
import { FeedOrder } from "../feed-order/feed-order";
import styles from "./feed-order-details.module.css";

function FeedOrderDetails({
  isProfileOrder,
}: {
  isProfileOrder: boolean;
}): JSX.Element {
  const ordersProfileLoaded = useAppSelector((store) => store.ws.userOrders);
  const ordersFeedLoaded = useAppSelector((store) => store.ws.orders);
  const page = isProfileOrder ? (
    <>
      {ordersProfileLoaded && (
        <section className={`${styles.feed_show_order_section}`}>
          <FeedOrder isModal={false} isProfileOrder={isProfileOrder} />
        </section>
      )}
    </>
  ) : (
    <>
      {ordersFeedLoaded && (
        <section className={`${styles.feed_show_order_section}`}>
          <FeedOrder isModal={false} isProfileOrder={isProfileOrder} />
        </section>
      )}
    </>
  );
  return page;
}

export { FeedOrderDetails };
