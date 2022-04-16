import classNames from "classnames";
import { TOptions } from "i18next";
import { Trans, useTranslation } from "react-i18next";
import { selectFlowState } from "../../features";
import { SetupStep } from "../../types";
import { useAppSelector } from "../hooks";
import styles from "./step.module.css";
import { StepProvider } from "./stepContext";

interface StepProps {
  step: SetupStep;
  renderTitle?: boolean;
  titleKey?: string;
  titleOptions?: TOptions;
  renderSubtitle?: boolean;
  subtitleKey?: string;
  subtitleOptions?: TOptions;
  textKey?: string;
  textCount?: number;
  textOptions?: Omit<TOptions, "count">; // For Trans component count cannot be passed in with options
}

const Step: React.FC<StepProps> = ({
  step,
  renderTitle,
  titleKey,
  titleOptions,
  renderSubtitle,
  subtitleKey,
  subtitleOptions,
  textKey,
  textCount,
  textOptions,
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
      {renderTitle ??
      titleKey ??
      i18n.exists(`setupStep.${SetupStep[step]}.title`) ? (
        <h1 className={styles.title}>
          {t(titleKey ?? `setupStep.${SetupStep[step]}.title`, titleOptions)}
        </h1>
      ) : null}
      {renderSubtitle ??
      subtitleKey ??
      i18n.exists(`setupStep.${SetupStep[step]}.subtitle`) ? (
        <h2 className={styles.subtitle}>
          {t(
            subtitleKey ?? `setupStep.${SetupStep[step]}.subtitle`,
            subtitleOptions
          )}
        </h2>
      ) : null}
      <Trans
        i18nKey={textKey ?? `setupStep.${SetupStep[step]}.body`}
        count={textCount}
        tOptions={textOptions}
      />
      {children ? (
        <StepProvider value={{ stepActive }}>{children}</StepProvider>
      ) : null}
    </div>
  );
};

export { Step };
