import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import { Fallback } from "./components/fallback";
import * as serviceWorker from "./serviceWorker";

// Since we have to suspend for i18next anyway, may as well lazy load the app itself
const App = React.lazy(
  () => import(/* webpackPreload: true */ "./components/app")
);

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: process.env.NODE_ENV === "development",
    load: "languageOnly", // Just load the base language with no locale. Can be removed in the future to support explicit locales
    ns: "auset",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    backend: {
      loadPath: `${process.env.PUBLIC_URL}/locales/{{ns}}-{{lng}}.json`,
    },
  });

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback={<Fallback />}>
      <App />
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.register();
