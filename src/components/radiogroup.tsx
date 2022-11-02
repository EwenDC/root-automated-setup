import { memo, useContext } from "react";
import { Trans } from "react-i18next";
import { selectSetupParameters } from "../features/selectors";
import { useAppSelector } from "../hooks";
import { stepContext } from "./step";

interface RadiogroupProps {
  id: string;
  defaultValue?: boolean;
  onChange: (value: boolean) => void;
}

const Radiogroup: React.FC<RadiogroupProps> = ({ id, defaultValue = false, onChange }) => {
  const { errorMessage } = useAppSelector(selectSetupParameters);
  const { stepActive } = useContext(stepContext);
  return (
    <fieldset
      name={id}
      className="radio"
      disabled={!stepActive}
      aria-required="true"
      aria-invalid={stepActive && errorMessage ? true : undefined}
      aria-errormessage={stepActive && errorMessage ? "appError" : undefined}
    >
      {!defaultValue || stepActive ? (
        <div className="option">
          <input
            name={id}
            id={id + "False"}
            type="radio"
            checked={!defaultValue}
            onChange={() => onChange(false)}
          />
          <label htmlFor={id + "False"}>
            <Trans i18nKey={"label." + id + ".false"} />
          </label>
        </div>
      ) : null}
      {defaultValue || stepActive ? (
        <div className="option">
          <input
            name={id}
            id={id + "True"}
            type="radio"
            checked={defaultValue}
            onChange={() => onChange(true)}
          />
          <label htmlFor={id + "True"}>
            <Trans i18nKey={"label." + id + ".true"} />
          </label>
        </div>
      ) : null}
    </fieldset>
  );
};

export default memo(Radiogroup);
