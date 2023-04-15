import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import loginStyles from "./login.module.css";
import { useDispatch } from "react-redux";
import { login } from "../../services/actions/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = (e) => {
    dispatch(login({ email, password }));
    navigate("/");
  };

  return (
    <>
      <div className={`${loginStyles.loginForm}`}>
        <p className="text text_type_main-medium mt-6">Вход</p>
        <div className="mt-6">
          <Input
            placeholder={"E-mail"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="mt-6">
          <PasswordInput onChange={(e) => setPassword(e.target.value)} value={password}/>
        </div>
        <div className="mt-6">
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            onClick={onClick}
          >
            Войти
          </Button>
        </div>
        <p className="text text_type_main-default text_color_inactive mt-20">
          Вы - новый пользователь?
          <a
            className={`auth_link ml-2 mt-4 mb-4 text text_type_main-default`}
            href="/register"
          >
            Зарегистрироваться
          </a>
        </p>
        <p className="text text_type_main-default text_color_inactive mt-4">
          Забыли пароль?
          <a className={`auth_link ml-2 mt-4 mb-4 text text_type_main-default`} href="/forgot-password">
            Восстановить пароль
          </a>
        </p>
      </div>
    </>
  );
};
