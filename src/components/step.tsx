import classNames from "classnames";
import { TOptions } from "i18next";
import { memo, PropsWithChildren, useEffect, useRef } from "react";
import { Trans, useTranslation } from "react-i18next";
import { SetupStep } from "../types";
import iconComponents from "../iconComponents";
import { createContext } from "react";

const stepContextValue = {
  stepActive: false,
};

type StepProps = PropsWithChildren<{
  step: SetupStep;
  active?: boolean;
  renderTitle?: boolean;
  renderSubtitle?: boolean;
  subtitleKey?: string;
  textKey?: string;
  textBelowChildren?: boolean;
  translationOptions?: TOptions;
  components?: readonly React.ReactElement[] | { readonly [tagName: string]: React.ReactElement };
}>;

export const stepContext = createContext(stepContextValue);

const Step: React.FC<StepProps> = ({
  step,
  active = false,
  renderTitle,
  renderSubtitle,
  subtitleKey,
  textKey,
  textBelowChildren = false,
  translationOptions,
  components,
  children,
}) => {
  const { t, i18n } = useTranslation();
  const sectionElement = useRef<HTMLElement>(null);

  // Trigger a scroll-to effect when we become active
  useEffect(() => {
    if (active)
      sectionElement.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion)").matches ? "auto" : "smooth",
      });
  });

  // Generate the (sub)title text in advance so we can use it to rename the window (if required)
  let titleText: string | null = null;
  let subtitleText: string | null = null;

  // Only generate if the prerequisites for rendering the title are met
  const defaultTitleKey = "setupStep." + SetupStep[step] + ".title";
  if (renderTitle ?? i18n.exists(defaultTitleKey))
    titleText = t(defaultTitleKey, translationOptions);

  // Only generate if the prerequisites for rendering the subtitle are met
  const defaultSubtitleKey = "setupStep." + SetupStep[step] + ".subtitle";
  if (renderSubtitle ?? subtitleKey ?? i18n.exists(defaultSubtitleKey))
    subtitleText = t(subtitleKey ?? defaultSubtitleKey, translationOptions);

  // Rename the window to match our step (if we are the active step)
  useEffect(() => {
    if (active)
      // Preappend the step title or subtitle if our step has one
      document.title =
        (titleText || subtitleText ? (titleText || subtitleText) + " - " : "") +
        t("label.pageTitle");
  }, [active, titleText, subtitleText, t]);

  return (
    <stepContext.Provider value={{ stepActive: active }}>
      <section className={classNames({ inactive: !active })} ref={sectionElement}>
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
    </stepContext.Provider>
  );
};

export default memo(Step);
