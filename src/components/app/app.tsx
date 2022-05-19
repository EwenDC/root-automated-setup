import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { Provider } from "react-redux";

import Header from "../header";
import StepList from "../stepList";
import { store } from "../store";
import Toast from "../toast";
import Toolbar from "../toolbar";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

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
      loadPath: process.env.PUBLIC_URL + "/locales/{{ns}}-{{lng}}.json",
    },
  });

export const App: React.FC = () => (
  <Provider store={store}>
    <Header />
    <StepList />
    <Toolbar />
    <Toast />
  </Provider>
);

serviceWorkerRegistration.register();
