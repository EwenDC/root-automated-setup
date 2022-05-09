import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { nextStep, redoStep, selectFlowState, undoStep } from "../../features";
import { SetupStep } from "../../types";
import { useAppDispatch, useAppSelector } from "../hooks";
import styles from "./toolbar.module.css";
import { ReactComponent as UndoIcon } from "../../images/undo.svg";
import { ReactComponent as RedoIcon } from "../../images/redo.svg";
import { ReactComponent as NextIcon } from "../../images/next.svg";
import { useEffect, useMemo, useRef, useState } from "react";

interface ToolbarButton {
  ref: React.RefObject<HTMLButtonElement>;
  disabled: boolean;
}

const getFocusNext = (
  toolbarButtons: ToolbarButton[],
  currentIndex: number,
  stepAmount: number,
  originalIndex?: number
): number => {
  const maxIndex = toolbarButtons.length - 1;
  let newIndex = currentIndex + stepAmount;
  if (newIndex < 0) {
    newIndex = maxIndex;
  } else if (newIndex > maxIndex) {
    newIndex = 0;
  }

  if (newIndex === originalIndex) return originalIndex;
  if (toolbarButtons[newIndex].disabled)
    return getFocusNext(
      toolbarButtons,
      newIndex,
      stepAmount,
      originalIndex ?? currentIndex
    );
  return newIndex;
};

export const Toolbar: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { pastSteps, futureSteps, currentStep } =
    useAppSelector(selectFlowState);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const undoButton = useRef<HTMLButtonElement>(null);
  const redoButton = useRef<HTMLButtonElement>(null);
  const nextButton = useRef<HTMLButtonElement>(null);
  const toolbarButtons: ToolbarButton[] = useMemo(
    () => [
      {
        ref: undoButton,
        disabled: pastSteps.length === 0,
      },
      {
        ref: redoButton,
        disabled: futureSteps.length === 0,
      },
      {
        ref: nextButton,
        disabled: currentStep >= SetupStep.setupEnd,
      },
    ],
    [pastSteps.length, futureSteps.length, currentStep]
  );

  // Shift focus if it's stuck on a newly disabled button
  useEffect(() => {
    let newIndex;
    if (
      toolbarButtons[focusedIndex].ref.current === document.activeElement &&
      toolbarButtons[focusedIndex].disabled
    ) {
      newIndex = getFocusNext(toolbarButtons, focusedIndex, +1);
      setFocusedIndex(newIndex);
      toolbarButtons[newIndex].ref.current?.focus();
    }
  }, [toolbarButtons, focusedIndex]);

  const currentIndex = toolbarButtons[focusedIndex].disabled
    ? getFocusNext(toolbarButtons, focusedIndex, +1)
    : focusedIndex;

  const onKeyDownHandler = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    focusedIndex: number
  ) => {
    const maxIndex = toolbarButtons.length - 1;
    let newIndex: number | undefined;

    if (event.key === "ArrowRight") {
      newIndex = getFocusNext(toolbarButtons, focusedIndex, +1);
    } else if (event.key === "ArrowLeft") {
      newIndex = getFocusNext(toolbarButtons, focusedIndex, -1);
    } else if (event.key === "Home" && !toolbarButtons[0].disabled) {
      newIndex = 0;
    } else if (event.key === "End" && !toolbarButtons[maxIndex].disabled) {
      newIndex = maxIndex;
    }

    if (newIndex != null) {
      event.preventDefault();
      setFocusedIndex(newIndex);
      toolbarButtons[newIndex].ref.current?.focus();
    }
  };

  return (
    <footer className={styles.container}>
      <nav className={styles.toolbar} role="toolbar">
        <button
          className={classNames(styles.button, styles.left)}
          ref={undoButton}
          disabled={toolbarButtons[0].disabled}
          onClick={() => {
            dispatch(undoStep());
            setFocusedIndex(0);
          }}
          title={t("label.undo")}
          // We have to override the tabbing logic to meet the standard of role "toolbar"
          tabIndex={currentIndex === 0 ? 0 : -1}
          onKeyDown={(e) => onKeyDownHandler(e, 0)}
        >
          <UndoIcon className={styles.image} />
        </button>
        <button
          className={classNames(styles.button, styles.left)}
          ref={redoButton}
          disabled={toolbarButtons[1].disabled}
          onClick={() => {
            dispatch(redoStep());
            setFocusedIndex(1);
          }}
          title={t("label.redo")}
          // We have to override the tabbing logic to meet the standard of role "toolbar"
          tabIndex={currentIndex === 1 ? 0 : -1}
          onKeyDown={(e) => onKeyDownHandler(e, 1)}
        >
          <RedoIcon className={styles.image} />
        </button>
        <button
          className={classNames(styles.button, styles.right)}
          ref={nextButton}
          disabled={toolbarButtons[2].disabled}
          onClick={() => {
            dispatch(nextStep());
            setFocusedIndex(2);
          }}
          // We have to override the tabbing logic to meet the standard of role "toolbar"
          tabIndex={currentIndex === 2 ? 0 : -1}
          onKeyDown={(e) => onKeyDownHandler(e, 2)}
        >
          {t("label.nextStep")}
          <NextIcon className={styles.image} />
        </button>
      </nav>
    </footer>
  );
};
