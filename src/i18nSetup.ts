import i18n, { BackendModule } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import EnglishFlag from "./images/languages/english.png";
import FrenchFlag from "./images/languages/french.png";

export const languages = [
  { name: "English", locale: "en", image: EnglishFlag },
  { name: "Français", locale: "fr", image: FrenchFlag },
];

i18n
  .use<BackendModule>({
    type: "backend",
    init() {},
    read(language, _namespace, callback) {
      import(/* webpackChunkName: "[request]" */ "./locales/" + language + ".ts")
        .then((module) => {
          callback(null, module.default);
        })
        .catch((error) => {
          callback(error, null);
        });
    },
  })
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: process.env.NODE_ENV === "development",
    supportedLngs: languages.map(({ locale }) => locale),
    // Support language locales by just always loading the base language. Can be removed in the future to support explicit locales
    nonExplicitSupportedLngs: true,
    load: "languageOnly",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    react: {
      transKeepBasicHtmlNodesFor: ["br", "i", "p", "b"],
    },
  });

export default languages;
