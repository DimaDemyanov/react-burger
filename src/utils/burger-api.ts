import {
  TLoginForm,
  TRegisterForm,
  TUpdateUserForm,
} from "../services/actions/auth";
import { getCookie, setCookie } from "./cookie";
import { TIngredient } from "./types";

const BURGER_BASE_API = "https://norma.nomoreparties.space/api";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  return fetch(url, options).then<T, T>(checkResponse);
}

const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const requestWithRefresh = async <T>(
  url: string,
  options: RequestInit
): Promise<T> => {
  try {
    return await request(url, options);
  } catch (err) {
    if (!(err instanceof Error)) {
      return Promise.reject(err);
    }
    if (err.message === "jwt expired" || "You should be authorised") {
      const refreshData = await updateTokenRequest();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      setCookie(refreshData.accessToken);
      options.headers = {
        ...options.headers,
        Authorization: refreshData.accessToken,
      };
      return await request(url, options);
    } else if (err.message === "Token is invalid") {
      return Promise.reject(err);
    }
    return Promise.reject(err);
  }
};

interface IIngredientsResponseData {
  data: Array<TIngredient>;
}

export const getIngredientsRequest = (): Promise<IIngredientsResponseData> => {
  return request(`${BURGER_BASE_API}/ingredients`);
};

interface IPostOrderResponseData {
  order: { number: number };
}

export const postOrderRequest = (
  ingredientsId: Array<string>
): Promise<IPostOrderResponseData> => {
  const headers: HeadersInit = new Headers();
  headers.set("Content-Type", "application/json");
  const token: string | undefined = getCookie("accessToken");
  token && headers.set("Authorization", token);

  return requestWithRefresh(`${BURGER_BASE_API}/orders`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ ingredients: ingredientsId }),
  });
};

export const registerRequest = (
  form: TRegisterForm
): Promise<IUpdateTokenResponseData> => {
  const { email, password, name } = form;
  return request(`${BURGER_BASE_API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: password, name: name }),
  });
};

interface ILoginRequestResponseData {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: { email: string; name: string };
}

export const loginRequest = (
  form: TLoginForm
): Promise<ILoginRequestResponseData> => {
  const { email, password } = form;
  return request(`${BURGER_BASE_API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  });
};

export const logoutRequest = (): Promise<{
  success: boolean;
  message: string;
}> => {
  return request(`${BURGER_BASE_API}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  });
};

interface IUpdateTokenResponseData {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export const updateTokenRequest = (): Promise<IUpdateTokenResponseData> => {
  return request(`${BURGER_BASE_API}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  });
};

interface IGetUserResponseData {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
}

export const getUserRequest = (): Promise<IGetUserResponseData> => {
  return requestWithRefresh(`${BURGER_BASE_API}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("accessToken") ?? "",
    },
  });
};

export const updateUserRequest = (
  inputs: TUpdateUserForm
): Promise<IGetUserResponseData> => {
  return requestWithRefresh(`${BURGER_BASE_API}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("accessToken") ?? "",
    },
    body: JSON.stringify({ ...inputs }),
  });
};

export const resetPasswordRequest = (
  email: string
): Promise<{ success: boolean; message: string }> => {
  return request(`${BURGER_BASE_API}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
};

export const resetPasswordConfirm = (
  password: string,
  code: string
): Promise<{ success: boolean; message: string }> => {
  return request(`${BURGER_BASE_API}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, code }),
  });
};
