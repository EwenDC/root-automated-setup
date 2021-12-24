import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import content from "../../components/content.json";
import { RootState } from "../../components/store";
import { expansionEnabled, persistExpansionEnabled } from "../../util";

export interface Expansion {
  name: string;
  enabled: boolean;
  base: boolean;
}

export interface ExpansionState {
  [code: string]: Expansion;
}

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
  (stateSlice) => {
    const array = [];
    for (const [code, object] of Object.entries(stateSlice)) {
      array.push({ ...object, code });
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
