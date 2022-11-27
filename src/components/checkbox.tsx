import { memo, useContext } from "react";
import { Trans } from "react-i18next";
import { selectSetupParameters } from "../features/selectors";
import { useAppSelector } from "../hooks";
import { stepActiveContext } from "./stepList";

interface CheckboxProps {
  id: string;
  labelKey?: string;
  defaultValue?: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, labelKey, defaultValue, onChange }) => {
  const { errorMessage } = useAppSelector(selectSetupParameters);
  const stepActive = useContext(stepActiveContext);
  return defaultValue || stepActive ? (
    <div className="checkbox">
      <input
        id={id}
        type="checkbox"
        defaultChecked={defaultValue || false}
        disabled={!stepActive}
        onChange={(e) => onChange(e.target.checked)}
        aria-invalid={stepActive && errorMessage ? true : undefined}
        aria-errormessage={stepActive && errorMessage ? "appError" : undefined}
      />
      <label htmlFor={id}>
        <Trans i18nKey={labelKey ?? "label." + id} />
      </label>
    </div>
  ) : null;
};

export default memo(Checkbox);
