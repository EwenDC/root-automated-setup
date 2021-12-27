import { PayloadAction } from "@reduxjs/toolkit";
import content from "./components/content.json";

export interface Component {
  expansionCode: string;
  enabled: boolean;
}

export interface ComponentState {
  [code: string]: Component;
}

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
 * Generic function for populating the starting state of a Redux slice using the provided addExpansionComponents function
 * @param addExpansionComponents Function for extracting state from a given expansion
 */
export const setupInitialState = <T extends ComponentState>(
  addExpansionComponents: (
    state: T,
    expansionCode: string,
    expansion?: any
  ) => void
): T => {
  // For a reason I don't understand this can't be typed to T, so we have to leave it as any
  const initialState: any = {};
  for (const [expansionCode, expansion] of Object.entries(content)) {
    if (expansionEnabled(expansionCode, expansion.base)) {
      addExpansionComponents(initialState, expansionCode, expansion);
    }
  }
  return initialState;
};

/**
 * Generic version of Enable reducer for enabling a component in state
 * @param state Editable copy of current Redux slice state
 * @param action Payloaded action with component code to be enabled
 */
export const enableComponent = <T extends ComponentState>(
  state: T,
  action: PayloadAction<string>
) => {
  // Retreive the component
  const component = state[action.payload];
  // Only update the component state if it exists
  if (component != null) {
    component.enabled = true;
  }
};

/**
 * Generic version of Disable reducer for enabling a component in state
 * @param state Editable copy of current Redux slice state
 * @param action Payloaded action with component code to be disabled
 */
export const disableComponent = <T extends ComponentState>(
  state: T,
  action: PayloadAction<string>
) => {
  // Retreive the component
  const component = state[action.payload];
  // Only update the component state if it exists
  if (component != null) {
    component.enabled = false;
  }
};

/**
 * Generic version of Disable Expansion reducer for deleting expansion components from state (components not deleted if expansion marked as base)
 * @param state Editable copy of current Redux slice state
 * @param action Payloaded action with code of expansion whose components are to be deleted from state
 */
export const deleteExpansionComponents = <T extends ComponentState>(
  state: T,
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
