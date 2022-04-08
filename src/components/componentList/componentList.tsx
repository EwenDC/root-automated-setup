import classNames from "classnames";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Disableable, WithCode } from "../../types";
import { useAppSelector } from "../hooks";
import { StepContext } from "../step";
import { RootState } from "../store";
import styles from "./componentList.module.css";

interface ComponentListProps<T extends WithCode<Disableable>> {
  selector: (state: RootState) => T[];
  toggleComponent: (component: T) => void;
  getTooltipKey: (component: T) => string;
  isLocked?: (component: T) => boolean;
}

export const ComponentList = <T extends WithCode<Disableable>>({
  selector,
  toggleComponent,
  getTooltipKey,
  isLocked,
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
      {components.map((component) => {
        if (component.enabled || stepActive) {
          const componentLocked = isLocked ? isLocked(component) : false;
          return (
            <button
              key={component.code}
              className={classNames(styles.component, {
                [styles.enabled]: component.enabled && !componentLocked,
                [styles.locked]: componentLocked,
              })}
              onClick={() => toggleComponent(component)}
              disabled={!stepActive || componentLocked}
            >
              {t(getTooltipKey(component))}
            </button>
          );
        }
        return null;
      })}
    </div>
  );
};
