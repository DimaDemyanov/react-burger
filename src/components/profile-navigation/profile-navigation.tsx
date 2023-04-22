import styles from "./profile-navigation.module.css";

import { useDispatch } from "react-redux";
import { ProfileLink } from "../profile-link/profile-link";
import { logout } from "../../services/actions/auth";
import { AppDispatch } from "../..";

export function ProfileNavigation() {
  const dispatch: AppDispatch = useDispatch();
  const handleLogout = async () => {
    dispatch(logout());
  };

  return (
    <nav className={styles.profile_navigation}>
      <ul className="mr-15 text text_type_main-medium">
        <ProfileLink href="/profile" name="Профиль" />
        <ProfileLink href="orders" name="История заказов" />
        <ProfileLink href="/login" name="Выход" onClick={handleLogout} />
      </ul>
      <p className="mt-20 text text_type_main-default text_color_inactive">
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </nav>
  );
}
