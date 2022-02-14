import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { StepContext } from "../step";
import styles from "./checkbox.module.css";

interface CheckboxProps {
  id: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ id }) => {
  const { t } = useTranslation();
  const { stepActive } = useContext(StepContext);
  return (
    <>
      <label htmlFor={id} className={styles.label}>
        {t(`label.${id}`)}
      </label>
      <input
        id={id}
        type="checkbox"
        className={styles.checkbox}
        disabled={!stepActive}
      />
    </>
  );
};
