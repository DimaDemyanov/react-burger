import { FC } from "react";
import OrdersDashboard from "../orders-dashboard/orders-dashboard";
import OrdersFeed from "../orders-feed/orders-feed";
import feedStyles from "./feed.module.css";

export const FeedPage: FC = () => {
  return (
    <>
      <div className={feedStyles.main}>
        <div className={feedStyles.heading}>
          <h1 className="text text_type_main-large">Лента заказов</h1>
        </div>
        <div className={feedStyles.sections}>
          <section className={feedStyles.mainSection}>
            <OrdersFeed />
          </section>
          <section className={feedStyles.mainSection}>
            <OrdersDashboard />
          </section>
        </div>
      </div>
    </>
  );
};
