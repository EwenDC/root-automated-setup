import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import content from "../../components/content.json";

export interface Expansion {
  code: string;
  enabled: boolean;
  mandatory: boolean;
}

export interface ExpansionState {
  expansions: Expansion[];
}

/**
 * Function to return the enabled state of a given expansion in localStorage, for the purpose of setting up the initial redux state.
 * @param expansionCode The code of the expansion to check. Also the key of the value stored in localStorage.
 * @param mandatory If the given expansion is mandatory (i.e. the base game). Used when no value found in localStorage.
 */
export const expansionEnabled = (
  expansionCode: string,
  mandatory: boolean
): boolean => {
  // Load the current enable state from localStorage so we remember user settings
  let storedVal = localStorage.getItem(expansionCode);
  let enabled: boolean;

  // Was there a value stored in localStorage?
  if (storedVal != null) {
    // Convert the string stored in localStorage to a boolean
    enabled = storedVal === "1";
  } else {
    // Default to the mandatory state of the expansion, then save that state to localStorage for future
    enabled = mandatory;
    localStorage.setItem(expansionCode, enabled ? "1" : "0");
  }

  return enabled;
};

let initialState: ExpansionState = { expansions: [] };
content.expansions.forEach((value) => {
  initialState.expansions.push({
    code: value.code,
    enabled: expansionEnabled(value.code, value.mandatory),
    mandatory: value.mandatory,
  });
});

export const expansionSlice = createSlice({
  name: "expansion",
  initialState,
  reducers: {
    enableExpansion: (state, action: PayloadAction<string>) => {
      // Since expansions is an array we need to loop over it so we can match the code
      state.expansions.forEach((value) => {
        if (value.code === action.payload) {
          value.enabled = true;
          // Also update local storage so the change persists between sessions
          localStorage.setItem(value.code, "1");
        }
      });
    },
    disableExpansion: (state, action: PayloadAction<string>) => {
      // Since expansions is an array we need to loop over it so we can match the code
      state.expansions.forEach((value) => {
        // Make sure that mandatory expansions (i.e. the base game) cannot be disabled
        if (value.code === action.payload && !value.mandatory) {
          value.enabled = false;
          // Also update local storage so the change persists between sessions
          localStorage.setItem(value.code, "0");
        }
      });
    },
  },
});

export const { enableExpansion, disableExpansion } = expansionSlice.actions;
export default expansionSlice.reducer;
