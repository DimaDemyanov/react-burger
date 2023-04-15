import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileNavigation } from "../profile-navigation/profile-navigation";
import loginStyles from "./login.module.css";

export const Profile = () => {
  return (
    <>
      <div className={`${loginStyles.loginContainer}`}>
        <div className="menu">
          <ProfileNavigation />
        </div>
        <div className={`${loginStyles.loginForm}`}>
          <div className="mt-6">
            <Input placeholder={"Имя"} icon={"EditIcon"} />
          </div>
          <div className="mt-6">
            <Input placeholder={"Логин"} icon={"EditIcon"} />
          </div>
          <div className="mt-6">
            <Input type="password" placeholder="Пароль" icon={"EditIcon"} />
          </div>
        </div>
      </div>
    </>
  );
};
