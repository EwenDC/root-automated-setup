import classNames from "classnames";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { GameComponent, WithCode } from "../../types";
import { useAppSelector } from "../hooks";
import { StepContext } from "../step";
import { RootState } from "../store";
import styles from "./componentList.module.css";
import defaultImage from "../../images/componentDefault.png";

interface ComponentListProps<T extends WithCode<GameComponent>> {
  selector: (state: RootState) => T[];
  toggleComponent: (component: T, index: number, array: T[]) => void;
  getLabelKey: (component: T, index: number, array: T[]) => string;
  getLockedKey?: (component: T, index: number, array: T[]) => string | null;
}

export const ComponentList = <T extends WithCode<GameComponent>>({
  selector,
  toggleComponent,
  getLabelKey,
  getLockedKey,
}: ComponentListProps<T>) => {
  const components = useAppSelector(selector);
  const { stepActive } = useContext(StepContext);
  const { t } = useTranslation();

  return (
    <div
      className={classNames(styles.carousel, {
        [styles.inactive]: !stepActive,
      })}
    >
      {components.map((component, index, array) => {
        if (component.enabled || stepActive) {
          const componentLockedMessage = getLockedKey
            ? getLockedKey(component, index, array)
            : null;
          const componentLocked = componentLockedMessage != null;
          return (
            <button
              key={component.code}
              className={classNames(styles.component, {
                [styles.enabled]: stepActive && component.enabled,
                [styles.locked]: stepActive && componentLocked,
              })}
              onClick={() => toggleComponent(component, index, array)}
              disabled={!stepActive || componentLocked}
              title={
                componentLockedMessage ? t(componentLockedMessage) : undefined
              }
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
              <div>{t(getLabelKey(component, index, array))}</div>
            </button>
          );
        }
        return null;
      })}
    </div>
  );
};
