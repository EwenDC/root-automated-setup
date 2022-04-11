import React, { useContext } from "react";
import { Trans } from "react-i18next";
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
  const { stepActive } = useContext(StepContext);
  return (
    <div className={styles.container}>
      <input
        id={id}
        type="checkbox"
        className={styles.checkbox}
        defaultChecked={defaultValue ?? false}
        disabled={!stepActive}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label htmlFor={id}>
        <Trans i18nKey={`label.${id}`} />
      </label>
    </div>
  );
};
