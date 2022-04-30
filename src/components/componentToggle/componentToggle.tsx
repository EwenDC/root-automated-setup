import classNames from "classnames";
import { useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { GameComponent, WithCode } from "../../types";
import { useAppSelector } from "../hooks";
import { StepContext } from "../step";
import { RootState } from "../store";
import styles from "./componentToggle.module.css";
import defaultImage from "../../images/componentDefault.png";

interface ComponentListProps<T extends WithCode<GameComponent>> {
  selector: (state: RootState) => T[];
  toggleComponent: (component: T, index: number, array: T[]) => void;
  getLabelKey: (component: T, index: number, array: T[]) => string;
  getLockedKey?: (component: T, index: number, array: T[]) => string | null;
  unsorted?: boolean;
}

export const ComponentToggle = <T extends WithCode<GameComponent>>({
  selector,
  toggleComponent,
  getLabelKey,
  getLockedKey,
  unsorted,
}: ComponentListProps<T>) => {
  const components = useAppSelector(selector);
  const { stepActive } = useContext(StepContext);
  const { t, i18n } = useTranslation();

  // Sort our component list, then memoize the result for performance
  const sortedComponents = useMemo(() => {
    // For sorting purposes, generate the final label text in advance
    const returnValue = components.map((component, index, array) => ({
      ...component,
      label: t(getLabelKey(component, index, array)),
    }));

    // Sort it by default (unless asked explicitly not to)
    if (!unsorted)
      returnValue.sort((a, b) => a.label.localeCompare(b.label, i18n.language));

    return returnValue;
  }, [components, t, getLabelKey, unsorted, i18n.language]);

  return (
    <div
      className={classNames(styles.carousel, {
        [styles.inactive]: !stepActive,
      })}
    >
      {sortedComponents.map((component, index, array) => {
        if (component.enabled || stepActive) {
          const componentLockedKey = getLockedKey
            ? getLockedKey(component, index, array)
            : null;
          const componentLocked = componentLockedKey != null;
          return (
            <button
              key={component.code}
              className={classNames(styles.component, {
                [styles.enabled]: stepActive && component.enabled,
                [styles.locked]: stepActive && componentLocked,
              })}
              onClick={() => toggleComponent(component, index, array)}
              disabled={!stepActive || componentLocked}
              title={componentLockedKey ? t(componentLockedKey) : undefined}
              role="switch"
              aria-checked={component.enabled}
            >
              <img
                className={styles.image}
                src={
                  component.image
                    ? `${process.env.PUBLIC_URL}/images/${component.image}`
                    : defaultImage
                }
                alt="" // We're including the alt text in the button itself so don't bother reading out the image
                aria-hidden="true"
              />
              <div>{component.label}</div>
            </button>
          );
        }
        return null;
      })}
    </div>
  );
};
