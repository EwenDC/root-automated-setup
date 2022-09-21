import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { Provider } from "react-redux";

import Header from "./header";
import StepList from "./stepList";
import { store } from "../store";
import Toast from "./toast";
import Toolbar from "./toolbar";
import { registerServiceWorker } from "../serviceWorkerRegistration";

// Don't try to re-initalize if this chunk got hot-reloaded in a dev environment
(process.env.NODE_ENV !== "development" || !i18n.isInitialized) &&
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
      react: {
        transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p", "b"],
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

registerServiceWorker({
  onUpdate: (registration) => {
    if (registration.waiting) {
      // It's safe to skip waiting because at this point we've already served all the application
      // code and localization, which are the two things that break the app when out of sync
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
    }
  },
});

export default App;
