import classNames from "classnames";
import { useContext } from "react";
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
  return stepActive || defaultValue ? (
    <div
      className={classNames(styles.container, {
        [styles.inactive]: !stepActive,
      })}
    >
      <input
        id={id}
        type="checkbox"
        className={styles.checkbox}
        defaultChecked={defaultValue ?? false}
        disabled={!stepActive}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label htmlFor={id} className={styles.label}>
        <Trans i18nKey={`label.${id}`} />
      </label>
    </div>
  ) : null;
};
