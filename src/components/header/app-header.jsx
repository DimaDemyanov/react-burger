import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./app-header.module.css";
import PropTypes from "prop-types";
import { useMatch } from "react-router-dom";

const HeaderButton = ({ name, Icon, type, isActive = true, href = "/" }) => {
  let textColor = isActive ? "" : " text_color_inactive";
  return (
    <a
      className={`${headerStyles.button} ${textColor} ml-2 mt-4 mb-4 text text_type_main-default`}
      href={href}
    >
      <Icon className="ml-5" type={type} />
      <p className="ml-2 mr-5">{name}</p>
    </a>
  );
};

HeaderButton.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["primary", "secondary"]).isRequired,
  Icon: PropTypes.elementType,
  isActive: PropTypes.object,
};

const AppHeader = () => {
  const isConstructor = useMatch("/");
  const isFeed = useMatch("/feed");
  const isProfile = useMatch("/profile/*");

  return (
    <div className={headerStyles.header}>
      <nav className={headerStyles.nav}>
        <div className={headerStyles.buttonsLeft}>
          <HeaderButton
            name="Конструктор"
            Icon={BurgerIcon}
            isActive={isConstructor}
            type={isConstructor ? "primary" : "secondary"}
          />
          <HeaderButton
            name="Лента заказов"
            Icon={ListIcon}
            type={isFeed ? "primary" : "secondary"}
            isActive={isFeed}
          />
        </div>
        <div className={headerStyles.logo}>
          <Logo />
        </div>
        <div className={headerStyles.buttonsRight}>
          <HeaderButton
            name="Личный кабинет"
            Icon={ProfileIcon}
            type={isProfile ? "primary" : "secondary"}
            isActive={isProfile}
            href="/profile"
          />
        </div>
      </nav>
    </div>
  );
};

export default AppHeader;
