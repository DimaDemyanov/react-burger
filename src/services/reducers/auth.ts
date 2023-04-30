import {
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILED,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILED,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILED,
  AUTH_GET_USER_REQUEST,
  AUTH_GET_USER_SUCCESS,
  AUTH_GET_USER_FAILED,
  AUTH_UPDATE_USER_REQUEST,
  AUTH_UPDATE_USER_SUCCESS,
  AUTH_UPDATE_USER_FAILED,
  AUTH_CHECKED,
  TUserActions,
} from "../actions/auth";

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

export const auth = (state: any = initialState, action: TUserActions) => {
  switch (action.type) {
    case AUTH_REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
      };
    }
    case AUTH_REGISTER_SUCCESS: {
      const { user } = action;
      return {
        ...state,
        user: { ...state.user, username: user.name, email: user.email },
        registerRequest: false,
        registerFailed: false,
        isLoggedIn: true,
      };
    }
    case AUTH_REGISTER_FAILED: {
      return {
        ...state,
        registerRequest: false,
        registerFailed: true,
        isLoggedIn: false,
      };
    }
    case AUTH_LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
      };
    }
    case AUTH_LOGIN_SUCCESS: {
      const { user } = action;
      return {
        ...state,
        loginRequest: false,
        loginFailed: false,
        isLoggedIn: true,
        user: { ...state.user, username: user.name, email: user.email },
      };
    }
    case AUTH_LOGIN_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: true,
        isLoggedIn: false,
      };
    }
    case AUTH_LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
      };
    }
    case AUTH_LOGOUT_SUCCESS: {
      return {
        ...state,
        user: null,
        logoutRequest: false,
        logoutFailed: false,
        isLoggedIn: false,
      };
    }
    case AUTH_LOGOUT_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: true,
        isLoggedIn: true,
      };
    }
    case AUTH_GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
      };
    }
    case AUTH_GET_USER_SUCCESS: {
      const { user } = action;
      return {
        ...state,
        user: { ...state.user, username: user.name, email: user.email },
        getUserRequest: false,
        getUserFailed: false,
        isLoggedIn: true,
      };
    }
    case AUTH_GET_USER_FAILED: {
      return {
        ...state,
        getUserRequest: false,
        getUserFailed: false,
        isLoggedIn: false,
      };
    }
    case AUTH_UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true,
      };
    }
    case AUTH_UPDATE_USER_SUCCESS: {
      const { user } = action;
      return {
        ...state,
        user: {
          ...state.user,
          username: user.name,
          email: user.email,
          updateUserRequest: false,
          updateUserFailed: false,
        },
      };
    }
    case AUTH_UPDATE_USER_FAILED: {
      return {
        ...state,
        updateUserRequest: false,
        updateUserFailed: true,
      };
    }
    case AUTH_CHECKED: {
      return {
        ...state,
        authChecked: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
