import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import loginStyles from "./login.module.css";
import { useDispatch } from "react-redux";
import { login } from "../../services/actions/auth";
import { Link } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <form onSubmit={onSubmit}>
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
          <PasswordInput
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            error={false}
          />
        </div>
        <div className="mt-6">
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
          >
            Войти
          </Button>
        </div>
        <p className="text text_type_main-default text_color_inactive mt-20">
          Вы - новый пользователь?
          <Link
            className={`auth_link ml-2 mt-4 mb-4 text text_type_main-default`}
            to="/register"
          >
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive mt-4">
          Забыли пароль?
          <Link
            className={`auth_link ml-2 mt-4 mb-4 text text_type_main-default`}
            to="/forgot-password"
          >
            Восстановить пароль
          </Link>
        </p>
      </div>
    </form>
  );
};
