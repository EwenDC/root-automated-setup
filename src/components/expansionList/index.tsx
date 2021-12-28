import React from "react";
import {
  disableExpansion,
  enableExpansion,
  selectExpansionArray,
} from "../../features/expansion/expansionSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import style from "./index.module.css";

export const ExpansionList: React.FC = () => {
  const dispatch = useAppDispatch();
  const expansions = useAppSelector(selectExpansionArray);

  return (
    <div className={style.carousel}>
      {expansions.map((expansion) => (
        <button
          key={expansion.code}
          className={style.expansion}
          onClick={
            expansion.base
              ? undefined
              : () =>
                  dispatch(
                    expansion.enabled
                      ? disableExpansion(expansion.code)
                      : enableExpansion(expansion.code)
                  )
          }
          disabled={expansion.base}
          data-enabled={expansion.enabled}
        >
          {expansion.name}
        </button>
      ))}
    </div>
  );
};
