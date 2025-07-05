import classNames from "classnames";
import { useContext } from "react";
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

const ComponentToggle = (<T extends CodeObject & Togglable & GameComponent>({
  selector,
  toggleComponent,
  getLabelKey,
  unsorted = false,
}: ComponentListProps<T>) => {
  const components = useAppSelector(selector);
  const stepActive = useContext(stepActiveContext);
  const invalid = useAppSelector(selectStepInvalid(stepActive));
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();

  const sortedComponents = components.map((component) => ({
    ...component,
    label: t(getLabelKey(component)),
  }));
  // Sort our components list by default (unless asked explicitly not to)
  if (!unsorted) {
    sortedComponents.sort((a, b) => a.label.localeCompare(b.label, i18n.resolvedLanguage));
  }
  const largeLabels = sortedComponents.some((component) => component.label.length > 30);
  const allEnabled = sortedComponents.every((component) => component.enabled || component.locked);

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
}) satisfies React.FC<ComponentListProps<CodeObject & Togglable & GameComponent>>;

export default ComponentToggle;
