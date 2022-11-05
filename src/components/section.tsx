import classNames from "classnames";
import { TOptions } from "i18next";
import { memo, PropsWithChildren, useContext, useEffect, useRef } from "react";
import { Trans, useTranslation } from "react-i18next";
import iconComponents from "../iconComponents";
import { stepActiveContext } from "./stepList";

type SectionProps = PropsWithChildren<{
  active?: boolean;
  titleKey?: string;
  subtitleKey?: string;
  textKey?: string;
  textBelowChildren?: boolean;
  translationOptions?: TOptions;
  components?: readonly React.ReactElement[] | { readonly [tagName: string]: React.ReactElement };
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
  const { t } = useTranslation();
  const sectionElement = useRef<HTMLElement>(null);

  // Trigger a scroll-to effect when we become active
  useEffect(() => {
    if (active)
      sectionElement.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion)").matches ? "auto" : "smooth",
      });
  });

  // Generate the (sub)title text in advance so we can use it to rename the window (if required)
  let titleText = titleKey ? t(titleKey, translationOptions) : null;
  let subtitleText = subtitleKey ? t(subtitleKey, translationOptions) : null;

  // Rename the window to match our step (if we are the active step)
  useEffect(() => {
    if (active)
      // Preappend the step title or subtitle if our step has one
      document.title =
        (titleText || subtitleText ? (titleText || subtitleText) + " - " : "") +
        t("label.pageTitle");
  }, [active, titleText, subtitleText, t]);

  return (
    <section className={classNames({ inactive: !active })} ref={sectionElement}>
      {titleText && <h2>{titleText}</h2>}
      {subtitleText && <h3>{subtitleText}.</h3>}
      {textBelowChildren ? children : null}
      <Trans
        i18nKey={textKey}
        count={translationOptions?.count} // For Trans component count cannot be passed in with options
        tOptions={translationOptions}
        components={{ ...iconComponents, ...components }}
      />
      {!textBelowChildren ? children : null}
    </section>
  );
};

export default memo(Section);
