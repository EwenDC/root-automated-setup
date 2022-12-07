import classNames from "classnames";
import { memo, useContext, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { CodeObject, GameComponent, Togglable } from "../types";
import { useAppDispatch, useAppSelector } from "../hooks";
import { AppThunk, RootState } from "../store";
import { setErrorMessage } from "../features/setupSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { stepActiveContext } from "./stepList";
import { selectInvalid } from "../features/selectors";

interface ComponentListProps<T> {
  selector: (state: RootState) => T[];
  toggleComponent: (code: string) => PayloadAction<any> | AppThunk;
  getLabelKey: (component: T) => string;
  getLockedKey?: (component: T) => string | null;
  unsorted?: boolean;
}

const ComponentToggle = <T extends CodeObject & Togglable & GameComponent>({
  selector,
  toggleComponent,
  getLabelKey,
  getLockedKey = () => null,
  unsorted = false,
}: ComponentListProps<T>) => {
  const components = useAppSelector(selector);
  const stepActive = useContext(stepActiveContext);
  const invalid = useAppSelector(selectInvalid(stepActive));
  const dispatch = useAppDispatch();
  const [largeLabels, setLargeLabels] = useState(false);
  const { t, i18n } = useTranslation();

  // Sort our component list, then memoize the result for performance
  const sortedComponents = useMemo(() => {
    // Reset large labels flag in case we changed language
    setLargeLabels(false);

    // For sorting purposes, generate the final label text in advance
    const returnValue = components.map((component) => {
      // If any label in our list is longer than 30 characters then we give more room for the labels
      // In the future I'd really like to replace this with a CSS only solution
      const label = t(getLabelKey(component));
      if (label.length > 30) setLargeLabels(true);

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
      {sortedComponents.map((component) => {
        if (component.enabled || stepActive) {
          const componentLockedKey = getLockedKey(component);
          const componentLocked = componentLockedKey != null;
          return (
            <button
              key={component.code}
              className={classNames({
                enabled: stepActive && component.enabled,
                locked: stepActive && componentLocked,
              })}
              onClick={() =>
                componentLocked
                  ? dispatch(setErrorMessage(componentLockedKey))
                  : dispatch(toggleComponent(component.code))
              }
              disabled={!stepActive}
              title={stepActive && componentLocked ? t(componentLockedKey) : undefined}
              tabIndex={stepActive && componentLocked ? -1 : undefined}
              role="switch"
              aria-checked={component.enabled}
              aria-disabled={stepActive ? componentLocked : undefined}
              aria-label={stepActive ? component.label : undefined}
              aria-invalid={invalid ? true : undefined}
              aria-errormessage={invalid ? "appError" : undefined}
            >
              <img
                src={component.image}
                alt="" // We're including the alt text in the button itself so don't bother reading out the image
                aria-hidden="true"
              />
              <div className="label">
                <span>{component.label}</span>
              </div>
            </button>
          );
        }
        return null;
      })}
    </div>
  );
};

export default memo(ComponentToggle) as typeof ComponentToggle;
