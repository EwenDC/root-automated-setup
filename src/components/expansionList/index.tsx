import classNames from "classnames";
import React from "react";
import {
  selectExpansionArray,
  toggleExpansion,
} from "../../features/expansion/expansionSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import styles from "./index.module.css";

export const ExpansionList: React.FC = () => {
  const dispatch = useAppDispatch();
  const expansions = useAppSelector(selectExpansionArray);

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
          {expansion.name}
        </button>
      ))}
    </div>
  );
};
