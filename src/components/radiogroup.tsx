import { memo, useContext } from "react";
import { Trans, useTranslation } from "react-i18next";
import { selectStepInvalid } from "../features/selectors";
import { useAppSelector } from "../hooks";
import { stepActiveContext } from "./stepList";

interface RadiogroupProps {
  id: string;
  defaultValue?: boolean;
  onChange: (value: boolean) => void;
}

const Radiogroup: React.FC<RadiogroupProps> = ({ id, defaultValue = false, onChange }) => {
  const stepActive = useContext(stepActiveContext);
  const invalid = useAppSelector(selectStepInvalid(stepActive));
  // Ensure the component re-renders when the language changes
  useTranslation();

  return (
    <fieldset
      name={id}
      className="radio"
      // The inert attribute on the section already disables the inputs for us, but we do it
      // manually anyway for older browsers that don't understand inert
      disabled={!stepActive}
      aria-required="true"
      aria-invalid={invalid ? true : undefined}
      aria-errormessage={invalid ? "appError" : undefined}
    >
      {!defaultValue || stepActive ? (
        <div className="option">
          <input
            name={id}
            id={`${id}False`}
            type="radio"
            checked={!defaultValue}
            onChange={() => onChange(false)}
          />
          <label htmlFor={`${id}False`}>
            <Trans i18nKey={`label.${id}.false`} />
          </label>
        </div>
      ) : null}
      {defaultValue || stepActive ? (
        <div className="option">
          <input
            name={id}
            id={`${id}True`}
            type="radio"
            checked={defaultValue}
            onChange={() => onChange(true)}
          />
          <label htmlFor={`${id}True`}>
            <Trans i18nKey={`label.${id}.true`} />
          </label>
        </div>
      ) : null}
    </fieldset>
  );
};

export default memo(Radiogroup);
