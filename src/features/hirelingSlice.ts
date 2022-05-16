import { createSlice } from "@reduxjs/toolkit";
import {
  getExpansionConfig,
  setupInitialState,
  toggleComponent,
} from "./utils";
import { ComponentState, Hireling } from "../types";
import { expansionReducers } from "./expansionSlice";

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
      } else if (process.env.NODE_ENV !== "production") {
        console.warn(
          `While enabling expansion "${expansionCode}", hireling with duplicate code "${hirelingCode}" not added to state:`,
          hireling
        );
      }
    }
};

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
