import { createSelector } from "@reduxjs/toolkit";
import content from "../content";
import { RootState } from "../store";
import {
  ComponentInfo,
  ComponentsState,
  FlowSlice,
  FlowState,
  GameComponent,
  Togglable,
} from "../types";

/**
 * Function for clamping a number within a value range
 * @param value The number to be clamped
 * @param min The minimum number in the acceptable range
 * @param max The maximum number in the acceptable range
 * @returns The inputted value if it is within the desired range, or the closest number in the range
 */
export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/**
 * Function for create Redux Selectors for returning a single component or a
 * component list as an array, moving the component key to the component field "code"
 * @param componentType The key the list of components is stored under in the "components" redux slice
 * @param getComponentData Function for retreiving the extra data about the component from the content file
 */
export const generateComponentSelectors = <
  D extends GameComponent,
  I extends ComponentInfo = ComponentInfo
>(
  componentType: keyof Omit<ComponentsState, "expansions">
) =>
  [
    // This selector error's if selecting a component that doesn't exist
    // We avoid this by just doing our best to not select a non-existant component
    (state: RootState, code: string) => {
      const componentInfo = state.components[componentType][code];
      const componentData = content[componentInfo.expansionCode][componentType]![code];
      return { ...(componentData as D), ...(componentInfo as I), code };
    },
    createSelector(
      (state: RootState) => state.components[componentType],
      (componentList) => {
        const array = [];
        for (const [code, componentInfo] of typedEntries(componentList)) {
          const componentData = content[componentInfo.expansionCode][componentType]![code];
          array.push({
            ...(componentData as D),
            ...(componentInfo as I),
            code,
          });
        }
        return array;
      }
    ),
  ] as const;

/**
 * Generates a state slice from the current flow state
 * @param flowState The current flow state
 * @returns A slice representation of the flow state
 */
export const getFlowSlice = (flowState: FlowState): FlowSlice => ({
  step: flowState.currentStep,
  // This prevents changes we make to the faction pool in the draft state being reflected in already generated slices
  factionPool: [...flowState.factionPool],
  lastFactionLocked: flowState.lastFactionLocked,
  vagabondSetUp: flowState.vagabondSetUp,
  playerIndex: flowState.currentPlayerIndex,
  factionIndex: flowState.currentFactionIndex,
});

/**
 * Function to return the state of a given setup setting from localStorage, for the purpose of setting up the initial redux state
 * @param settingKey The key of the setting to check, as stored in localStorage
 * @param defaultValue The default setting value to use if no setting is in localStorage
 */
export const loadPersistedSetting = <T>(settingKey: string, defaultValue: T) => {
  // Load the current enable state from localStorage so we remember user settings
  let storedVal = localStorage.getItem(settingKey);

  // Was there a value stored in localStorage?
  if (storedVal != null) {
    try {
      // Parse the string stored in localStorage
      const parsedValue = JSON.parse(storedVal);

      // Only use it if it matches the expected type
      if (typeof parsedValue === typeof defaultValue) {
        return parsedValue as T;
      } else if (process.env.NODE_ENV !== "production") {
        console.warn(
          `Saved state of ${storedVal} for setting ${settingKey} is of incorrect type (expected ${typeof defaultValue} got ${typeof parsedValue})`
        );
      }
    } catch (error: any) {
      if (process.env.NODE_ENV !== "production")
        console.warn(
          `Failed to parse saved state of ${storedVal} for setting ${settingKey}`,
          error
        );
    }
  }

  // Default value, then save that state to localStorage for future
  savePersistedSetting(settingKey, defaultValue);
  return defaultValue;
};

/**
 * Saves the enable/disable state of the specified setting to localStorage
 * @param settingKey The key of the setting to save, as stored in localStorage
 * @param value the value to save
 */
export const savePersistedSetting = <T>(settingKey: string, value: T) => {
  try {
    localStorage.setItem(settingKey, JSON.stringify(value));
  } catch (error: any) {
    if (process.env.NODE_ENV !== "production")
      console.warn(
        `Failed to persist state of ${JSON.stringify(value)} for setting ${settingKey}`,
        error
      );
  }
};

/** Filters out disabled components from a given component array */
export const selectEnabled = <T extends Togglable>(array: T[]) =>
  array.filter(({ enabled }) => enabled);

/**
 * Removes a random element from a given list, and then returns it
 * @param list The list of elements to be randomly selected
 */
export const takeRandom = <T>(list: T[]): T => {
  // Get a random index in the given list (i.e. between 0 inclusive and list.length exclusive)
  const i = Math.floor(Math.random() * list.length);
  // Save value at given index so we can return it
  const returnVal = list[i];
  // Delete 1 element starting at chosen index
  list.splice(i, 1);
  return returnVal;
};

export const typedEntries = Object.entries as <T extends { [s: string]: any } | ArrayLike<any>>(
  o: T
) => [keyof T, T[keyof T]][];
