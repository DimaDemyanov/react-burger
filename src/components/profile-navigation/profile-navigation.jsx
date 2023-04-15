import styles from "./profile-navigation.module.css";

import { ProfileLink } from "../profile-link/profile-link";

export function ProfileNavigation() {
  return (
    <nav className={styles.profile_navigation}>
      <ul className="mr-15 text text_type_main-medium">
        <ProfileLink name={"Профиль"} />
        <ProfileLink name={"История заказов"} />
        <ProfileLink name={"Выход"} />
      </ul>
      <p className="mt-20 text text_type_main-default text_color_inactive">
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </nav>
  );
}