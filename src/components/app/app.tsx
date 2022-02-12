import React from "react";
import { useTranslation } from "react-i18next";
import ExpansionList from "../expansionList";
import styles from "./app.module.css";

export const App: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <ExpansionList />
      <div>{t("setup.welcome")}</div>
    </div>
  );
};
