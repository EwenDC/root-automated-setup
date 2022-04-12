import { useContext } from "react";
import { Trans } from "react-i18next";
import { StepContext } from "../step";
import styles from "./numberSelector.module.css";

interface NumberSelectorProps {
  id: string;
  value: number;
  minVal: number;
  maxVal: number;
  onChange: (value: number) => void;
}

export const NumberSelector: React.FC<NumberSelectorProps> = ({
  id,
  value,
  minVal,
  maxVal,
  onChange,
}) => {
  const { stepActive } = useContext(StepContext);
  return (
    <div className={styles.container}>
      <label htmlFor={id} className={styles.label}>
        <Trans i18nKey={`label.${id}`} />
      </label>
      {stepActive ? (
        <>
          (
          <input
            id={id}
            type="number"
            className={styles.input}
            value={value}
            min={minVal}
            max={maxVal}
            size={maxVal.toString().length}
            onChange={(e) => {
              const newValue = Number(e.target.value);
              if (
                !isNaN(newValue) &&
                newValue >= minVal &&
                newValue <= maxVal
              ) {
                onChange(newValue);
              }
            }}
          />
          )
        </>
      ) : (
        <span id={id} className={styles.value}>
          {value}
        </span>
      )}
    </div>
  );
};
