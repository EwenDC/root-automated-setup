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
  const size = maxVal.toString().length;

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    let newValue = Number(rawValue);
    // Only continue processing if the user entered a numeric value
    if (!isNaN(newValue)) {
      // Trim off any extra numbers at the start of the input to allow numbers to be freely typed in
      // We do this in a loop so we keep cutting off leading digits until we get a valid value
      for (let digits = size; digits > 0; digits--) {
        newValue = Number(rawValue.substr(rawValue.length - digits));
        // Stop the loop once the value is small enough
        if (newValue <= maxVal) {
          // Only make the change if the value isn't too small
          if (newValue >= minVal) onChange(newValue);
          break;
        }
      }
    }
  };

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
            size={size}
            onChange={changeHandler}
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
