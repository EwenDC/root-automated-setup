import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  getExpansionConfig,
  selectComponentArray,
  setupInitialState,
  toggleComponent,
} from "./reduxUtils";
import { RootState } from "../components/store";
import { ComponentState, Hireling } from "../types";
import { expansionReducers } from "./expansionSlice";
import { selectFactionCodeArray } from "./factionSlice";

const addExpansionHirelings = (
  state: ComponentState<Hireling>,
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
          ...hireling,
          image: hireling.image === "" ? undefined : hireling.image,
          componentName:
            hireling.componentName === "" ? undefined : hireling.componentName,
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

/** Redux Selector for returning a specified Hireling from state */
export const selectHireling = (state: RootState, code: string) =>
  state.hireling[code];

/** Redux Selector for returning the hireling list as an array, moving the object key to the object field "code" */
export const selectHirelingArray = selectComponentArray(
  (state) => state.hireling
);

/** Redux Selector for returning an array of all hirelings that replace an included faction */
export const selectFactionHirelingArray = createSelector(
  selectHirelingArray,
  selectFactionCodeArray,
  (hirelings, factionCodes) =>
    hirelings.filter((hireling) =>
      // Only include a hireling if at least one of it's faction codes matches an enabled faction
      hireling.factions.some((factionCode) =>
        factionCodes.includes(factionCode)
      )
    )
);

/** Redux Selector for returning an array of enabled hirelings that replace an included faction */
export const selectEnabledFactionHirelings = createSelector(
  selectFactionHirelingArray,
  (array) => array.filter((value) => value.enabled)
);

/** Redux Selector for returning an array of enabled hirelings that do not replace an included faction */
export const selectEnabledIndependentHirelings = createSelector(
  selectHirelingArray,
  selectFactionCodeArray,
  (hirelings, factionCodes) =>
    hirelings.filter(
      (hireling) =>
        hireling.enabled &&
        // Only include a hireling if none of it's faction codes matches an enabled faction
        hireling.factions.every(
          (factionCode) => !factionCodes.includes(factionCode)
        )
    )
);

export const hirelingSlice = createSlice({
  name: "hireling",
  initialState: setupInitialState(addExpansionHirelings),
  reducers: {
    toggleHireling: toggleComponent,
  },
  extraReducers: (builder) => expansionReducers(builder, addExpansionHirelings),
});

export const { toggleHireling } = hirelingSlice.actions;
export default hirelingSlice.reducer;
