import { createSlice } from "@reduxjs/toolkit";
import {
  getExpansionConfig,
  setupInitialState,
  toggleComponent,
} from "./utils";
import { expansionReducers } from "./expansionSlice";
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
          image: vagabond.image === "" ? undefined : vagabond.image,
          expansionCode: expansionCode,
          enabled: true,
        };
      } else if (process.env.NODE_ENV !== "production") {
        console.warn(
          `While enabling expansion "${expansionCode}", vagabond with duplicate code "${vagabondCode}" not added to state:`,
          vagabond
        );
      }
    }
};

export const vagabondSlice = createSlice({
  name: "vagabond",
  initialState: setupInitialState(addExpansionVagabonds),
  reducers: {
    toggleVagabond: toggleComponent,
  },
  extraReducers: (builder) => expansionReducers(builder, addExpansionVagabonds),
});

export const { toggleVagabond } = vagabondSlice.actions;
export default vagabondSlice.reducer;
