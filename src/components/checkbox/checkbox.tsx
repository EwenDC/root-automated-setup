import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { StepContext } from "../step";
import styles from "./checkbox.module.css";

interface CheckboxProps {
  id: string;
  defaultValue?: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  defaultValue,
  onChange,
}) => {
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
        defaultChecked={defaultValue ?? false}
        disabled={!stepActive}
        onChange={(e) => onChange(e.target.checked)}
      />
    </>
  );
};
