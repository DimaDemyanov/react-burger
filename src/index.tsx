import { composeWithDevTools } from "@redux-devtools/extension";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { AnyAction, applyMiddleware, createStore } from "redux";
import App from "./components/app/app";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { rootReducer } from "./services/reducers";
import reduxThunk, { ThunkDispatch } from "redux-thunk";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(reduxThunk))
);

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
