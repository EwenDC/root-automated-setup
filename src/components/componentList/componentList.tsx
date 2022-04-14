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
  toggleComponent: (component: T) => void;
  getLabelKey: (component: T) => string;
  isLocked?: (component: T) => boolean;
  getLockedKey?: (component: T) => string;
}

export const ComponentList = <T extends WithCode<GameComponent>>({
  selector,
  toggleComponent,
  getLabelKey,
  isLocked,
  getLockedKey,
}: ComponentListProps<T>) => {
  const components = useAppSelector(selector);
  const { stepActive } = useContext(StepContext);
  const { t } = useTranslation();

  return (
    <div className={styles.carousel}>
      {components.map((component) => {
        if (component.enabled || stepActive) {
          const componentLocked = isLocked ? isLocked(component) : false;
          return (
            <button
              key={component.code}
              className={classNames(styles.component, {
                [styles.enabled]: stepActive && component.enabled,
                [styles.locked]: stepActive && componentLocked,
              })}
              onClick={() => toggleComponent(component)}
              disabled={!stepActive || componentLocked}
              title={
                componentLocked && getLockedKey
                  ? t(getLockedKey(component))
                  : undefined
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
              <div>{t(getLabelKey(component))}</div>
            </button>
          );
        }
        return null;
      })}
    </div>
  );
};
