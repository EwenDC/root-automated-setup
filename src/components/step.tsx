import classNames from "classnames";
import { TOptions } from "i18next";
import { PropsWithChildren, useEffect, useRef } from "react";
import { Trans, useTranslation } from "react-i18next";
import { selectFlowState } from "../features/selectors";
import { SetupStep } from "../types";
import { useAppSelector } from "../hooks";
import iconComponents from "../iconComponents";
import { createContext } from "react";

interface StepContextValue {
  stepActive: boolean;
}

const defaultValue: StepContextValue = {
  stepActive: false,
};

interface StepProps extends PropsWithChildren {
  step: SetupStep;
  renderTitle?: boolean;
  renderSubtitle?: boolean;
  subtitleKey?: string;
  textKey?: string;
  textBelowChildren?: boolean;
  translationOptions?: TOptions;
  components?: readonly React.ReactElement[] | { readonly [tagName: string]: React.ReactElement };
}

export const StepContext = createContext(defaultValue);
export const StepProvider = StepContext.Provider;

export const Step: React.FC<StepProps> = ({
  step,
  renderTitle,
  renderSubtitle,
  subtitleKey,
  textKey,
  textBelowChildren = false,
  translationOptions,
  components,
  children,
}) => {
  const { currentStep, skippedSteps } = useAppSelector(selectFlowState);
  const { t, i18n } = useTranslation();
  const sectionElement = useRef<HTMLElement>(null);

  // Figure out if we are the active step so we can tell children and trigger effects
  const stepActive = currentStep === step;
  // Skip rendering if the setup process isn't up to our step or we were skipped
  const stepRendered = currentStep >= step && !skippedSteps[step];

  // Trigger a scroll-to effect when we become active
  useEffect(() => {
    if (stepActive)
      sectionElement.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion)").matches ? "auto" : "smooth",
      });
  });

  // Generate the (sub)title text in advance so we can use it to rename the window (if required)
  let titleText: string | null = null;
  let subtitleText: string | null = null;

  // Only compute the titles if we will actually render
  // We do this instead of returning null here as the useEffect hook must always be called
  if (stepRendered) {
    // Only generate if the prerequisites for rendering the title are met
    const defaultTitleKey = "setupStep." + SetupStep[step] + ".title";
    if (renderTitle ?? i18n.exists(defaultTitleKey))
      titleText = t(defaultTitleKey, translationOptions);

    // Only generate if the prerequisites for rendering the subtitle are met
    const defaultSubtitleKey = "setupStep." + SetupStep[step] + ".subtitle";
    if (renderSubtitle ?? subtitleKey ?? i18n.exists(defaultSubtitleKey))
      subtitleText = t(subtitleKey ?? defaultSubtitleKey, translationOptions);
  }

  // Rename the window to match our step (if we are the active step)
  useEffect(() => {
    if (stepActive)
      // Preappend the step title or subtitle if our step has one
      document.title =
        (titleText || subtitleText ? (titleText || subtitleText) + " - " : "") +
        t("label.pageTitle");
  }, [stepActive, titleText, subtitleText, t]);

  return stepRendered ? (
    <StepProvider value={{ stepActive }}>
      <section className={classNames({ inactive: !stepActive })} ref={sectionElement}>
        {titleText && <h2>{titleText}</h2>}
        {subtitleText && <h3>{subtitleText}.</h3>}
        {textBelowChildren ? children : null}
        <Trans
          i18nKey={textKey ?? "setupStep." + SetupStep[step] + ".body"}
          count={translationOptions?.count} // For Trans component count cannot be passed in with options
          tOptions={translationOptions}
          components={{ ...iconComponents, ...components }}
        />
        {!textBelowChildren ? children : null}
      </section>
    </StepProvider>
  ) : null;
};

export default Step;
