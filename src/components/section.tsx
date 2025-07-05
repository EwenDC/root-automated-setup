import classNames from "classnames";
import { TOptions } from "i18next";
import { PropsWithChildren, useContext, useEffect, useRef } from "react";
import { Trans, useTranslation } from "react-i18next";
import iconComponents from "../iconComponents";
import { stepActiveContext } from "./stepList";

type SectionProps = PropsWithChildren<{
  active?: boolean;
  titleKey?: string;
  subtitleKey?: string;
  textKey?: string;
  textBelowChildren?: boolean | undefined;
  translationOptions?: TOptions;
  components?: Readonly<Record<string, React.ReactElement>>;
}>;

const Section: React.FC<SectionProps> = ({
  titleKey,
  subtitleKey,
  textKey,
  textBelowChildren = false,
  translationOptions,
  components,
  children,
}) => {
  const active = useContext(stepActiveContext);
  const { t, i18n } = useTranslation();
  const sectionElement = useRef<HTMLElement>(null);
  // Ensure the component re-renders when the language changes
  const activeLanguage = i18n.resolvedLanguage ?? i18n.language;

  // Trigger a scroll-to effect when we become active
  useEffect(() => {
    if (active && sectionElement.current)
      sectionElement.current.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion)").matches ? "auto" : "smooth",
      });
  });

  // Generate the (sub)title text in advance so we can use it to rename the window (if required)
  const titleText = titleKey && t(titleKey, translationOptions);
  const subtitleText = subtitleKey && t(subtitleKey, translationOptions);

  // Rename the window to match our step (if we are the active step)
  useEffect(() => {
    if (active) {
      const stepTitle = titleText || subtitleText;
      // Prepend the step title or subtitle if our step has one
      document.title = `${stepTitle ? `${stepTitle} - ` : ""}${t("label.pageTitle")}`;
    }
  }, [active, titleText, subtitleText, t]);

  return (
    <section className={classNames({ inactive: !active })} ref={sectionElement}>
      {titleText && <h2>{titleText}</h2>}
      {subtitleText && <h3>{subtitleText}.</h3>}
      {textBelowChildren ? children : null}
      {textKey && (
        <Trans
          key={activeLanguage}
          i18nKey={textKey}
          // For Trans component count cannot be passed in with options
          count={translationOptions?.count}
          /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
          -- Bad react-i18next types force our hand here */
          tOptions={translationOptions as any}
          components={{ ...iconComponents, ...components }}
        />
      )}
      {!textBelowChildren ? children : null}
    </section>
  );
};

export default Section;
