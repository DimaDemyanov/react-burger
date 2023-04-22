import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEvent, useState } from "react";
import registerStyles from "./register.module.css";
import { useDispatch } from "react-redux";
import { register } from "../../services/actions/auth";
import { Link } from "react-router-dom";
import { AppDispatch } from "../..";

export const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
  };

  return (
    <form onSubmit={onSubmit}>
      <div className={`${registerStyles.registerForm}`}>
        <p className="text text_type_main-medium mt-6">Регистрация</p>
        <div className="mt-6">
          <Input
            placeholder={"Имя"}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="mt-6">
          <Input
            placeholder={"E-Mail"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="mt-6">
          <Input
            type="password"
            placeholder="Пароль"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            error={false}
          />
        </div>
        <div className="mt-6">
          <Button htmlType="submit" type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </div>
        <p className="text text_type_main-default text_color_inactive mt-20">
          Уже зарегистрированы?
          <Link
            className={`auth_link ml-2 mt-4 mb-4 text text_type_main-default`}
            to="/login"
          >
            Войти
          </Link>
        </p>
      </div>
    </form>
  );
};
