import classNames from "classnames";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { selectSetupParameters, SetupStep } from "../../features";
import { useAppSelector } from "../hooks";
import styles from "./step.module.css";
import { StepProvider } from "./stepContext";

interface StepProps {
  step: SetupStep;
}

const Step: React.FC<StepProps> = ({ step, children }) => {
  const { currentStep, skippedSteps } = useAppSelector(selectSetupParameters);
  const { t, i18n } = useTranslation();

  // Skip rendering if the setup process isn't up to our step or we were skipped
  const stepSkipped: boolean = skippedSteps[step] ?? false;
  if (currentStep < step || stepSkipped) return null;

  const stepActive = currentStep === step;
  // TODO: Trigger a scroll-to when we become active

  return (
    <div
      className={classNames(styles.step, { [styles.inactive]: !stepActive })}
    >
      {i18n.exists(`setupStep.${SetupStep[step]}.title`) ? (
        <h1 className={styles.title}>
          {t(`setupStep.${SetupStep[step]}.title`)}
        </h1>
      ) : null}
      {i18n.exists(`setupStep.${SetupStep[step]}.body`) ? (
        <span className={styles.text}>
          <Trans i18nKey={`setupStep.${SetupStep[step]}.body`} />
        </span>
      ) : null}
      {children ? (
        <StepProvider value={{ stepActive }}>{children}</StepProvider>
      ) : null}
    </div>
  );
};

export { Step };
