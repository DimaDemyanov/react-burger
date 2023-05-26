import { AnyAction, Dispatch } from "redux";
import {
  registerRequest,
  loginRequest,
  logoutRequest,
  getUserRequest,
  updateUserRequest,
} from "../../utils/burger-api";
import { setCookie, deleteCookie } from "../../utils/cookie";
import { ThunkAction } from "redux-thunk";

export const AUTH_REGISTER_REQUEST = "AUTH_REGISTER_REQUEST";
export const AUTH_REGISTER_SUCCESS = "AUTH_REGISTER_SUCCESS";
export const AUTH_REGISTER_FAILED = "AUTH_REGISTER_FAILED";
export const AUTH_LOGIN_REQUEST = "AUTH_LOGIN_REQUEST";
export const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS";
export const AUTH_LOGIN_FAILED = "AUTH_LOGIN_FAILED";
export const AUTH_LOGOUT_REQUEST = "AUTH_LOGOUT_REQUEST";
export const AUTH_LOGOUT_SUCCESS = "AUTH_LOGOUT_SUCCESS";
export const AUTH_LOGOUT_FAILED = "AUTH_LOGOUT_FAILED";
export const AUTH_GET_USER_REQUEST = "AUTH_GET_USER_REQUEST";
export const AUTH_GET_USER_SUCCESS = "AUTH_GET_USER_SUCCESS";
export const AUTH_GET_USER_FAILED = "AUTH_GET_USER_FAILED";
export const AUTH_UPDATE_USER_REQUEST = "AUTH_UPDATE_USER_REQUEST";
export const AUTH_UPDATE_USER_SUCCESS = "AUTH_UPDATE_USER_SUCCESS";
export const AUTH_UPDATE_USER_FAILED = "AUTH_UPDATE_USER_FAILED";
export const AUTH_CHECKED = "AUTH_AUTH_CHECKED";

export interface IAuthRegisterRequestAction {
  readonly type: typeof AUTH_REGISTER_REQUEST;
}

export interface IAuthRegisterSuccessAction {
  readonly type: typeof AUTH_REGISTER_SUCCESS;
  user: TRegisterForm;
}

export interface IAuthRegisterFailedAction {
  readonly type: typeof AUTH_REGISTER_FAILED;
}

export interface IAuthLoginRequestAction {
  readonly type: typeof AUTH_LOGIN_REQUEST;
}

export interface IAuthLoginSuccessAction {
  readonly type: typeof AUTH_LOGIN_SUCCESS;
  user: TRegisterForm;
}

export interface IAuthLoginFailedAction {
  readonly type: typeof AUTH_LOGIN_FAILED;
}

export interface IAuthLogoutRequestAction {
  readonly type: typeof AUTH_LOGOUT_REQUEST;
}

export interface IAuthLogoutSuccessAction {
  readonly type: typeof AUTH_LOGOUT_SUCCESS;
}

export interface IAuthLogoutFailedAction {
  readonly type: typeof AUTH_LOGOUT_FAILED;
}

export interface IAuthGetUserRequestAction {
  readonly type: typeof AUTH_GET_USER_REQUEST;
}

export interface IAuthGetUserSuccessAction {
  readonly type: typeof AUTH_GET_USER_SUCCESS;
  user: TRegisterForm;
}

export interface IAuthGetUserFailedAction {
  readonly type: typeof AUTH_GET_USER_FAILED;
}

export interface IAuthUpdateUserRequestAction {
  readonly type: typeof AUTH_UPDATE_USER_REQUEST;
}

export interface IAuthUpdateUserSuccessAction {
  readonly type: typeof AUTH_UPDATE_USER_SUCCESS;
  user: TRegisterForm;
}

export interface IAuthUpdateUserFailedAction {
  readonly type: typeof AUTH_UPDATE_USER_FAILED;
}

export interface IAuthCheckedAction {
  readonly type: typeof AUTH_CHECKED;
  payload: any;
}

export type TUserActions = IAuthRegisterRequestAction |
  IAuthRegisterSuccessAction | 
  IAuthRegisterFailedAction | 
  IAuthLoginRequestAction |
  IAuthLoginSuccessAction |
  IAuthLoginFailedAction |
  IAuthLogoutRequestAction |
  IAuthLogoutSuccessAction | 
  IAuthLogoutFailedAction | 
  IAuthGetUserRequestAction |
  IAuthGetUserSuccessAction | 
  IAuthGetUserFailedAction | 
  IAuthUpdateUserRequestAction |
  IAuthUpdateUserSuccessAction | 
  IAuthUpdateUserFailedAction |
  IAuthCheckedAction;

export type TRegisterForm = {
  name: string;
  email: string;
  password: string;
};

export function register(
  form: TRegisterForm
): ThunkAction<void, {}, {}, AnyAction> {
  return function (dispatch) {
    dispatch({
      type: AUTH_REGISTER_REQUEST,
    });
    registerRequest(form)
      .then((res) => {
        dispatch({
          type: AUTH_REGISTER_SUCCESS,
          ...res,
        });
        return res;
      })
      .then((res) => {
        setCookie(res.accessToken);
        window.localStorage.setItem("refreshToken", res.refreshToken);
      })
      .catch(() => {
        dispatch({
          type: AUTH_REGISTER_FAILED,
        });
      });
  };
}

export type TLoginForm = {
  email: string;
  password: string;
};

export function login(form: TLoginForm): ThunkAction<void, {}, {}, AnyAction> {
  return function (dispatch: Dispatch) {
    dispatch({
      type: AUTH_LOGIN_REQUEST,
    });
    loginRequest(form)
      .then((res) => {
        dispatch({
          type: AUTH_LOGIN_SUCCESS,
          ...res,
        });
        return res;
      })
      .then((res) => {
        setCookie(res.accessToken);
        window.localStorage.setItem("refreshToken", res.refreshToken);
      })
      .catch(() => {
        dispatch({
          type: AUTH_LOGIN_FAILED,
        });
      });
  };
}

export function logout(): ThunkAction<void, {}, {}, AnyAction> {
  return function (dispatch) {
    dispatch({
      type: AUTH_LOGOUT_REQUEST,
    });
    logoutRequest()
      .then(() => {
        dispatch({
          type: AUTH_LOGOUT_SUCCESS,
        });
        dispatch({ type: AUTH_CHECKED, payload: false });
      })
      .then(() => {
        deleteCookie("accessToken");
        window.localStorage.clear();
      })
      .catch(() => {
        dispatch({
          type: AUTH_LOGOUT_FAILED,
        });
      });
  };
}

export function getUser(): ThunkAction<void, {}, {}, AnyAction> {
  return function (dispatch) {
    dispatch({
      type: AUTH_GET_USER_REQUEST,
    });
    getUserRequest()
      .then((res) => {
        dispatch({
          type: AUTH_GET_USER_SUCCESS,
          ...res,
        });
      })
      .catch(() => {
        dispatch({
          type: AUTH_GET_USER_FAILED,
        });
      })
      .then(() => {
        dispatch({ type: AUTH_CHECKED, payload: true });
      });
  };
}

export type TUpdateUserForm = {
  name: string;
  email: string;
  password?: string;
};

export function updateUser(
  form: TUpdateUserForm
): ThunkAction<void, {}, {}, AnyAction> {
  return function (dispatch) {
    dispatch({
      type: AUTH_UPDATE_USER_REQUEST,
    });
    updateUserRequest(form)
      .then((res) => {
        dispatch({ type: AUTH_UPDATE_USER_SUCCESS, ...res });
      })
      .catch(() => {
        dispatch({ type: AUTH_UPDATE_USER_FAILED });
      });
  };
}
