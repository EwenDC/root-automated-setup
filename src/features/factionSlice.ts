import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  getExpansionConfig,
  selectComponentArray,
  setupInitialState,
  toggleComponent,
} from "./reduxUtils";
import { RootState } from "../components/store";
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
      } else {
        console.warn(
          `While enabling expansion "${expansionCode}", faction with duplicate code "${factionCode}" not added to state:`,
          faction
        );
      }
    }
};

/** Redux Selector for returning a specified Faction from state */
export const selectFaction = (state: RootState, code: string) =>
  state.faction[code];

/** Redux Selector for returning the faction list as an array, moving the object key to the object field "code" */
export const selectFactionArray = selectComponentArray(
  (state) => state.faction
);

/** Redux Selector for returning an array of enabled militant factions */
export const selectMilitantFactions = createSelector(
  selectFactionArray,
  (array) => array.filter((value) => value.enabled && value.militant)
);

/** Redux Selector for returning an array of enabled non-militant factions */
export const selectInsurgentFactions = createSelector(
  selectFactionArray,
  (array) => array.filter((value) => value.enabled && !value.militant)
);

export const factionSlice = createSlice({
  name: "faction",
  initialState: setupInitialState(addExpansionFactions),
  reducers: {
    toggleFaction: toggleComponent,
  },
  extraReducers: (builder) => expansionReducers(builder, addExpansionFactions),
});

export const { toggleFaction } = factionSlice.actions;
export default factionSlice.reducer;
