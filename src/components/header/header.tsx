import styles from "./header.module.css";
import rootLogo from "../../images/logo.png";
import { useTranslation } from "react-i18next";

export const Header: React.FC = () => {
  const { t } = useTranslation();
  return (
    <header className={styles.container}>
      <img src={rootLogo} alt={t("label.logoAlt")} className={styles.logo} />
      <div className={styles.subtitle}>{t("label.logoText")}</div>
    </header>
  );
};
