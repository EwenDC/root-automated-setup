import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import content from "../../components/content.json";
import { AppDispatch, AppGetState } from "../../components/store";
import {
  ComponentState,
  expansionEnabled,
  persistExpansionEnabled,
  selectComponentArray,
} from "../../util";

export interface Expansion {
  name: string;
  enabled: boolean;
  base: boolean;
}

let initialState: ComponentState<Expansion> = {};
for (const [expansionCode, expansion] of Object.entries(content)) {
  initialState[expansionCode] = {
    name: expansion.name,
    enabled: expansionEnabled(expansionCode, expansion.base),
    base: expansion.base,
  };
}

/** Redux Selector for returning the expansion list as an array, moving the object key to the object field "code" */
export const selectExpansionArray = selectComponentArray(
  (state) => state.expansion
);

const setExpansionEnabled = (
  state: ComponentState<Expansion>,
  action: PayloadAction<string>,
  value: boolean
) => {
  // Retreive the expansion (may return undefined if code does not exist)
  const expansion = state[action.payload];
  // Only update the expansion state if it exists and is not the base game
  if (expansion != null && !expansion.base) {
    expansion.enabled = value;
    persistExpansionEnabled(action.payload, expansion.enabled);
  }
};

export const expansionSlice = createSlice({
  name: "expansion",
  initialState,
  reducers: {
    enableExpansion: (...params) => setExpansionEnabled(...params, true),
    disableExpansion: (...params) => setExpansionEnabled(...params, false),
  },
});

export const { enableExpansion, disableExpansion } = expansionSlice.actions;
export const enableExpansionAction = enableExpansion.type;
export const disableExpansionAction = disableExpansion.type;

export const toggleExpansion =
  (expansionCode: string) => (dispatch: AppDispatch, getState: AppGetState) => {
    // Retreive the expansion (may return undefined if code does not exist)
    const expansion = getState().expansion[expansionCode];
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
