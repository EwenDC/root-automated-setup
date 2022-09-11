import { useTranslation } from "react-i18next";
import { nextStep, redoStep, selectFlowState, undoStep } from "../../features";
import { SetupStep } from "../../types";
import { useAppDispatch, useAppSelector } from "../hooks";
import styles from "./toolbar.module.css";
import { ReactComponent as UndoIcon } from "../../images/icons/undo.svg";
import { ReactComponent as RedoIcon } from "../../images/icons/redo.svg";
import { ReactComponent as NextIcon } from "../../images/icons/next.svg";
import { useRef, useState } from "react";
import Button from "../button";

export const Toolbar: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { pastSteps, futureSteps, currentStep } = useAppSelector(selectFlowState);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const buttonRefs = [
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
  ];

  const onKeyDownHandler = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    focusedIndex: number
  ) => {
    const maxIndex = buttonRefs.length - 1;
    let newIndex: number | undefined;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      newIndex = focusedIndex + 1 > maxIndex ? 0 : focusedIndex + 1;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      newIndex = focusedIndex - 1 < 0 ? maxIndex : focusedIndex - 1;
    } else if (event.key === "Home") {
      newIndex = 0;
    } else if (event.key === "End") {
      newIndex = maxIndex;
    }

    if (newIndex != null) {
      event.preventDefault();
      setFocusedIndex(newIndex);
      buttonRefs[newIndex].current?.focus();
    }
  };

  const undoDisabled = pastSteps.length === 0;
  const redoDisabled = futureSteps.length === 0;
  const nextStepDisabled = currentStep >= SetupStep.setupEnd;

  return (
    <footer className={styles.container}>
      <div className={styles.bar} role="toolbar">
        <Button
          Icon={UndoIcon}
          disabled={undoDisabled}
          className={styles.left}
          ref={buttonRefs[0]}
          onClick={() => {
            dispatch(undoStep());
            setFocusedIndex(0);
          }}
          title={t("label.undo")}
          aria-disabled={undoDisabled}
          // We have to override the tabbing logic to meet the standard of role "toolbar"
          tabIndex={focusedIndex === 0 ? 0 : -1}
          onKeyDown={(e) => onKeyDownHandler(e, 0)}
        />
        <Button
          Icon={RedoIcon}
          disabled={redoDisabled}
          className={styles.left}
          ref={buttonRefs[1]}
          onClick={() => {
            dispatch(redoStep());
            setFocusedIndex(1);
          }}
          title={t("label.redo")}
          aria-disabled={redoDisabled}
          // We have to override the tabbing logic to meet the standard of role "toolbar"
          tabIndex={focusedIndex === 1 ? 0 : -1}
          onKeyDown={(e) => onKeyDownHandler(e, 1)}
        />
        <Button
          Icon={NextIcon}
          disabled={nextStepDisabled}
          className={styles.right}
          ref={buttonRefs[2]}
          onClick={() => {
            dispatch(nextStep());
            setFocusedIndex(2);
          }}
          // We have to override the tabbing logic to meet the standard of role "toolbar"
          tabIndex={focusedIndex === 2 ? 0 : -1}
          onKeyDown={(e) => onKeyDownHandler(e, 2)}
        >
          {t("label.nextStep")}
        </Button>
      </div>
    </footer>
  );
};
