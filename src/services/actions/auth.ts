import { AnyAction, Dispatch } from "redux";
import {
  registerRequest,
  loginRequest,
  logoutRequest,
  getUserRequest,
  updateUserRequest,
} from "../../utils/burger-api";
import { setCookie, deleteCookie } from "../../utils/cookie";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

export const AUTH_REGISTER_REQUEST = "AUTH/REGISTER_REQUEST";
export const AUTH_REGISTER_SUCCESS = "AUTH/REGISTER_SUCCESS";
export const AUTH_REGISTER_FAILED = "AUTH/REGISTER_FAILED";

export const AUTH_LOGIN_REQUEST = "AUTH/LOGIN_REQUEST";
export const AUTH_LOGIN_SUCCESS = "AUTH/LOGIN_SUCCESS";
export const AUTH_LOGIN_FAILED = "AUTH/LOGIN_FAILED";

export const AUTH_LOGOUT_REQUEST = "AUTH/LOGOUT_REQUEST";
export const AUTH_LOGOUT_SUCCESS = "AUTH/LOGOUT_SUCCESS";
export const AUTH_LOGOUT_FAILED = "AUTH/LOGOUT_FAILED";

export const AUTH_GET_USER_REQUEST = "AUTH/GET_USER_REQUEST";
export const AUTH_GET_USER_SUCCESS = "AUTH/GET_USER_SUCCESS";
export const AUTH_GET_USER_FAILED = "AUTH/GET_USER_FAILED";

export const AUTH_UPDATE_USER_REQUEST = "AUTH/UPDATE_USER_REQUEST";
export const AUTH_UPDATE_USER_SUCCESS = "AUTH/UPDATE_USER_SUCCESS";
export const AUTH_UPDATE_USER_FAILED = "AUTH/UPDATE_USER_FAILED";

export const AUTH_CHECKED = "AUTH/AUTH_CHECKED";

export type TRegisterForm = {
  name: string;
  email: string;
  password: string;
}

export function register(form: TRegisterForm): ThunkAction<void, {}, {}, AnyAction> {
  return function (dispatch: ThunkDispatch<{}, {}, AnyAction>) {
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
}

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
  return function (dispatch: ThunkDispatch<{}, {}, AnyAction>) {
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
  return function (dispatch: ThunkDispatch<{}, {}, AnyAction>) {
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
}

export function updateUser(form: TUpdateUserForm): ThunkAction<void, {}, {}, AnyAction> {
  return function (dispatch: ThunkDispatch<{}, {}, AnyAction>) {
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
