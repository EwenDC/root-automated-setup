import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import content from "../components/content.json";
import { AppThunk, RootState } from "../components/store";
import {
  expansionEnabled,
  persistExpansionEnabled,
  selectComponentArray,
} from "./reduxUtils";
import { ComponentState, Expansion } from "../types";

let initialState: ComponentState<Expansion> = {};
for (const [expansionCode, expansion] of Object.entries(content)) {
  initialState[expansionCode] = {
    enabled: expansionEnabled(expansionCode, expansion.base),
    base: expansion.base,
  };
}

export const selectExpansion = (state: RootState, code: string) =>
  state.expansion[code];

/** Redux Selector for returning the expansion list as an array, moving the object key to the object field "code" */
export const selectExpansionArray = selectComponentArray(
  (state) => state.expansion
);

const setExpansionEnabled = (
  state: ComponentState<Expansion>,
  expansionCode: string,
  enabled: boolean
) => {
  // Retreive the expansion (may return undefined if code does not exist)
  const expansion = state[expansionCode];
  // Only update the expansion state if it exists and is not the base game
  if (expansion != null && !expansion.base) {
    expansion.enabled = enabled;
    persistExpansionEnabled(expansionCode, expansion.enabled);
  }
};

export const expansionSlice = createSlice({
  name: "expansion",
  initialState,
  reducers: {
    enableExpansion: (state, action: PayloadAction<string>) =>
      setExpansionEnabled(state, action.payload, true),
    disableExpansion: (state, action: PayloadAction<string>) =>
      setExpansionEnabled(state, action.payload, false),
  },
});

export const { enableExpansion, disableExpansion } = expansionSlice.actions;
export const enableExpansionAction = enableExpansion.type;
export const disableExpansionAction = disableExpansion.type;

export const toggleExpansion =
  (expansionCode: string): AppThunk =>
  (dispatch, getState) => {
    // Retreive the expansion (may return undefined if code does not exist)
    const expansion = selectExpansion(getState(), expansionCode);
    // Only update the expansion state if it exists and is not the base game
    if (expansion != null && !expansion.base) {
      // Dispatch action to invert current state. We need to do this so all slices can react to the expansion state change
      if (expansion.enabled) {
        dispatch(disableExpansion(expansionCode));
      } else {
        dispatch(enableExpansion(expansionCode));
      }
    }
  };

export default expansionSlice.reducer;
