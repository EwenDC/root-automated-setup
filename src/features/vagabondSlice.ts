import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deleteExpansionComponents,
  getExpansionConfig,
  selectComponentArray,
  setupInitialState,
  toggleComponent,
} from "./reduxUtils";
import {
  disableExpansionAction,
  enableExpansionAction,
} from "./expansionSlice";
import { RootState } from "../components/store";
import { ComponentState, Vagabond } from "../types";

const addExpansionVagabonds = (
  state: ComponentState<Vagabond>,
  expansionCode: string,
  expansion = getExpansionConfig(expansionCode)
) => {
  if (expansion != null && "vagabonds" in expansion)
    for (const [vagabondCode, vagabond] of Object.entries(
      expansion.vagabonds
    )) {
      // Don't add to state if it already exists
      if (state[vagabondCode] == null) {
        state[vagabondCode] = {
          ...vagabond,
          expansionCode: expansionCode,
          enabled: true,
        };
      } else {
        console.warn(
          `While enabling expansion "${expansionCode}", vagabond with duplicate code "${vagabondCode}" not added to state:`,
          vagabond
        );
      }
    }
};

/** Redux Selector for returning a specified Vagabond from state */
export const selectVagabond = (state: RootState, code: string) =>
  state.vagabond[code];

/** Redux Selector for returning the vagabond list as an array, moving the object key to the object field "code" */
export const selectVagabondArray = selectComponentArray(
  (state) => state.vagabond
);

/** Redux Selector for returning an array of enabled vagabonds */
export const selectEnabledVagabonds = createSelector(
  selectVagabondArray,
  (array) => array.filter((value) => value.enabled)
);

export const vagabondSlice = createSlice({
  name: "vagabond",
  initialState: setupInitialState(addExpansionVagabonds),
  reducers: {
    toggleVagabond: toggleComponent,
  },
  extraReducers: {
    [enableExpansionAction]: (state, action: PayloadAction<string>) =>
      addExpansionVagabonds(state, action.payload),
    [disableExpansionAction]: deleteExpansionComponents,
  },
});

export const { toggleVagabond } = vagabondSlice.actions;
export default vagabondSlice.reducer;
