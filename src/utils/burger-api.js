import { getCookie, setCookie } from "./cookie";

const BURGER_BASE_API = "https://norma.nomoreparties.space/api";

async function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

const checkResponse = (res) => {
  if (!res.ok) {
    res.json().then((err) => Promise.reject(new Error(err.message)));
  } else {
    return res.json();
  }
};

export const requestWithRefresh = async (url, options) => {
  try {
    const res = await request(url, options);
    return res.catch();
  } catch (err) {
    if (err.message === "jwt expired" || "You should be authorised") {
      const refreshData = await updateTokenRequest();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      setCookie(refreshData.accessToken);
      options.headers["Authorization"] = refreshData.accessToken;
      return await request(url, options);
    } else if (err.message === "Token is invalid") {
      return Promise.reject(err);
    }
  }
};

export const getIngredientsRequest = async () => {
  return await request(`${BURGER_BASE_API}/ingredients`);
};

export const postOrderRequest = async (ingredientsId) => {
  return await request(`${BURGER_BASE_API}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("accessToken"),
    },
    body: JSON.stringify({ ingredients: ingredientsId }),
  });
};

export const registerRequest = async (form) => {
  const { email, password, name } = form;
  return await request(`${BURGER_BASE_API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: password, name: name }),
  });
};

export const loginRequest = async (form) => {
  const { email, password } = form;
  return await request(`${BURGER_BASE_API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  });
};

export const logoutRequest = async () => {
  return await request(`${BURGER_BASE_API}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  });
};

export const updateTokenRequest = async () => {
  return await request(`${BURGER_BASE_API}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  });
};

export const getUserRequest = async () => {
  return await requestWithRefresh(`${BURGER_BASE_API}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("accessToken"),
    },
  });
};

export const updateUserRequest = async ({ name, email, password = null }) => {
  const inputs = { name: name, email: email };
  if (password) {
    inputs["password"] = password;
  }
  return await requestWithRefresh(`${BURGER_BASE_API}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("accessToken"),
    },
    body: JSON.stringify({ ...inputs }),
  });
};

export const resetPasswordRequest = async (email) => {
  return await request(`${BURGER_BASE_API}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
};

export const resetPasswordConfirm = async (password, code) => {
  return await request(`${BURGER_BASE_API}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, code }),
  });
};