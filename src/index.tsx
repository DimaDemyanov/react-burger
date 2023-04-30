import { composeWithDevTools } from "@redux-devtools/extension";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import reduxThunk from "redux-thunk";
import App from "./components/app/app";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { rootReducer } from "./services/reducers";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(reduxThunk))
);

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
