import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import profileInfoStyles from "./profile-info.module.css";
import { useSelector } from "react-redux";

export const ProfileInfo = () => {
    const { user } = useSelector((store) => store.auth);

    return (
        <div className={`${profileInfoStyles.profileInfoForm}`}>
          <div className="mt-6">
            <Input placeholder={"Имя"} icon={"EditIcon"} value={user.username} />
          </div>
          <div className="mt-6">
            <Input placeholder={"Логин"} icon={"EditIcon"} value={user.email} />
          </div>
          <div className="mt-6">
            <Input type="password" placeholder="Пароль" icon={"EditIcon"} value={user.password} />
          </div>
        </div>
    );
}