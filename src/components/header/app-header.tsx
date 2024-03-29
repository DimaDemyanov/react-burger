import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./app-header.module.css";
import { Link, NavLink, useMatch } from "react-router-dom";
import { FC, ReactElement } from "react";
import { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";

interface IHeaderButton {
  name: string;
  Icon: ({ type }: TIconProps & { className: string }) => ReactElement;
  type: 'secondary' | 'primary' | 'error' | 'success';
  href: string;
}

const HeaderButton: FC<IHeaderButton> = ({ name, Icon, type, href = "/" }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        `${headerStyles.button} ${
          isActive ? "" : " text_color_inactive"
        } ml-2 mt-4 mb-4 text text_type_main-default`
      }
      to={href}
    >
      <Icon className="ml-5" type={type} />
      <p className="ml-2 mr-5">{name}</p>
    </NavLink>
  );
};

const AppHeader = () => {
  const isConstructor = !!useMatch("/");
  const isFeed = !!useMatch("/feed");
  const isProfile = !!useMatch("/profile/*");

  return (
    <div className={headerStyles.header}>
      <nav className={headerStyles.nav}>
        <div className={headerStyles.buttonsLeft}>
          <HeaderButton
            name="Конструктор"
            Icon={BurgerIcon}
            type={isConstructor ? "primary" : "secondary"}
            href="/"
          />
          <HeaderButton
            name="Лента заказов"
            Icon={ListIcon}
            type={isFeed ? "primary" : "secondary"}
            href="/feed"
          />
        </div>
        <div className={headerStyles.logo}>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className={headerStyles.buttonsRight}>
          <HeaderButton
            name="Личный кабинет"
            Icon={ProfileIcon}
            type={isProfile ? "primary" : "secondary"}
            href="/profile"
          />
        </div>
      </nav>
    </div>
  );
};

export default AppHeader;
