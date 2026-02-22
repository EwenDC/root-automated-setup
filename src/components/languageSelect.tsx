import { useEffect, useId, useOptimistic, useTransition } from 'react'
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

  // Immediately update UI when a new language is selected
  const [_isPending, startTransition] = useTransition()
  const [language, setLanguage] = useOptimistic(activeLanguage)

  const radioName = useId()
  const labelId = useId()

  return (
    <fieldset
      className="language-select"
      role="radiogroup"
      name={radioName}
      aria-labelledby={labelId}
    >
      {/* Can't actually use legend as it won't render inside the fieldset */}
      <span
        id={labelId}
        className="legend"
      >
        <LocaleText i18nKey="label.changeLanguage" />
      </span>
      :
      {languages.map(({ name, locale, image }) => {
        const active = language === locale
        return (
          <label
            key={locale}
            title={name}
          >
            <input
              type="radio"
              name={radioName}
              checked={active}
              onChange={() => {
                startTransition(async () => {
                  setLanguage(locale)
                  await i18n.changeLanguage(locale)
                })
              }}
            />
            <img
              alt={name}
              src={image}
            />
          </label>
        )
      })}
    </fieldset>
  )
}

export default LanguageSelect
