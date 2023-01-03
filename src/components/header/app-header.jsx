import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import headerStyles from './app-header.module.css';

const HeaderButton = ({name, Icon, type, isActive = true}) => {
    return <div className={headerStyles.buttons + (isActive ? "" : " text_color_inactive") + " ml-2 mt-4 mb-4"}>
        <Icon className="ml-5" type={type} />
        <p className="ml-2 mr-5">{name}</p>
    </div>
}

const AppHeader = () => {
    return (
        <div className={headerStyles.header}>
            <div className={headerStyles.buttons}>
                <HeaderButton name="Конструктор" Icon={BurgerIcon} type="primary" />
                <HeaderButton name="Лента заказов" Icon={ListIcon} type="secondary" isActive={false}/>
            </div>
            <Logo />
            <div className={headerStyles.buttons}>
                <HeaderButton name="Личный кабинет" Icon={ProfileIcon} type="secondary" isActive={false}/>
            </div>
        </div>
    )
};

export default AppHeader;