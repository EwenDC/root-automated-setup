import { createSelector, PayloadAction } from "@reduxjs/toolkit";
import content from "../components/content.json";
import { RootState } from "../components/store";
import { GameComponent, ComponentState, ExpansionComponent } from "../types";

export const isTrue = "1";
export const isFalse = "0";

/**
 * Helper function for getting the details of a specified expansion from content.json
 * @param expansionCode The expansion code to look up as a key on content.json
 */
export const getExpansionConfig = (expansionCode: string) =>
  // It sucks, but we have to circumvent type saftey here
  // Blame typescript's very loose typings of Object.entries preventing us from typing more strongly
  content[expansionCode as keyof typeof content];

/**
 * Saves the enable/disable state of the specified expansion to localStorage
 * @param expansionCode
 * @param enabled
 */
export const persistExpansionEnabled = (
  expansionCode: string,
  enabled: boolean
) => {
  try {
    localStorage.setItem(expansionCode, enabled ? isTrue : isFalse);
  } catch (error: any) {
    console.warn(
      `Failed to persist enable state of ${enabled} for expansion ${expansionCode}`,
      error
    );
  }
};

/**
 * Function to return the enabled state of a given expansion in localStorage, for the purpose of setting up the initial redux state
 * @param expansionCode The code of the expansion to check. Also the key of the value stored in localStorage
 * @param base If the given expansion is actually the base game, and thus is always enabled regardless of localStorage
 */
export const expansionEnabled = (
  expansionCode: string,
  base: boolean
): boolean => {
  // Base game is always enabled, so no need to save or load localStorage
  if (base) return true;

  // Load the current enable state from localStorage so we remember user settings
  let storedVal = localStorage.getItem(expansionCode);
  let enabled: boolean;

  // Was there a value stored in localStorage?
  if (storedVal != null) {
    // Convert the string stored in localStorage to a boolean
    enabled = storedVal === isTrue;
  } else {
    // Default to false, then save that state to localStorage for future
    enabled = false;
    persistExpansionEnabled(expansionCode, enabled);
  }

  return enabled;
};

/**
 * Redux Selector for returning a component list as an array, moving the component key to the component field "code"
 * @param select Select function for selecting the component list from the root state
 */
export const selectComponentArray = <T>(
  select: (state: RootState) => ComponentState<T>
) =>
  createSelector(select, (stateSlice) => {
    const array = [];
    for (const [code, object] of Object.entries(stateSlice)) {
      array.push({ ...object, code });
    }
    return array;
  });

/**
 * Generic function for populating the starting state of a Redux slice using the provided addExpansionComponents function
 * @param addExpansionComponents Function for extracting state from a given expansion
 */
export const setupInitialState = <T>(
  addExpansionComponents: (
    state: ComponentState<T>,
    expansionCode: string,
    expansion?: any
  ) => void
) => {
  const initialState: ComponentState<T> = {};
  for (const [expansionCode, expansion] of Object.entries(content)) {
    if (expansionEnabled(expansionCode, expansion.base)) {
      addExpansionComponents(initialState, expansionCode, expansion);
    }
  }
  return initialState;
};

/**
 * Generic version of Toggle reducer for enabling or disabling a component in state
 * @param code The component code to be enabled or disabled
 * @param enabled An override value for component enable. Will default to toggling the component if not provided
 */
export const toggleComponent = {
  prepare: (code: string, enabled?: boolean) => ({
    payload: {
      code: code,
      enabled: enabled,
    },
  }),
  reducer: <T extends GameComponent>(
    state: ComponentState<T>,
    action: PayloadAction<{ code: string; enabled?: boolean }>
  ) => {
    // Retreive the component
    const component = state[action.payload.code];
    // Only update the component state if it exists
    if (component != null) {
      // Toggle enabled value
      component.enabled = action.payload.enabled ?? !component.enabled;
    } else {
      console.warn(
        "Invalid payload for toggleComponent action: Payload code not found in component state",
        action
      );
    }
  },
};

/**
 * Generic version of Disable Expansion reducer for deleting expansion components from state (components not deleted if expansion marked as base)
 * @param state Editable copy of current Redux slice state
 * @param action Payloaded action with code of expansion whose components are to be deleted from state
 */
export const deleteExpansionComponents = <T extends ExpansionComponent>(
  state: ComponentState<T>,
  action: PayloadAction<string>
) => {
  // Skip processing for the base game, as that cannot be disabled
  if (!getExpansionConfig(action.payload)?.base) {
    // Remove all components matching the disabled expansion
    for (const [componentCode, component] of Object.entries(state)) {
      if (component.expansionCode === action.payload) {
        delete state[componentCode];
      }
    }
  }
};

/**
 * Returns a random element from a given list, while also removing it
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
