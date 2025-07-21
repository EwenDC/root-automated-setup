import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { languages } from '../i18nSetup'
import LocaleText from './localeText'

const LanguageSelect: React.FC = () => {
  const { i18n } = useTranslation()
  const activeLanguage = i18n.resolvedLanguage ?? i18n.language

  // Make sure the HTML lang attribute is set correctly
  useEffect(() => {
    document.documentElement.lang = activeLanguage
  }, [activeLanguage])

  // Locally track selected language so the UI updates immediately
  const [language, setLanguage] = useState(activeLanguage)
  useEffect(() => {
    void i18n.changeLanguage(language)
  }, [i18n, language])

  return (
    <div
      className="language-select"
      role="radiogroup"
    >
      <span className="label">
        <LocaleText i18nKey="label.changeLanguage" />:
      </span>
      {languages.map(({ name, locale, image }) => {
        const active = language === locale
        return (
          <button
            className={classNames({ active })}
            key={locale}
            title={name}
            onClick={() => {
              if (!active) setLanguage(locale)
            }}
            role="radio"
            aria-checked={active}
          >
            <img
              alt={name}
              src={image}
            />
          </button>
        )
      })}
    </div>
  )
}

export default LanguageSelect
