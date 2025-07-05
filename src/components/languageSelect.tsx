import classNames from "classnames";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { languages } from "../i18nSetup";

const LanguageSelect: React.FC = () => {
  const { i18n, t } = useTranslation();
  const activeLanguage = i18n.resolvedLanguage ?? i18n.language;

  // Make sure the HTML lang attribute is set correctly
  useEffect(() => {
    document.documentElement.lang = activeLanguage;
  }, [activeLanguage]);

  return (
    <div className="language-select" role="radiogroup">
      <span className="label">{t("label.changeLanguage")}:</span>
      {languages.map(({ name, locale, image }) => {
        const active = activeLanguage === locale;
        return (
          <button
            className={classNames({ active })}
            key={locale}
            title={name}
            onClick={active ? undefined : () => void i18n.changeLanguage(locale)}
            role="radio"
            aria-checked={active}
          >
            <img alt={name} src={image} />
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSelect;
