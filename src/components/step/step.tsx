import classNames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";
import { selectSetupParameters, SetupStep } from "../../features";
import { useAppSelector } from "../hooks";
import styles from "./step.module.css";
import { StepProvider } from "./stepContext";

interface StepProps {
  step: SetupStep;
  useStepText?: boolean;
}

const Step: React.FC<StepProps> = ({ step, useStepText, children }) => {
  const { currentStep, skippedSteps } = useAppSelector(selectSetupParameters);
  const { t } = useTranslation();

  // Skip rendering if the setup process isn't up to our step or we were skipped
  const stepSkipped: boolean = skippedSteps.get(step) ?? false;
  if (currentStep < step || stepSkipped) return null;

  // TODO: Trigger a scroll-to when we become active
  const stepActive = currentStep === step;

  return (
    <div
      className={classNames(styles.step, { [styles.inactive]: !stepActive })}
    >
      {useStepText ? (
        <span className={styles.stepText}>{t(`setup.${SetupStep[step]}`)}</span>
      ) : null}
      <StepProvider value={{ stepActive }}>{children}</StepProvider>
    </div>
  );
};

Step.defaultProps = {
  useStepText: true,
};

export { Step };
