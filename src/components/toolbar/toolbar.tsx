import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { nextStep, redoStep, selectFlowState, undoStep } from "../../features";
import { SetupStep } from "../../types";
import { useAppDispatch, useAppSelector } from "../hooks";
import styles from "./toolbar.module.css";

export const Toolbar: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { currentStep, futureSteps } = useAppSelector(selectFlowState);

  return (
    <div className={styles.anchor}>
      <div className={styles.toolbar}>
        <button
          className={classNames(styles.button, styles.left)}
          disabled={currentStep <= SetupStep.chooseExpansions}
          onClick={() => dispatch(undoStep())}
        >
          {t("label.undo")}
        </button>
        <button
          className={classNames(styles.button, styles.left)}
          disabled={futureSteps.length === 0}
          onClick={() => dispatch(redoStep())}
        >
          {t("label.redo")}
        </button>
        <button
          className={classNames(styles.button, styles.right)}
          disabled={currentStep >= SetupStep.setupEnd}
          onClick={() => dispatch(nextStep())}
        >
          {t("label.nextStep")}
        </button>
      </div>
    </div>
  );
};
