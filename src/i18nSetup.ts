import type { BackendModule, CallbackError, ResourceKey } from 'i18next'

import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import EnglishFlag from './images/languages/en-US.svg'
import SpanishFlag from './images/languages/es-ES.svg'
import FrenchFlag from './images/languages/fr-FR.svg'
import ItalianFlag from './images/languages/it-IT.svg'
import PolishFlag from './images/languages/pl-PL.svg'

export const languages = [
  { name: 'English', locale: 'en-US', image: EnglishFlag },
  { name: 'Español', locale: 'es-ES', image: SpanishFlag },
  { name: 'Français', locale: 'fr-FR', image: FrenchFlag },
  { name: 'Italiano', locale: 'it-IT', image: ItalianFlag },
  { name: 'Polski', locale: 'pl-PL', image: PolishFlag },
]

// Skip reinitialization on hot reload
if (!import.meta.hot || !i18n.isInitialized) {
  void i18n
    .use<BackendModule>({
      type: 'backend',
      init() {
        /* No-op as this is a required field */
      },
      read(language, _namespace, callback) {
        const promise = import.meta.hot
          ? // This is required for HMR to ensure that the latest file is always loaded
            import(/* @vite-ignore */ `./locales/${language}.ts?t=${Date.now()}`)
          : import(`./locales/${language}.ts`)
        promise
          .then((module: { default: ResourceKey }) => {
            callback(null, module.default)
          })
          .catch((error: unknown) => {
            callback(error as CallbackError, null)
          })
      },
    })
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: 'en-US',
      debug: import.meta.env.DEV,
      supportedLngs: languages.map(({ locale }) => locale),
      load: 'currentOnly',
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
      react: {
        bindI18nStore: !!import.meta.hot && 'added',
        transKeepBasicHtmlNodesFor: ['br', 'i', 'p', 'b', 'ol', 'li'],
      },
    })
}

// On hot reload force i18next to reload the language files
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    void i18n.reloadResources()
  })
}
