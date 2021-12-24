import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { store } from "./components/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { App } from "./components/app";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.register();
