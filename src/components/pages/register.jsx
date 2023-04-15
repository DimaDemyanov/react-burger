import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import registerStyles from "./register.module.css";
import { useDispatch } from "react-redux";
import { register } from "../../services/actions/auth";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const onClick = (e) => {
    dispatch(register({name, email, password}));
  };

  return (
    <>
      <div className={`${registerStyles.registerContainer}`}>
        <div className={`${registerStyles.registerForm}`}>
          <p className="text text_type_main-medium mt-6">Регистрация</p>
          <div className="mt-6">
            <Input placeholder={"Имя"} onChange={e => setName(e.target.value)} />
          </div>
          <div className="mt-6">
            <Input placeholder={"E-Mail"} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="mt-6">
            <PasswordInput onChange={e => setPassword(e.target.value)} />
          </div>
          <div className="mt-6">
            <Button htmlType="button" type="primary" size="medium" onClick={onClick}>
              Зарегистрироваться
            </Button>
          </div>
          <p className="text text_type_main-default text_color_inactive mt-20">
            Уже зарегистрированы?
            <a
              className={`ml-2 mt-4 mb-4 text text_type_main-default`}
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
