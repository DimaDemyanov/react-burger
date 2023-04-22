import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { resetPasswordConfirm } from "../../utils/burger-api";
import resetPasswordStyles from "./reset-password.module.css";

export const ResetPassword = () => {
  const location = useLocation();
  const { state } = location;
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  if (!state?.hasAccess) {
    return <Navigate to={"/forgot-password"} />;
  }

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPasswordConfirm(password, code)
      .then((res) => {
        if (res.success) {
          return navigate("/login");
        } else {
          return Promise.reject(res);
        }
      })
      .catch((err) => Promise.reject(err));
  };

  return (
    <div className={`${resetPasswordStyles.resetPasswordContainer}`}>
      <form onSubmit={onSubmit}>
        <div className={`${resetPasswordStyles.resetPasswordForm}`}>
          <p className="text text_type_main-medium mt-6">
            Восстановление пароля
          </p>
          <div className="mt-6">
            <Input
              type="password"
              placeholder="Введите новый пароль"
              onChange={onChangePassword}
              value={password}
              error={false}
            />
          </div>
          <div className="mt-6">
            <Input
              placeholder={"Введите код из письма"}
              onChange={onChangeCode}
              value={code}
            />
          </div>
          <div className="mt-6">
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
            >
              Сохранить
            </Button>
          </div>
          <p className="text text_type_main-default text_color_inactive mt-20">
            Вспомнили пароль?
            <Link
              className={`auth_link ml-2 mt-4 mb-4 text text_type_main-default`}
              to="/login"
            >
              Войти
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
