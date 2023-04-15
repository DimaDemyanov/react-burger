import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./app-header.module.css";
import PropTypes from "prop-types";

const HeaderButton = ({ name, Icon, type, isActive = true, href = "/" }) => {
  let textColor = isActive ? "" : " text_color_inactive";
  return (
    <a
      className={`${headerStyles.button} ${textColor} ml-2 mt-4 mb-4 text text_type_main-default`}
    href={href}>
      <Icon className="ml-5" type={type} />
      <p className="ml-2 mr-5">{name}</p>
    </a>
  );
};

HeaderButton.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["primary", "secondary"]).isRequired,
  Icon: PropTypes.elementType,
  isActive: PropTypes.bool,
};

const AppHeader = () => {
  return (
    <div className={headerStyles.header}>
      <nav className={headerStyles.nav}>
        <div className={headerStyles.buttonsLeft}>
          <HeaderButton name="Конструктор" Icon={BurgerIcon} type="primary" />
          <HeaderButton
            name="Лента заказов"
            Icon={ListIcon}
            type="secondary"
            isActive={false}
          />
        </div>
        <div className={headerStyles.logo}>
          <Logo />
        </div>
        <div className={headerStyles.buttonsRight}>
          <HeaderButton
            name="Личный кабинет"
            Icon={ProfileIcon}
            type="secondary"
            isActive={false}
            href="/profile"
          />
        </div>
      </nav>
    </div>
  );
};

export default AppHeader;
