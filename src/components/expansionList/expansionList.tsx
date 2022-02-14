import classNames from "classnames";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { selectExpansionArray, toggleExpansion } from "../../features/";
import { useAppDispatch, useAppSelector } from "../hooks";
import { StepContext } from "../step";
import styles from "./expansionList.module.css";

export const ExpansionList: React.FC = () => {
  const dispatch = useAppDispatch();
  const expansions = useAppSelector(selectExpansionArray);
  const { stepActive } = useContext(StepContext);
  const { t } = useTranslation();

  return (
    <div className={styles.carousel}>
      {expansions.map((expansion) => (
        <button
          key={expansion.code}
          className={classNames(styles.expansion, {
            [styles.enabled]: expansion.enabled && !expansion.base,
            [styles.base]: expansion.base,
          })}
          onClick={() => dispatch(toggleExpansion(expansion.code))}
          disabled={!stepActive || expansion.base}
        >
          {t(`expansion.${expansion.code}`)}
        </button>
      ))}
    </div>
  );
};
