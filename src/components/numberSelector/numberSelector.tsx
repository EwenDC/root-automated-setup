import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const adjustValue = (amount: number) => {
    const newValue = value + amount;
    if (newValue >= minVal && newValue <= maxVal) onChange(newValue);
  };

  return (
    <>
      <label className={styles.label}>{t(`label.${id}`)}</label>
      <span className={styles.wrapper}>
        <button
          onClick={() => adjustValue(-1)}
          disabled={value <= minVal}
          className={styles.button}
        >
          -
        </button>
        {value}
        <button
          onClick={() => adjustValue(+1)}
          disabled={value >= maxVal}
          className={styles.button}
        >
          +
        </button>
      </span>
    </>
  );
};
