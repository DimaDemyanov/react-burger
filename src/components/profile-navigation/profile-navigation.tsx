import styles from "./profile-navigation.module.css";

import { logout } from "../../services/actions/auth";
import { AppDispatch, useAppDispatch } from "../../services/store";
import { ProfileLink } from "../profile-link/profile-link";

export function ProfileNavigation({ className }: { className: string }) {
  const dispatch: AppDispatch = useAppDispatch();
  const handleLogout = async () => {
    dispatch(logout());
  };

  return (
    <nav className={`${styles.profile_navigation} ${className}`}>
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
