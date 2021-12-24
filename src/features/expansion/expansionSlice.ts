import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import content from "../../components/content.json";
import { RootState } from "../../components/store";

export interface Expansion {
  code: string;
  name: string;
  enabled: boolean;
  base: boolean;
}

export interface ExpansionState {
  expansions: Expansion[];
}

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

let initialState: ExpansionState = { expansions: [] };
content.expansions.forEach((expansion) => {
  initialState.expansions.push({
    code: expansion.code,
    name: expansion.name,
    enabled: expansionEnabled(expansion.code, expansion.base),
    base: expansion.base,
  });
});

export const selectExpansions = (state: RootState) =>
  state.expansion.expansions;

export const expansionSlice = createSlice({
  name: "expansion",
  initialState,
  reducers: {
    enableExpansion: (state, action: PayloadAction<string>) => {
      // Since expansions is an array we need to loop over it so we can match the code
      state.expansions.forEach((value) => {
        // Since the base game cannot be disabled, don't try to enable it
        if (value.code === action.payload && !value.base) {
          value.enabled = true;
          // Also update local storage so the change persists between sessions
          persistExpansionEnabled(value.code, value.enabled);
        }
      });
    },
    disableExpansion: (state, action: PayloadAction<string>) => {
      // Since expansions is an array we need to loop over it so we can match the code
      state.expansions.forEach((value) => {
        // Make sure that the base game cannot be disabled
        if (value.code === action.payload && !value.base) {
          value.enabled = false;
          // Also update local storage so the change persists between sessions
          persistExpansionEnabled(value.code, value.enabled);
        }
      });
    },
  },
});

export const { enableExpansion, disableExpansion } = expansionSlice.actions;
export const enableExpansionAction = enableExpansion.type;
export const disableExpansionAction = disableExpansion.type;
export default expansionSlice.reducer;
