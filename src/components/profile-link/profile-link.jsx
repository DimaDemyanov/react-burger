import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./profile-link.module.css";

export function ProfileLink({ name, href, onClick }) {
  const active = `${styles.profile_link} ${styles.active}`;
  const inactive = `${styles.profile_link}`;

  return (
    <li className={styles.list_item}>
      <NavLink
        className={({ isActive }) => (isActive ? active : inactive)}
        to={href}
        onClick={onClick}
        end
      >
        {name}
      </NavLink>
    </li>
  );
}

ProfileLink.propTypes = {
  name: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};
