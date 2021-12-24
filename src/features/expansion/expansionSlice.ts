import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import content from "../../components/content.json";
import { RootState } from "../../components/store";

export interface Expansion {
  name: string;
  enabled: boolean;
  base: boolean;
}

export interface ExpansionState {
  [code: string]: Expansion;
}

/** Helper function for getting the details of a specified expansion from content.json */
export const getExpansionConfig = (expansionCode: string) =>
  // It sucks, but we have to circumvent type saftey here
  // Blame typescript's very loose typings of Object.entries preventing us from typing more strongly
  content[expansionCode as keyof typeof content];

const persistExpansionEnabled = (expansionCode: string, enabled: boolean) => {
  try {
    localStorage.setItem(expansionCode, enabled ? "1" : "0");
  } catch (error: any) {
    console.warn(
      `Failed to persist enable state of ${enabled} for expansion ${expansionCode}`,
      error
    );
  }
};

/**
 * Function to return the enabled state of a given expansion in localStorage, for the purpose of setting up the initial redux state.
 * @param expansionCode The code of the expansion to check. Also the key of the value stored in localStorage.
 * @param base If the given expansion is actually the base game, and thus is always enabled regardless of localStorage.
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
    enabled = storedVal === "1";
  } else {
    // Default to false, then save that state to localStorage for future
    enabled = false;
    persistExpansionEnabled(expansionCode, enabled);
  }

  return enabled;
};

let initialState: ExpansionState = {};
for (const [expansionCode, expansion] of Object.entries(content)) {
  initialState[expansionCode] = {
    name: expansion.name,
    enabled: expansionEnabled(expansionCode, expansion.base),
    base: expansion.base,
  };
}

/** Redux Selector for returning the expansion list as an array, moving the object key to the object field "code" */
export const selectExpansionArray = createSelector(
  (state: RootState) => state.expansion,
  (expansionState: ExpansionState) => {
    const array = [];
    for (const [expansionCode, expansion] of Object.entries(expansionState)) {
      array.push({ ...expansion, code: expansionCode });
    }
    return array;
  }
);

export const expansionSlice = createSlice({
  name: "expansion",
  initialState,
  reducers: {
    enableExpansion: (state, action: PayloadAction<string>) => {
      // Retreive the expansion
      const expansion = state[action.payload];
      // Only update the expansion state if it exists and is not the base game
      if (expansion != null && !expansion.base) {
        expansion.enabled = true;
        persistExpansionEnabled(action.payload, expansion.enabled);
      }
    },
    disableExpansion: (state, action: PayloadAction<string>) => {
      // Retreive the expansion
      const expansion = state[action.payload];
      // Only update the expansion state if it exists and is not the base game
      if (expansion != null && !expansion.base) {
        expansion.enabled = false;
        persistExpansionEnabled(action.payload, expansion.enabled);
      }
    },
  },
});

export const { enableExpansion, disableExpansion } = expansionSlice.actions;
export const enableExpansionAction = enableExpansion.type;
export const disableExpansionAction = disableExpansion.type;
export default expansionSlice.reducer;
