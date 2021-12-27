import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../components/store";
import {
  Component,
  deleteExpansionComponents,
  disableComponent,
  enableComponent,
  getExpansionConfig,
  setupInitialState,
} from "../../util";
import {
  disableExpansionAction,
  enableExpansionAction,
} from "../expansion/expansionSlice";

export interface Hireling {
  name: string;
}

export interface HirelingPair extends Component {
  factions: string[];
  promoted: Hireling;
  demoted: Hireling;
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
  initialState: setupInitialState(addExpansionHirelings),
  reducers: {
    enableHireling: enableComponent,
    disableHireling: disableComponent,
  },
  extraReducers: {
    [enableExpansionAction]: (state, action: PayloadAction<string>) =>
      addExpansionHirelings(state, action.payload),
    [disableExpansionAction]: deleteExpansionComponents,
  },
});

export const { enableHireling, disableHireling } = hirelingSlice.actions;
export default hirelingSlice.reducer;
