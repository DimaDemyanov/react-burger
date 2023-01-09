import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import headerStyles from './app-header.module.css';
import PropTypes from 'prop-types';

const HeaderButton = ({ name, Icon, type, isActive = true }) => {
    let textColor = isActive ? "" : " text_color_inactive";
    return (
        <div className={`${headerStyles.buttons} ${textColor} ml-2 mt-4 mb-4 text text_type_main-default`}>
            <Icon className="ml-5" type={type} />
            <p className="ml-2 mr-5">{name}</p>
        </div>
    );
};

HeaderButton.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["primary", "secondary"]).isRequired,
    isActive: PropTypes.bool
};

const AppHeader = () => {
    return (
        <div className={headerStyles.header}>
            <div className={headerStyles.buttons}>
                <HeaderButton name="Конструктор" Icon={BurgerIcon} type="primary" />
                <HeaderButton name="Лента заказов" Icon={ListIcon} type="secondary" isActive={false} />
            </div>
            <Logo />
            <div className={headerStyles.buttons}>
                <HeaderButton name="Личный кабинет" Icon={ProfileIcon} type="secondary" isActive={false} />
            </div>
        </div>
    );
};

export default AppHeader;