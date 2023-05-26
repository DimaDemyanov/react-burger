import { FeedOrder } from "../feed-order/feed-order";
import styles from "./feed-order-details.module.css";

function FeedOrderDetails({
  isProfileOrder,
}: {
  isProfileOrder: boolean;
}): JSX.Element {
  return (
    <section className={`${styles.feed_show_order_section}`}>
      <FeedOrder isModal={false} isProfileOrder={isProfileOrder} />
    </section>
  );
}

export { FeedOrderDetails };
