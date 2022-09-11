import { PayloadAction } from "@reduxjs/toolkit";
import { ComponentInfo } from "../types";

const isTrue = "1";
const isFalse = "0";

export const typedKeys = Object.keys as <T extends object>(o: T) => (keyof T)[];
export const typedEntries = Object.entries as <T extends { [s: string]: any } | ArrayLike<any>>(
  o: T
) => [keyof T, T[keyof T]][];

/**
 * Saves the enable/disable state of the specified expansion to localStorage
 * @param expansionCode
 * @param enabled
 */
export const persistExpansionEnabled = (expansionCode: string, enabled: boolean) => {
  try {
    localStorage.setItem(expansionCode, enabled ? isTrue : isFalse);
  } catch (error: any) {
    if (process.env.NODE_ENV !== "production")
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
export const expansionEnabled = (expansionCode: string, base: boolean): boolean => {
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
 * Generic version of Toggle reducer for enabling or disabling a component in state
 * @param code The component code to be enabled or disabled
 * @param enabled An override value for component enable. Will default to toggling the component if not provided
 */
export const toggleComponent = {
  prepare: (code: string, enabled?: boolean) => ({
    payload: {
      code,
      enabled,
    },
  }),
  reducer: <T extends ComponentInfo>(
    state: Record<string, T>,
    action: PayloadAction<{ code: string; enabled?: boolean }>
  ) => {
    // Retreive the component
    const component = state[action.payload.code];
    // Only update the component state if it exists
    if (component != null) {
      // Toggle enabled value
      component.enabled = action.payload.enabled ?? !component.enabled;
    } else if (process.env.NODE_ENV !== "production") {
      console.warn(
        "Invalid payload for toggleComponent action: Payload code not found in component state",
        action
      );
    }
  },
};

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
