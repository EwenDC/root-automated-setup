import classNames from "classnames";
import React, { PropsWithChildren, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Disableable, WithCode } from "../../types";
import { useAppSelector } from "../hooks";
import { StepContext } from "../step";
import { RootState } from "../store";
import styles from "./componentList.module.css";

interface ComponentListProps<T extends WithCode<Disableable>> {
  selector: (state: RootState) => T[];
  toggleFunc: (code: string) => void;
  translationPrefix: string;
  lockFunc?: (component: T) => boolean;
}

export const ComponentList = <T extends WithCode<Disableable>>(
  props: PropsWithChildren<ComponentListProps<T>>
) => {
  const { selector, toggleFunc, translationPrefix, lockFunc } = props;
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
          const componentLocked = lockFunc ? lockFunc(component) : false;
          return (
            <button
              key={component.code}
              className={classNames(styles.expansion, {
                [styles.enabled]: component.enabled && !componentLocked,
                [styles.locked]: componentLocked,
              })}
              onClick={() => toggleFunc(component.code)}
              disabled={!stepActive || componentLocked}
            >
              {t(`${translationPrefix}${component.code}`)}
            </button>
          );
        }
        return null;
      })}
    </div>
  );
};
