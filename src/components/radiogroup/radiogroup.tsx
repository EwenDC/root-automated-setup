import classNames from "classnames";
import { useContext } from "react";
import { Trans } from "react-i18next";
import { StepContext } from "../step";
import styles from "./radiogroup.module.css";

interface RadiogroupProps {
  id: string;
  defaultValue?: boolean;
  onChange: (value: boolean) => void;
}

export const Radiogroup: React.FC<RadiogroupProps> = ({
  id,
  defaultValue,
  onChange,
}) => {
  const { stepActive } = useContext(StepContext);
  return (
    <div
      className={classNames(styles.container, {
        [styles.inactive]: !stepActive,
      })}
    >
      <div className={styles.option}>
        <input
          name={id}
          id={`${id}False`}
          type="radio"
          className={styles.radio}
          checked={!defaultValue}
          disabled={!stepActive}
          onChange={() => onChange(false)}
        />
        <label htmlFor={`${id}False`} className={styles.label}>
          <Trans i18nKey={`label.${id}.false`} />
        </label>
      </div>
      <div className={styles.option}>
        <input
          name={id}
          id={`${id}True`}
          type="radio"
          className={styles.radio}
          checked={defaultValue ?? false}
          disabled={!stepActive}
          onChange={() => onChange(true)}
        />
        <label htmlFor={`${id}True`} className={styles.label}>
          <Trans i18nKey={`label.${id}.true`} />
        </label>
      </div>
    </div>
  );
};
