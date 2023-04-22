import { TLoginForm, TRegisterForm, TUpdateUserForm } from "../services/actions/auth";
import { getCookie, setCookie } from "./cookie";

const BURGER_BASE_API = "https://norma.nomoreparties.space/api";

async function request(url: string, options?: RequestInit) {
  return fetch(url, options).then(checkResponse);
}

const checkResponse = (res: Response): Promise<any> => {
  if (!res.ok) {
    return res.json().then((err) => Promise.reject(new Error(err.message)));
  } else {
    return res.json();
  }
};

export const requestWithRefresh = async (url: string, options: RequestInit): Promise<any> => {
  try {
    return await request(url, options);
  } catch (err) {
    if (!(err instanceof Error)) {
      throw err;
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
        "Authorization": refreshData.accessToken
      }
      return await request(url, options);
    } else if (err.message === "Token is invalid") {
      return Promise.reject(err);
    }
  }
};

export const getIngredientsRequest = async (): Promise<any> => {
  return await request(`${BURGER_BASE_API}/ingredients`);
};

export const postOrderRequest = async (ingredientsId: Array<string>): Promise<any> => {
  const headers: HeadersInit = new Headers();
  headers.set("Content-Type", "application/json");
  const token: string | undefined = getCookie("accessToken");
  token && headers.set("Authorization", token);

  return await requestWithRefresh(`${BURGER_BASE_API}/orders`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ ingredients: ingredientsId }),
  });
};

export const registerRequest = async (form: TRegisterForm): Promise<any> => {
  const { email, password, name } = form;
  return await request(`${BURGER_BASE_API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: password, name: name }),
  });
};

export const loginRequest = async (form: TLoginForm): Promise<any> => {
  const { email, password } = form;
  return await request(`${BURGER_BASE_API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  });
};

export const logoutRequest = async (): Promise<any> => {
  return await request(`${BURGER_BASE_API}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  });
};

export const updateTokenRequest = async (): Promise<any> => {
  return await request(`${BURGER_BASE_API}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  });
};

export const getUserRequest = async (): Promise<any> => {
  return await requestWithRefresh(`${BURGER_BASE_API}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": getCookie("accessToken") ?? "",
    },
  });
};

export const updateUserRequest = async (inputs: TUpdateUserForm): Promise<any> => {
  return await requestWithRefresh(`${BURGER_BASE_API}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": getCookie("accessToken") ?? "",
    },
    body: JSON.stringify({ ...inputs }),
  });
};

export const resetPasswordRequest = async (email: string): Promise<any> => {
  return await request(`${BURGER_BASE_API}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
};

export const resetPasswordConfirm = async (password: string, code: string): Promise<any> => {
  return await request(`${BURGER_BASE_API}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, code }),
  });
};
