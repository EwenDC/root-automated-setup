import { createSlice } from "@reduxjs/toolkit";
import { setupInitialState, toggleComponent } from "./utils";
import { expansionReducers } from "./expansionSlice";
import { Faction } from "../types";

export const factionSlice = createSlice({
  name: "faction",
  initialState: setupInitialState<Faction>("factions"),
  reducers: {
    toggleFaction: toggleComponent,
  },
  extraReducers: expansionReducers("factions"),
});

export const { toggleFaction } = factionSlice.actions;
export default factionSlice.reducer;
