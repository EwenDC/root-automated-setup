import classNames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  selectExpansionArray,
  toggleExpansion,
} from "../../features/expansionSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import styles from "./expansionList.module.css";

export const ExpansionList: React.FC = () => {
  const dispatch = useAppDispatch();
  const expansions = useAppSelector(selectExpansionArray);
  const { t } = useTranslation();

  return (
    <div className={styles.carousel}>
      {expansions.map((expansion) => (
        <button
          key={expansion.code}
          className={classNames(styles.expansion, {
            [styles.enabled]: expansion.enabled,
          })}
          onClick={() => dispatch(toggleExpansion(expansion.code))}
          disabled={expansion.base}
        >
          {t(expansion.name)}
        </button>
      ))}
    </div>
  );
};
