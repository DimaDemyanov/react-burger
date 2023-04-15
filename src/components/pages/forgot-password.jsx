import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { resetPasswordRequest } from "../../utils/burger-api";
import forgotPasswordStyles from "./forgot-password.module.css";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onClick = async (e) => {
    await resetPasswordRequest(email)
      .then((res) => {
        if (res.success)
          return navigate("/reset-password", { state: { hasAccess: true } });
        if (!res.success) return Promise.reject(res);
      })
      .catch((err) => Promise.reject(err));
  };

  return (
    <>
      <div className={`${forgotPasswordStyles.forgotPasswordContainer}`}>
        <div className={`${forgotPasswordStyles.forgotPasswordForm}`}>
          <p className="text text_type_main-medium mt-6">
            Восстановление пароля
          </p>
          <div className="mt-6">
            <Input placeholder={"Укажите e-mail"} onChange={onChange} value={email} />
          </div>
          <div className="mt-6">
            <Button htmlType="button" type="primary" size="medium" onClick={onClick}>
              Восстановить
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
