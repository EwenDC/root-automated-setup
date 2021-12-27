import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Component,
  ComponentState,
  deleteExpansionComponents,
  disableComponent,
  enableComponent,
  getExpansionConfig,
  selectComponentArray,
  setupInitialState,
} from "../../util";
import {
  disableExpansionAction,
  enableExpansionAction,
} from "../expansion/expansionSlice";

export interface Faction extends Component {
  name: string;
  militant: boolean;
  vagabond: boolean;
}

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
export const selectNonMilitantFactions = createSelector(
  selectFactionArray,
  (array) => array.filter((value) => value.enabled && !value.militant)
);

export const factionSlice = createSlice({
  name: "faction",
  initialState: setupInitialState(addExpansionFactions),
  reducers: {
    enableFaction: enableComponent,
    disableFaction: disableComponent,
  },
  extraReducers: {
    [enableExpansionAction]: (state, action: PayloadAction<string>) =>
      addExpansionFactions(state, action.payload),
    [disableExpansionAction]: deleteExpansionComponents,
  },
});

export const { enableFaction, disableFaction } = factionSlice.actions;
export default factionSlice.reducer;
