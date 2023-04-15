import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPasswordConfirm } from "../../utils/burger-api";
import resetPasswordStyles from "./reset-password.module.css";

export const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeCode = (e) => {
    setCode(e.target.value);
  };

  const onClick = async (e) => {
    e.preventDefault();
    resetPasswordConfirm(password, code)
      .then((res) => {
        if (res.success) return navigate("/login");
        if (!res.success) return Promise.reject(res);
      })
      .catch((err) => Promise.reject(err));
  };

  return (
    <>
      <div className={`${resetPasswordStyles.resetPasswordContainer}`}>
        <div className={`${resetPasswordStyles.resetPasswordForm}`}>
          <p className="text text_type_main-medium mt-6">Восстановление пароля</p>
          <div className="mt-6">
            <PasswordInput placeholder="Введите новый пароль" onChange={onChangePassword}/>
          </div>
          <div className="mt-6">
            <Input placeholder={"Введите код из письма"} onChange={onChangeCode} value={code}/>
          </div>
          <div className="mt-6">
            <Button htmlType="button" type="primary" size="medium" onClick={onClick}>
              Сохранить
            </Button>
          </div>
          <p className="text text_type_main-default text_color_inactive mt-20">
            Вспомнили пароль?
            <a
              className={`auth_link ml-2 mt-4 mb-4 text text_type_main-default`}
              href="/login"
            >
              Войти
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
