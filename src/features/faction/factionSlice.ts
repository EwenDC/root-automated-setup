import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import content from "../../components/content.json";
import { RootState } from "../../components/store";
import { expansionEnabled, getExpansionConfig } from "../../util";
import {
  disableExpansionAction,
  enableExpansionAction,
} from "../expansion/expansionSlice";

export interface Faction {
  name: string;
  militant: boolean;
  vagabond: boolean;
  expansionCode: string;
  enabled: boolean;
}

export interface FactionState {
  [code: string]: Faction;
}

const addExpansionFactions = (
  state: FactionState,
  expansionCode: string,
  expansion = getExpansionConfig(expansionCode)
) => {
  if (expansion != null && "factions" in expansion)
    for (const [factionCode, faction] of Object.entries(expansion.factions)) {
      // Don't add to state if it already exists
      if (state[factionCode] == null) {
        state[factionCode] = {
          name: faction.name,
          militant: faction.militant,
          vagabond: faction.vagabond,
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

let initialState: FactionState = {};
for (const [expansionCode, expansion] of Object.entries(content)) {
  if (expansionEnabled(expansionCode, expansion.base)) {
    addExpansionFactions(initialState, expansionCode, expansion);
  }
}

/** Redux Selector for returning the faction list as an array, moving the object key to the object field "code" */
export const selectFactionArray = createSelector(
  (state: RootState) => state.faction,
  (stateSlice) => {
    const array = [];
    for (const [code, object] of Object.entries(stateSlice)) {
      array.push({ ...object, code });
    }
    return array;
  }
);

/** Redux Selector for returning an array of enabled militant factions */
export const selectMilitantFactions = createSelector(
  selectFactionArray,
  (array) => array.filter((value) => value.enabled && value.militant)
);

/** Redux Selector for returning an array of enabled non-militant factions */
export const selectNonMilitantFactions = createSelector(
  selectFactionArray,
  (array) => array.filter((value) => value.enabled && !value.militant)
);

export const factionSlice = createSlice({
  name: "faction",
  initialState,
  reducers: {
    enableFaction: (state, action: PayloadAction<string>) => {
      // Retreive the faction
      const faction = state[action.payload];
      // Only update the faction state if it exists
      if (faction != null) {
        faction.enabled = true;
      }
    },
    disableFaction: (state, action: PayloadAction<string>) => {
      // Retreive the faction
      const faction = state[action.payload];
      // Only update the faction state if it exists
      if (faction != null) {
        faction.enabled = false;
      }
    },
  },
  extraReducers: {
    [enableExpansionAction]: (state, action: PayloadAction<string>) => {
      addExpansionFactions(state, action.payload);
    },
    [disableExpansionAction]: (state, action: PayloadAction<string>) => {
      // Skip processing for the base game, as that cannot be disabled
      if (!getExpansionConfig(action.payload)?.base) {
        // Remove all factions matching the disabled expansion
        for (const [factionCode, faction] of Object.entries(state)) {
          if (faction.expansionCode === action.payload) {
            delete state[factionCode];
          }
        }
      }
    },
  },
});

export const { enableFaction, disableFaction } = factionSlice.actions;
export default factionSlice.reducer;
