import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import content from "../../components/content.json";
import { RootState } from "../../components/store";
import { expansionEnabled, getExpansionConfig } from "../../util";
import {
  disableExpansionAction,
  enableExpansionAction,
} from "../expansion/expansionSlice";

export interface Hireling {
  name: string;
}

export interface HirelingPair {
  factions: string[];
  promoted: Hireling;
  demoted: Hireling;
  expansionCode: string;
  enabled: boolean;
}

export interface HirelingState {
  [code: string]: HirelingPair;
}

const addExpansionHirelings = (
  state: HirelingState,
  expansionCode: string,
  expansion = getExpansionConfig(expansionCode)
) => {
  if (expansion != null && "hirelings" in expansion)
    for (const [hirelingCode, hireling] of Object.entries(
      expansion.hirelings
    )) {
      // Don't add to state if it already exists
      if (state[hirelingCode] == null) {
        state[hirelingCode] = {
          factions: hireling.factions,
          promoted: hireling.promoted,
          demoted: hireling.demoted,
          expansionCode: expansionCode,
          enabled: true,
        };
      } else {
        console.warn(
          `While enabling expansion "${expansionCode}", hireling with duplicate code "${hirelingCode}" not added to state:`,
          hireling
        );
      }
    }
};

let initialState: HirelingState = {};
for (const [expansionCode, expansion] of Object.entries(content)) {
  if (expansionEnabled(expansionCode, expansion.base)) {
    addExpansionHirelings(initialState, expansionCode, expansion);
  }
}

/** Redux Selector for returning the hireling list as an array, moving the object key to the object field "code" */
export const selectHirelingArray = createSelector(
  (state: RootState) => state.hireling,
  (stateSlice) => {
    const array = [];
    for (const [code, object] of Object.entries(stateSlice)) {
      array.push({ ...object, code });
    }
    return array;
  }
);

/** Redux Selector for returning an array of enabled hirelings */
export const selectEnabledHirelings = createSelector(
  selectHirelingArray,
  (array) => array.filter((value) => value.enabled)
);

export const hirelingSlice = createSlice({
  name: "hireling",
  initialState,
  reducers: {
    enableHireling: (state, action: PayloadAction<string>) => {
      // Retreive the hireling
      const hireling = state[action.payload];
      // Only update the hireling state if it exists
      if (hireling != null) {
        hireling.enabled = true;
      }
    },
    disableHireling: (state, action: PayloadAction<string>) => {
      // Retreive the hireling
      const hireling = state[action.payload];
      // Only update the hireling state if it exists
      if (hireling != null) {
        hireling.enabled = false;
      }
    },
  },
  extraReducers: {
    [enableExpansionAction]: (state, action: PayloadAction<string>) => {
      addExpansionHirelings(state, action.payload);
    },
    [disableExpansionAction]: (state, action: PayloadAction<string>) => {
      // Skip processing for the base game, as that cannot be disabled
      if (!getExpansionConfig(action.payload)?.base) {
        // Remove all hirelings matching the disabled expansion
        for (const [hirelingCode, hireling] of Object.entries(state)) {
          if (hireling.expansionCode === action.payload) {
            delete state[hirelingCode];
          }
        }
      }
    },
  },
});

export const { enableHireling, disableHireling } = hirelingSlice.actions;
export default hirelingSlice.reducer;
