// eslint-disable-next-line no-unused-vars
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./index.css";
// Estilos css
import "./assets/css/bootstrap.css";
import "./assets/css/ui.css";
import "./assets/css/responsive.css";
// import "./assets/fonts/fontawesome/css/all.min.css";
import "sweetalert2/dist/sweetalert2.js";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
