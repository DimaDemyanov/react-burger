const NORMA_API = `https://norma.nomoreparties.space/api`;

export function getIngredientsAPI() {
  return fetch(`${NORMA_API}/ingredients`).then(checkResponse);
}

export function sendOrderAPI(ingredients) {
  return fetch(`${NORMA_API}/orders`, {
    method: "POST",
    body: JSON.stringify({ ingredients: ingredients }),
    headers: { "Content-Type": "application/json" },
  }).then(checkResponse);
}

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
