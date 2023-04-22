import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import profileInfoStyles from "./profile-info.module.css";
import { useSelector, useDispatch } from "react-redux";
import { ChangeEvent, FormEvent, useState } from "react";
import { TUpdateUserForm, updateUser } from "../../services/actions/auth";
import useForm from "../hooks/useForm";
import { AppDispatch, RootState } from "../..";

export const ProfileInfo = () => {
  const { user } = useSelector<RootState, any>((store) => store.auth);

  const dispatch: AppDispatch = useDispatch();
  const [showButtons, setShowButtons] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [form, handleChange, setForm] = useForm<TUpdateUserForm>({
    name: user.username,
    email: user.email,
    password: "12345678",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "password") {
      setPasswordChanged(true);
    }
    handleChange(e);
    setShowButtons(true);
  };

  const handleCancel = () => {
    setForm({
      name: user.username,
      email: user.email,
      password: "12345678",
    });
    setShowButtons(false);
    setPasswordChanged(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!passwordChanged) {
      dispatch(updateUser({ name: form.name, email: form.email }));
    } else {
      dispatch(updateUser(form));
    }
    setShowButtons(false);
    setPasswordChanged(false);
  };

  const [inputIsActive, setInputIsActive] = useState(false);

  const onIconClick = () => {
    setInputIsActive(true);
  };

  return (
    <form
      className={`${profileInfoStyles.profileInfoForm}`}
      onSubmit={handleSubmit}
    >
      <div className="mt-6">
        <Input
          placeholder="Имя"
          name="name"
          icon="EditIcon"
          value={form.name}
          error={false}
          onChange={onChange}
          onIconClick={onIconClick}
          onBlur={() => setInputIsActive(false)}
          disabled={inputIsActive ? false : true}
        />
      </div>
      <div className="mt-6">
        <Input
          type="email"
          placeholder="Логин"
          name="email"
          icon="EditIcon"
          value={form.email}
          onChange={onChange}
        />
      </div>
      <div className="mt-6">
        <Input
          type="password"
          placeholder="Пароль"
          name="password"
          icon="EditIcon"
          error={false}
          value={form.password ?? ""}
          onChange={onChange}
        />
      </div>
      {showButtons && (
        <div className="mt-6">
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={handleCancel}
          >
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};
