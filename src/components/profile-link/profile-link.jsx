import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./profile-link.module.css";

//import { logout } from "../../services/actions/auth";

export function ProfileLink({ name }) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    //dispatch(logout());
  };

  const active = `${styles.profile_link} ${styles.active}`;
  const inactive = `${styles.profile_link}`;
  switch (name) {
    case "Профиль":
      return (
        <li className={styles.list_item}>
          <NavLink
            className={({ isActive }) => (isActive ? active : inactive)}
            to={"/profile"}
            end
          >
            {name}
          </NavLink>
        </li>
      );
    case "История заказов":
      return (
        <li className={styles.list_item}>
          <NavLink
            className={({ isActive }) => (isActive ? active : inactive)}
            to={"orders"}
          >
            {name}
          </NavLink>
        </li>
      );
    case "Выход":
      return (
        <li className={styles.list_item} onClick={handleLogout}>
          <NavLink
            className={({ isActive }) => (isActive ? active : inactive)}
            to={"/"}
          >
            {name}
          </NavLink>
        </li>
      );
    default:
      return;
  }
}

ProfileLink.propTypes = {
  name: PropTypes.string.isRequired,
};