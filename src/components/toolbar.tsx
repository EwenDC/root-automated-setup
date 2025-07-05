import { useTranslation } from "react-i18next";
import { nextStep } from "../features/thunks";
import { redoStep, undoStep } from "../features/flowSlice";
import { SetupStep } from "../types";
import { useAppDispatch, useAppSelector } from "../hooks";
import UndoIcon from "../images/icons/undo.svg?react";
import RedoIcon from "../images/icons/redo.svg?react";
import NextIcon from "../images/icons/next.svg?react";
import { memo, useCallback, useRef, useState } from "react";
import Button from "./button";

type ButtonIndex = 0 | 1 | 2;
const MIN_BUTTON_INDEX = 0;
const MAX_BUTTON_INDEX = 2;

const Toolbar: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [focusedIndex, setFocusedIndex] = useState<ButtonIndex>(0);
  const undoDisabled = useAppSelector((state) => state.flow.pastSteps.length === 0);
  const redoDisabled = useAppSelector((state) => state.flow.futureSteps.length === 0);
  const nextStepDisabled = useAppSelector((state) => state.flow.currentStep >= SetupStep.setupEnd);

  const undoButtonRef = useRef<HTMLButtonElement>(null);
  const redoButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const onKeyDownHandler = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    focusedIndex: ButtonIndex,
  ) => {
    const buttonRefs = [undoButtonRef, redoButtonRef, nextButtonRef] as const;
    let newIndex: ButtonIndex | undefined;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      newIndex = focusedIndex + 1;
      if (newIndex > MAX_BUTTON_INDEX) newIndex = MIN_BUTTON_INDEX;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      newIndex = focusedIndex - 1;
      if (newIndex < MIN_BUTTON_INDEX) newIndex = MAX_BUTTON_INDEX;
    } else if (event.key === "Home") {
      newIndex = MIN_BUTTON_INDEX;
    } else if (event.key === "End") {
      newIndex = MAX_BUTTON_INDEX;
    }

    if (newIndex != null) {
      event.preventDefault();
      setFocusedIndex(newIndex);
      buttonRefs[newIndex].current?.focus();
    }
  };

  const onUndoClick = useCallback(() => {
    dispatch(undoStep());
    setFocusedIndex(0);
  }, [dispatch]);
  const onUndoKeyDown = useCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDownHandler(event, 0);
  }, []);

  const onRedoClick = useCallback(() => {
    dispatch(redoStep());
    setFocusedIndex(1);
  }, [dispatch]);
  const onRedoKeyDown = useCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDownHandler(event, 1);
  }, []);

  const onNextClick = useCallback(() => {
    dispatch(nextStep());
    setFocusedIndex(2);
  }, [dispatch]);
  const onNextKeyDown = useCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDownHandler(event, 2);
  }, []);

  return (
    <footer>
      <div className="toolbar" role="toolbar">
        <Button
          Icon={UndoIcon}
          disabled={undoDisabled}
          className="left"
          ref={undoButtonRef}
          onClick={onUndoClick}
          title={t("label.undo")}
          // We have to override the tabbing logic to meet the standard of role "toolbar"
          tabIndex={focusedIndex === 0 ? 0 : -1}
          onKeyDown={onUndoKeyDown}
        />
        <Button
          Icon={RedoIcon}
          disabled={redoDisabled}
          className="left"
          ref={redoButtonRef}
          onClick={onRedoClick}
          title={t("label.redo")}
          // We have to override the tabbing logic to meet the standard of role "toolbar"
          tabIndex={focusedIndex === 1 ? 0 : -1}
          onKeyDown={onRedoKeyDown}
        />
        <Button
          Icon={NextIcon}
          disabled={nextStepDisabled}
          className="right"
          ref={nextButtonRef}
          onClick={onNextClick}
          // We have to override the tabbing logic to meet the standard of role "toolbar"
          tabIndex={focusedIndex === 2 ? 0 : -1}
          onKeyDown={onNextKeyDown}
        >
          {t("label.nextStep")}
        </Button>
      </div>
    </footer>
  );
};

export default memo(Toolbar);
