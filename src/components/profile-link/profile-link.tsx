import { NavLink } from "react-router-dom";
import styles from "./profile-link.module.css";
import { FC } from "react";

interface IProfileLlinkProps {
  name: string;
  href: string;
  onClick?: () => void;
}

export const ProfileLink: FC<IProfileLlinkProps> = ({
  name,
  href,
  onClick,
}) => {
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
};
