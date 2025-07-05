import classNames from "classnames";
import { memo, useContext, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { CodeObject, GameComponent, Togglable } from "../types";
import { useAppDispatch, useAppSelector } from "../hooks";
import { AppThunk, RootState } from "../store";
import { setErrorMessage } from "../features/setupSlice";
import { UnknownAction } from "@reduxjs/toolkit";
import { stepActiveContext } from "./stepList";
import { selectStepInvalid } from "../features/selectors";
import { massComponentToggle } from "../features/thunks";

interface ComponentListProps<T> {
  selector: (state: RootState) => T[];
  toggleComponent: (code: string) => UnknownAction | AppThunk;
  getLabelKey: (component: T) => string;
  unsorted?: boolean;
}

const ComponentToggle = <T extends CodeObject & Togglable & GameComponent>({
  selector,
  toggleComponent,
  getLabelKey,
  unsorted = false,
}: ComponentListProps<T>) => {
  const components = useAppSelector(selector);
  const stepActive = useContext(stepActiveContext);
  const invalid = useAppSelector(selectStepInvalid(stepActive));
  const dispatch = useAppDispatch();
  const [largeLabels, setLargeLabels] = useState(false);
  const [allEnabled, setAllEnabled] = useState(false);
  const { t, i18n } = useTranslation();

  // Sort our component list, then memoize the result for performance
  const sortedComponents = useMemo(() => {
    // Reset our data flags
    setLargeLabels(false);
    setAllEnabled(true);

    // For sorting purposes, generate the final label text in advance
    const returnValue = components.map((component) => {
      // If any label in our list is longer than 30 characters then we give more room for the labels
      const label = t(getLabelKey(component));
      if (label.length > 30) setLargeLabels(true);

      // Clear the all enabled flag if there's a disabled and not locked component
      if (!component.enabled && !component.locked) setAllEnabled(false);

      return {
        ...component,
        label,
      };
    });

    // Sort it by default (unless asked explicitly not to)
    if (!unsorted)
      returnValue.sort((a, b) => a.label.localeCompare(b.label, i18n.resolvedLanguage));

    return returnValue;
  }, [components, t, getLabelKey, unsorted, i18n.resolvedLanguage]);

  return (
    <div className={classNames("component-toggle", { "large-labels": largeLabels })}>
      {stepActive ? (
        <button
          className="toggle"
          onClick={() => {
            dispatch(massComponentToggle(selector, !allEnabled, toggleComponent));
          }}
        >
          {t(allEnabled ? "label.disableAll" : "label.enableAll")}
        </button>
      ) : null}
      {sortedComponents.map(({ code, enabled, image, label, locked }) =>
        enabled || stepActive ? (
          <button
            key={code}
            className={classNames({
              enabled: stepActive && enabled,
              locked: stepActive && locked !== false,
            })}
            onClick={() => dispatch(locked ? setErrorMessage(locked) : toggleComponent(code))}
            disabled={!stepActive}
            title={stepActive && locked ? t(locked) : undefined}
            tabIndex={stepActive && locked ? -1 : undefined}
            role="switch"
            aria-checked={enabled}
            aria-disabled={stepActive ? locked !== false : undefined}
            aria-label={stepActive ? label : undefined}
            aria-invalid={invalid ? true : undefined}
            aria-errormessage={invalid ? "appError" : undefined}
          >
            <img
              src={image}
              alt="" // We're including the alt text in the button itself so don't bother reading out the image
              aria-hidden="true"
            />
            <div className="label">
              <span>{label}</span>
            </div>
          </button>
        ) : null,
      )}
    </div>
  );
};

export default memo(ComponentToggle) as typeof ComponentToggle;
