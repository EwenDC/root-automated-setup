import i18n, { BackendModule, CallbackError, ResourceKey } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import EnglishFlag from "./images/languages/english.png";
import SpanishFlag from "./images/languages/spanish.png";
import FrenchFlag from "./images/languages/french.png";
import ItalianFlag from "./images/languages/italian.png";

export const languages = [
  { name: "English", locale: "en", image: EnglishFlag },
  { name: "Español", locale: "es", image: SpanishFlag },
  { name: "Français", locale: "fr", image: FrenchFlag },
  { name: "Italiano", locale: "it", image: ItalianFlag },
];

void i18n
  .use<BackendModule>({
    type: "backend",
    init() {
      /* No-op as this is a required field */
    },
    read(language, _namespace, callback) {
      import(`./locales/${language}.ts`)
        .then((module: { default: ResourceKey }) => {
          callback(null, module.default);
        })
        .catch((error: unknown) => {
          callback(error as CallbackError, null);
        });
    },
  })
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // Since the fallback language is always loaded, just inline the english translations
    fallbackLng: "en",
    debug: import.meta.env.DEV,
    supportedLngs: languages.map(({ locale }) => locale),
    // Support language locales by just always loading the base language. Can be removed in the future to support explicit locales
    nonExplicitSupportedLngs: true,
    load: "languageOnly",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    react: {
      transKeepBasicHtmlNodesFor: ["br", "i", "p", "b", "ol", "li"],
    },
  });
