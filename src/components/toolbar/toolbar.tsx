import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { nextStep, redoStep, selectFlowState, undoStep } from "../../features";
import { SetupStep } from "../../types";
import { useAppDispatch, useAppSelector } from "../hooks";
import styles from "./toolbar.module.css";
import { ReactComponent as UndoIcon } from "../../images/undo.svg";
import { ReactComponent as RedoIcon } from "../../images/redo.svg";
import { ReactComponent as NextIcon } from "../../images/next.svg";

export const Toolbar: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { pastSteps, futureSteps, currentStep } =
    useAppSelector(selectFlowState);

  return (
    <footer className={styles.container}>
      <nav className={styles.toolbar}>
        <button
          className={classNames(styles.button, styles.left)}
          disabled={pastSteps.length === 0}
          onClick={() => dispatch(undoStep())}
          title={t("label.undo")}
        >
          <UndoIcon className={styles.image} />
        </button>
        <button
          className={classNames(styles.button, styles.left)}
          disabled={futureSteps.length === 0}
          onClick={() => dispatch(redoStep())}
          title={t("label.redo")}
        >
          <RedoIcon className={styles.image} />
        </button>
        <button
          className={classNames(styles.button, styles.right)}
          disabled={currentStep >= SetupStep.setupEnd}
          onClick={() => dispatch(nextStep())}
        >
          {t("label.nextStep")}
          <NextIcon className={styles.image} />
        </button>
      </nav>
    </footer>
  );
};
