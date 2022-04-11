import classNames from "classnames";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { selectFlowState } from "../../features";
import { SetupStep } from "../../types";
import { useAppSelector } from "../hooks";
import styles from "./step.module.css";
import { StepProvider } from "./stepContext";

interface StepProps {
  step: SetupStep;
  titleKey?: string;
  subtitleKey?: string;
  textKey?: string;
}

const Step: React.FC<StepProps> = ({
  step,
  titleKey,
  subtitleKey,
  textKey,
  children,
}) => {
  const { currentStep, skippedSteps } = useAppSelector(selectFlowState);
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
      {titleKey ?? i18n.exists(`setupStep.${SetupStep[step]}.title`) ? (
        <h1 className={styles.title}>
          {t(titleKey ?? `setupStep.${SetupStep[step]}.title`)}
        </h1>
      ) : null}
      {subtitleKey ?? i18n.exists(`setupStep.${SetupStep[step]}.subtitle`) ? (
        <h2 className={styles.subtitle}>
          {t(subtitleKey ?? `setupStep.${SetupStep[step]}.subtitle`)}
        </h2>
      ) : null}
      {textKey ?? i18n.exists(`setupStep.${SetupStep[step]}.body`) ? (
        <Trans i18nKey={textKey ?? `setupStep.${SetupStep[step]}.body`} />
      ) : null}
      {children ? (
        <StepProvider value={{ stepActive }}>{children}</StepProvider>
      ) : null}
    </div>
  );
};

export { Step };
