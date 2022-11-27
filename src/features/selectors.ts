import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  Faction,
  FactionEntry,
  GameComponent,
  Hireling,
  Landmark,
  Map,
  MapInfo,
  Vagabond,
} from "../types";
import { generateComponentSelectors, getFlowSlice, typedEntries } from "./utils";

export const [selectDeck, selectDeckArray] = generateComponentSelectors<GameComponent>("decks");

/** Redux Selector for returning a specified Expansion from state */
export const selectExpansion = (state: RootState, code: string) =>
  state.components.expansions[code];

/** Redux Selector for returning the expansion list as an array, moving the object key to the object field "code" */
export const selectExpansionArray = createSelector(
  (state: RootState) => state.components.expansions,
  (expansions) => {
    const array = [];
    for (const [code, expansionInfo] of typedEntries(expansions)) {
      array.push({ ...expansionInfo, code });
    }
    return array;
  }
);

export const [selectFaction, selectFactionArray] = generateComponentSelectors<Faction>("factions");

/** Redux Selector for returning an array of included faction codes */
export const selectFactionCodes = (state: RootState) => Object.keys(state.components.factions);

/** Redux Selector for returning an array of enabled militant factions */
export const selectEnabledMilitantFactions = (state: RootState) =>
  selectFactionArray(state).filter(({ enabled, militant }) => enabled && militant);

/** Redux Selector for returning an array of enabled non-militant factions */
export const selectEnabledInsurgentFactions = (state: RootState) =>
  selectFactionArray(state).filter(({ enabled, militant }) => enabled && !militant);

/** Returns a faction pool entry with the original faction and vagabond objects merged in */
export const selectFactionPoolEntry = (state: RootState, { code, vagabond }: FactionEntry) => ({
  ...selectFaction(state, code),
  vagabond: typeof vagabond === "string" ? selectVagabond(state, vagabond) : undefined,
});

/** Returns the faction pool, joining the original faction and vagabond objects into the entries */
export const selectFactionPool = (state: RootState, factionPool: FactionEntry[]) =>
  factionPool.map((entry) => selectFactionPoolEntry(state, entry));

/** Returns the current slice of flow state from redux state */
export const selectFlowSlice = (state: RootState) => getFlowSlice(state.flow);

/** Returns the flow information (including current step) from redux state */
export const selectFlowState = (state: RootState) => state.flow;

export const [selectHireling, selectHirelingArray] =
  generateComponentSelectors<Hireling>("hirelings");

/** Redux Selector for returning an array of all hirelings that replace an included faction */
export const selectFactionHirelings = (state: RootState) =>
  selectHirelingArray(state).filter(({ factions }) =>
    // Only include a hireling if at least one of it's faction codes matches an included faction
    factions.some((factionCode) => selectFactionCodes(state).includes(factionCode))
  );

/** Redux Selector for returning an array of enabled hirelings that do not replace an included faction */
export const selectEnabledIndependentHirelings = (state: RootState) =>
  selectHirelingArray(state).filter(
    ({ enabled, factions }) =>
      enabled &&
      // Only include a hireling if none of it's faction codes matches an included faction
      factions.every((factionCode) => !selectFactionCodes(state).includes(factionCode))
  );

export const [selectLandmark, selectLandmarkArray] =
  generateComponentSelectors<Landmark>("landmarks");

export const [selectMap, selectMapArray] = generateComponentSelectors<Map, MapInfo>("maps");

/** Returns the object for the map selected in setup */
export const selectSetupMap = (state: RootState) => {
  if (state.setup.map == null) return null;
  const setupMap = selectMap(state, state.setup.map);
  // Inject the landmark data too
  return {
    ...setupMap,
    landmark: setupMap.landmark && {
      ...selectLandmark(state, setupMap.landmark.code),
      ...setupMap.landmark,
    },
  };
};

/** Returns the object for the deck selected in setup */
export const selectSetupDeck = (state: RootState) =>
  state.setup.deck != null ? selectDeck(state, state.setup.deck) : null;

/** Returns the object for the first landmark selected in setup */
export const selectSetupLandmark1 = (state: RootState) =>
  state.setup.landmark1 != null ? selectLandmark(state, state.setup.landmark1) : null;

/** Returns the object for the second landmark selected in setup */
export const selectSetupLandmark2 = (state: RootState) =>
  state.setup.landmark2 != null ? selectLandmark(state, state.setup.landmark2) : null;

/** Returns the object for the first hireling selected in setup */
export const selectSetupHireling1 = (state: RootState) =>
  state.setup.hireling1 != null
    ? {
        ...selectHireling(state, state.setup.hireling1.code),
        ...state.setup.hireling1,
      }
    : null;

/** Returns the object for the second hireling selected in setup */
export const selectSetupHireling2 = (state: RootState) =>
  state.setup.hireling2 != null
    ? {
        ...selectHireling(state, state.setup.hireling2.code),
        ...state.setup.hireling2,
      }
    : null;

/** Returns the object for the third hireling selected in setup */
export const selectSetupHireling3 = (state: RootState) =>
  state.setup.hireling3 != null
    ? {
        ...selectHireling(state, state.setup.hireling3.code),
        ...state.setup.hireling3,
      }
    : null;

/** Returns the setup parameters from redux state */
export const selectSetupParameters = (state: RootState) => state.setup;

export const [selectVagabond, selectVagabondArray] =
  generateComponentSelectors<Vagabond>("vagabonds");
