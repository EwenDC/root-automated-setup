import { useContext } from "react";
import { Trans } from "react-i18next";
import { selectSetupParameters } from "../features/selectors";
import { useAppSelector } from "../hooks";
import { StepContext } from "./step";

interface CheckboxProps {
  id: string;
  defaultValue?: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ id, defaultValue, onChange }) => {
  const { errorMessage } = useAppSelector(selectSetupParameters);
  const { stepActive } = useContext(StepContext);
  return defaultValue || stepActive ? (
    <div className="checkbox-container">
      <input
        id={id}
        type="checkbox"
        className="checkbox"
        defaultChecked={defaultValue ?? false}
        disabled={!stepActive}
        onChange={(e) => onChange(e.target.checked)}
        aria-invalid={stepActive && errorMessage ? true : undefined}
        aria-errormessage={stepActive && errorMessage ? "appError" : undefined}
      />
      <label htmlFor={id} className="checkbox-label">
        <Trans i18nKey={"label." + id} />
      </label>
    </div>
  ) : null;
};

export default Checkbox;
