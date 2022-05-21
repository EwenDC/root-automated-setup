import { createSlice } from "@reduxjs/toolkit";
import {
  getExpansionConfig,
  setupInitialState,
  toggleComponent,
} from "./utils";
import { ComponentState, Faction } from "../types";
import { expansionReducers } from "./expansionSlice";

const addExpansionFactions = (
  state: ComponentState<Faction>,
  expansionCode: string,
  expansion = getExpansionConfig(expansionCode)
) => {
  if (expansion != null && "factions" in expansion)
    for (const [factionCode, faction] of Object.entries(expansion.factions)) {
      // Don't add to state if it already exists
      if (state[factionCode] == null) {
        state[factionCode] = {
          ...faction,
          image: faction.image === "" ? undefined : faction.image,
          expansionCode: expansionCode,
          enabled: true,
        };
      } else if (process.env.NODE_ENV !== "production") {
        console.warn(
          `While enabling expansion "${expansionCode}", faction with duplicate code "${factionCode}" not added to state:`,
          faction
        );
      }
    }
};

export const factionSlice = createSlice({
  name: "faction",
  initialState: () => setupInitialState(addExpansionFactions),
  reducers: {
    toggleFaction: toggleComponent,
  },
  extraReducers: (builder) => expansionReducers(builder, addExpansionFactions),
});

export const { toggleFaction } = factionSlice.actions;
export default factionSlice.reducer;
