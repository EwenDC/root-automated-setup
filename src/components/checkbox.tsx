import { memo, useContext } from "react";
import { Trans, useTranslation } from "react-i18next";
import { selectStepInvalid } from "../features/selectors";
import { useAppSelector } from "../hooks";
import { stepActiveContext } from "./stepList";

interface CheckboxProps {
  id: string;
  labelKey?: string;
  defaultValue?: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, labelKey, defaultValue, onChange }) => {
  const stepActive = useContext(stepActiveContext);
  const invalid = useAppSelector(selectStepInvalid(stepActive));
  // Ensure the component re-renders when the language changes
  useTranslation();

  return defaultValue || stepActive ? (
    <div className="checkbox">
      <input
        id={id}
        type="checkbox"
        defaultChecked={defaultValue ?? false}
        disabled={!stepActive}
        onChange={(e) => onChange(e.target.checked)}
        aria-invalid={invalid ? true : undefined}
        aria-errormessage={invalid ? "appError" : undefined}
      />
      <label htmlFor={id}>
        <Trans i18nKey={labelKey ?? `label.${id}`} />
      </label>
    </div>
  ) : null;
};

export default memo(Checkbox);
