import classNames from "classnames";
import { TOptions } from "i18next";
import { useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import { selectFlowState } from "../../features";
import { SetupStep } from "../../types";
import { useAppSelector } from "../hooks";
import styles from "./step.module.css";
import { StepProvider } from "./stepContext";

interface StepProps {
  step: SetupStep;
  renderTitle?: boolean;
  renderSubtitle?: boolean;
  subtitleOptions?: TOptions;
  textKey?: string;
  textCount?: number;
  textOptions?: Omit<TOptions, "count">; // For Trans component count cannot be passed in with options
  textBelowChildren?: boolean;
  children?: React.ReactNode;
}

export const Step: React.FC<StepProps> = ({
  step,
  renderTitle,
  renderSubtitle,
  subtitleOptions,
  textKey,
  textCount,
  textOptions,
  textBelowChildren,
  children,
}) => {
  const { currentStep, skippedSteps } = useAppSelector(selectFlowState);
  const { t, i18n } = useTranslation();

  // Figure out if we are the active step so we can tell children and trigger effects
  const stepActive = currentStep === step;

  // TODO: Trigger a scroll-to effect when we become active
  useEffect(() => {}, [stepActive]);

  // Generate the Title Text in advance so we can use it to rename the window (if required)
  const titleText =
    // Only generate if the prerequisites for rendering the title are met
    renderTitle ?? i18n.exists(`setupStep.${SetupStep[step]}.title`)
      ? t(`setupStep.${SetupStep[step]}.title`)
      : null;

  // Generate the subtitle Text in advance so we can use it to rename the window (if required)
  const subtitleText =
    // Only generate if the prerequisites for rendering the subtitle are met
    renderSubtitle ??
    subtitleOptions ?? // We need to render if options are passed in as i18n.exists misses dynamic keys
    i18n.exists(`setupStep.${SetupStep[step]}.subtitle`)
      ? t(`setupStep.${SetupStep[step]}.subtitle`, subtitleOptions)
      : null;

  // Rename the window to match our step (if we are the active step)
  useEffect(() => {
    if (stepActive)
      // Preappend the step title or subtitle if our step has one
      document.title = `${
        titleText ?? subtitleText ? `${titleText ?? subtitleText} - ` : ""
      }${t("label.pageTitle")}`;
  }, [stepActive, titleText, subtitleText, t]);

  // Skip rendering if the setup process isn't up to our step or we were skipped
  if (currentStep >= step && !skippedSteps[step]) {
    // Seperate the JSX for step text as it's rendering position changes based on textBelowChildren
    const stepText = (
      <Trans
        i18nKey={textKey ?? `setupStep.${SetupStep[step]}.body`}
        count={textCount}
        tOptions={textOptions}
      />
    );

    return (
      <section
        className={classNames(styles.step, { [styles.inactive]: !stepActive })}
      >
        {titleText != null ? (
          <h1 className={styles.title}>{titleText}</h1>
        ) : null}
        {subtitleText != null ? (
          <h2 className={styles.subtitle}>{subtitleText}.</h2>
        ) : null}
        {!textBelowChildren ? stepText : null}
        {children && (
          <StepProvider value={{ stepActive }}>{children}</StepProvider>
        )}
        {textBelowChildren ? stepText : null}
      </section>
    );
  }
  return null;
};

Step.defaultProps = {
  textBelowChildren: false,
};
