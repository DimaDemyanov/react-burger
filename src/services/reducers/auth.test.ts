import {
  AUTH_CHECKED,
  AUTH_GET_USER_FAILED,
  AUTH_GET_USER_REQUEST,
  AUTH_GET_USER_SUCCESS,
  AUTH_LOGIN_FAILED,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_FAILED,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_REGISTER_FAILED,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_UPDATE_USER_FAILED,
  AUTH_UPDATE_USER_REQUEST,
  AUTH_UPDATE_USER_SUCCESS,
} from "../actions/auth";
import { auth } from "./auth";

const initialState = {
  user: null,
  registerRequest: false,
  registerFailed: false,

  loginRequest: false,
  loginFailed: false,

  logoutRequest: false,
  logoutFailed: false,

  getUserRequest: false,
  getUserFailed: false,

  updateUserRequest: false,
  updateUserFailed: false,

  isLoggedIn: false,
  authChecked: false,
};

const user = {
  name: "testName",
  email: "testEmail",
  password: "123"
};

describe("auth reducer", () => {

  it("should handle AUTH_REGISTER_REQUEST", () => {
    expect(
      auth(initialState, {
        type: AUTH_REGISTER_REQUEST,
      }).registerRequest
    ).toEqual(true);
  });

  it("should handle AUTH_REGISTER_SUCCESS", () => {
    

    expect(
      auth(initialState, {
        type: AUTH_REGISTER_SUCCESS,
        user: user,
      })
    ).toMatchObject({
      user: {
        username: "testName",
        email: "testEmail",
      },
      registerRequest: false,
      registerFailed: false,
      isLoggedIn: true,
    });
  });

  it("should handle AUTH_REGISTER_FAILED", () => {
    expect(
      auth(initialState, {
        type: AUTH_REGISTER_FAILED,
      })
    ).toMatchObject({
      registerRequest: false,
      registerFailed: true,
      isLoggedIn: false,
    });
  });

  it("should handle AUTH_LOGIN_REQUEST", () => {
    expect(
      auth(initialState, {
        type: AUTH_LOGIN_REQUEST,
      })
    ).toMatchObject({
      loginRequest: true,
    });
  });

  it("should handle AUTH_LOGIN_SUCCESS", () => {
    expect(
      auth(initialState, {
        type: AUTH_LOGIN_SUCCESS,
        user: user,
      })
    ).toMatchObject({
      user: {
        username: "testName",
        email: "testEmail",
      },
      loginRequest: false,
      loginFailed: false,
      isLoggedIn: true,
    });
  });

  it("should handle AUTH_LOGIN_FAILED", () => {
    expect(
      auth(initialState, {
        type: AUTH_LOGIN_FAILED,
      })
    ).toMatchObject({
      loginRequest: false,
      loginFailed: true,
      isLoggedIn: false,
    });
  });

  it("should handle AUTH_LOGOUT_REQUEST", () => {
    expect(
      auth(initialState, {
        type: AUTH_LOGOUT_REQUEST,
      })
    ).toMatchObject({
      logoutRequest: true,
    });
  });

  it("should handle AUTH_LOGOUT_SUCCESS", () => {
    expect(
      auth(initialState, {
        type: AUTH_LOGOUT_SUCCESS,
      })
    ).toMatchObject({
      user: null,
      logoutRequest: false,
      logoutFailed: false,
      isLoggedIn: false,
    });
  });

  it("should handle AUTH_LOGOUT_FAILED", () => {
    expect(
      auth(initialState, {
        type: AUTH_LOGOUT_FAILED,
      })
    ).toMatchObject({
      user: null,
      logoutRequest: false,
      logoutFailed: true,
      isLoggedIn: true,
    });
  });

  it("should handle AUTH_GET_USER_REQUEST", () => {
    expect(
      auth(initialState, {
        type: AUTH_GET_USER_REQUEST,
      })
    ).toMatchObject({
      getUserRequest: true,
    });
  });

  it("should handle AUTH_GET_USER_SUCCESS", () => {
    expect(
      auth(initialState, {
        type: AUTH_GET_USER_SUCCESS,
        user: user,
      })
    ).toMatchObject({
      user: {
        username: "testName",
        email: "testEmail",
      },
      getUserRequest: false,
      getUserFailed: false,
      isLoggedIn: true,
    });
  });

  it("should handle AUTH_GET_USER_FAILED", () => {
    expect(
      auth(initialState, {
        type: AUTH_GET_USER_FAILED,
      })
    ).toMatchObject({
      getUserRequest: false,
      getUserFailed: false,
      isLoggedIn: false,
    });
  });

  it("should handle AUTH_UPDATE_USER_REQUEST", () => {
    expect(
      auth(initialState, {
        type: AUTH_UPDATE_USER_REQUEST,
      })
    ).toMatchObject({
      updateUserRequest: true,
    });
  });

  it("should handle AUTH_UPDATE_USER_SUCCESS", () => {
    expect(
      auth(initialState, {
        type: AUTH_UPDATE_USER_SUCCESS,
        user: user,
      })
    ).toMatchObject({
      user: {
        username: "testName",
        email: "testEmail",
      },
      updateUserRequest: false,
      updateUserFailed: false,
    });
  });

  it("should handle AUTH_UPDATE_USER_FAILED", () => {
    expect(
      auth(initialState, {
        type: AUTH_UPDATE_USER_FAILED,
      })
    ).toMatchObject({
      updateUserRequest: false,
      updateUserFailed: true,
    });
  });

  it("should handle AUTH_CHECKED", () => {
    expect(
      auth(initialState, {
        type: AUTH_CHECKED,
        payload: { payload: "test payload" },
      })
    ).toMatchObject({
      authChecked: { payload: "test payload" },
    });
  });
});
