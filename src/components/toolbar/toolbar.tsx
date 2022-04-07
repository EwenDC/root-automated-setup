import React from "react";
import { useTranslation } from "react-i18next";
import { ActionCreators } from "redux-undo";
import {
  nextStep,
  selectSetupParameters,
  selectSetupUndoState,
  SetupStep,
} from "../../features";
import { useAppDispatch, useAppSelector } from "../hooks";
import styles from "./toolbar.module.css";

export const Toolbar: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { canUndo, canRedo } = useAppSelector(selectSetupUndoState);
  const { currentStep } = useAppSelector(selectSetupParameters);

  return (
    <div className={styles.anchor}>
      <div className={styles.toolbar}>
        <button
          className={styles.microbutton}
          disabled={!canUndo}
          onClick={() => dispatch(ActionCreators.undo())}
        >
          {t("label.undo")}
        </button>
        <button
          className={styles.microbutton}
          disabled={!canRedo}
          onClick={() => dispatch(ActionCreators.redo())}
        >
          {t("label.redo")}
        </button>
        <button
          className={styles.fullbutton}
          disabled={currentStep >= SetupStep.setupEnd}
          onClick={() => dispatch(nextStep())}
        >
          {t("label.nextStep")}
        </button>
      </div>
    </div>
  );
};
