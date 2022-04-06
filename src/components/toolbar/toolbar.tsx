import React from "react";
import { useTranslation } from "react-i18next";
import { nextStep, selectSetupParameters, SetupStep } from "../../features";
import { useAppDispatch, useAppSelector } from "../hooks";
import styles from "./toolbar.module.css";

export const Toolbar: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { currentStep } = useAppSelector(selectSetupParameters);

  return (
    <div className={styles.anchor}>
      <div className={styles.toolbar}>
        <button className={styles.microbutton}>{t("label.undo")}</button>
        <button className={styles.microbutton}>{t("label.redo")}</button>
        <button
          className={styles.fullbutton}
          disabled={currentStep >= SetupStep.setupEnd}
          onClick={() => dispatch(nextStep)}
        >
          {t("label.nextStep")}
        </button>
      </div>
    </div>
  );
};
