import classNames from "classnames";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { languages } from "../i18nSetup";

export const LanguageSelect: React.FC = () => {
  const { i18n, t } = useTranslation();

  // Make sure the HTML lang attribute is set correctly
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="language-select" role="radiogroup">
      <span className="label">{t("label.changeLanguage")}:</span>
      {languages.map(({ name, locale, image }) => {
        const active = i18n.language === locale;
        return (
          <button
            className={classNames({ active })}
            key={locale}
            title={name}
            onClick={() => i18n.changeLanguage(locale)}
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
