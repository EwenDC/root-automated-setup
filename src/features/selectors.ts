import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  Faction,
  GameComponent,
  Hireling,
  Landmark,
  MapComponent,
  MapInfo,
  Vagabond,
} from "../types";
import { generateComponentSelectors, typedEntries } from "./utils";

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

/** Returns the faction pool, joining the original faction and vagabond objects into the entries */
export const selectFactionPool = (state: RootState) =>
  state.flow.factionPool.map(({ code, vagabond }) => ({
    ...selectFaction(state, code),
    vagabond: vagabond ? selectVagabond(state, vagabond) : undefined,
  }));

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

export const [selectMap, selectMapArray] = generateComponentSelectors<MapComponent, MapInfo>(
  "maps"
);

export const selectEnabledLandmarkMaps = (state: RootState) =>
  selectMapArray(state).filter(({ enabled, landmark }) => enabled && landmark);

/** Returns the object for the map selected in setup */
export const selectSetupMap = (state: RootState) =>
  state.setup.map != null ? selectMap(state, state.setup.map) : null;

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
