import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import loginStyles from "./login.module.css";

export const Login = () => {
  return (
    <>
      <div className={`${loginStyles.loginContainer}`}>
        <div className={`${loginStyles.loginForm}`}>
          <p className="text text_type_main-medium mt-6">Вход</p>
          <div className="mt-6">
            <Input placeholder={"E-mail"} />
          </div>
          <div className="mt-6">
            <PasswordInput />
          </div>
          <div className="mt-6">
            <Button htmlType="button" type="primary" size="medium">
              Войти
            </Button>
          </div>
          <p className="text text_type_main-default text_color_inactive mt-20">
            Вы - новый пользователь?
            <a
              className={`ml-2 mt-4 mb-4 text text_type_main-default`}
              href="/register"
            >
              Зарегистрироваться
            </a>
          </p>
          <p className="text text_type_main-default text_color_inactive mt-4">
            Забыли пароль?
            <a
              className={`ml-2 mt-4 mb-4 text text_type_main-default`}
              href="/"
            >
              Восстановить пароль
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
