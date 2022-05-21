import { RootState } from "../components/store";
import { createSelector } from "@reduxjs/toolkit";
import { ComponentState, GameComponent } from "../types";

/**
 * Redux Selector for returning a component list as an array, moving the component key to the component field "code"
 * @param select Select function for selecting the component list from the root state
 */
const selectComponentArray = <T>(
  select: (state: RootState) => ComponentState<T>
) =>
  createSelector(select, (stateSlice) => {
    const array = [];
    for (const [code, object] of Object.entries(stateSlice)) {
      array.push({ ...object, code });
    }
    return array;
  });

/** Filters out disabled components from a given component array */
export const selectEnabled = <T extends GameComponent>(array: T[]) =>
  array.filter((value) => value.enabled);

/** Redux Selector for returning a specified Deck from state */
export const selectDeck = (state: RootState, code: string) => state.deck[code];

/** Redux Selector for returning the deck list as an array, moving the object key to the object field "code" */
export const selectDeckArray = selectComponentArray((state) => state.deck);

/** Redux Selector for returning a specified Expansion from state */
export const selectExpansion = (state: RootState, code: string) =>
  state.expansion[code];

/** Redux Selector for returning the expansion list as an array, moving the object key to the object field "code" */
export const selectExpansionArray = selectComponentArray(
  (state) => state.expansion
);

/** Redux Selector for returning a specified Faction from state */
export const selectFaction = (state: RootState, code: string) =>
  state.faction[code];

/** Redux Selector for returning the faction list as an array, moving the object key to the object field "code" */
export const selectFactionArray = selectComponentArray(
  (state) => state.faction
);

/** Redux Selector for returning an array of included faction codes */
export const selectFactionCodeArray = (state: RootState) =>
  Object.keys(state.faction);

/** Redux Selector for returning an array of enabled militant factions */
export const selectEnabledMilitantFactions = (state: RootState) =>
  selectFactionArray(state).filter((value) => value.enabled && value.militant);

/** Redux Selector for returning an array of enabled non-militant factions */
export const selectEnabledInsurgentFactions = (state: RootState) =>
  selectFactionArray(state).filter((value) => value.enabled && !value.militant);

/** Redux Selector for returning an array of enabled vagabond factions */
export const selectEnabledVagabondFactions = (state: RootState) =>
  selectFactionArray(state).filter(
    (value) => value.enabled && value.isVagabond
  );

/** Returns the faction pool, joining the original faction and vagabond objects into the entries */
export const selectFactionPool = createSelector(
  (state: RootState) => state.flow.factionPool,
  (state: RootState) => state.faction,
  (state: RootState) => state.vagabond,
  (factionPool, factions, vagabonds) =>
    factionPool.map((entry) => ({
      ...factions[entry.code],
      code: entry.code,
      vagabond: entry.vagabond
        ? { ...vagabonds[entry.vagabond], code: entry.vagabond }
        : undefined,
    }))
);

/** Returns the flow information (including current step) from redux state */
export const selectFlowState = (state: RootState) => state.flow;

/** Redux Selector for returning a specified Hireling from state */
export const selectHireling = (state: RootState, code: string) =>
  state.hireling[code];

/** Redux Selector for returning the hireling list as an array, moving the object key to the object field "code" */
export const selectHirelingArray = selectComponentArray(
  (state) => state.hireling
);

/** Redux Selector for returning an array of all hirelings that replace an included faction */
export const selectFactionHirelingArray = (state: RootState) =>
  selectHirelingArray(state).filter((hireling) =>
    // Only include a hireling if at least one of it's faction codes matches an included faction
    hireling.factions.some((factionCode) =>
      selectFactionCodeArray(state).includes(factionCode)
    )
  );

/** Redux Selector for returning an array of enabled hirelings that do not replace an included faction */
export const selectEnabledIndependentHirelings = (state: RootState) =>
  selectHirelingArray(state).filter(
    (hireling) =>
      hireling.enabled &&
      // Only include a hireling if none of it's faction codes matches an included faction
      hireling.factions.every(
        (factionCode) => !selectFactionCodeArray(state).includes(factionCode)
      )
  );

/** Redux Selector for returning a specified Landmark from state */
export const selectLandmark = (state: RootState, code: string) =>
  state.landmark[code];

/** Redux Selector for returning the landmark list as an array, moving the object key to the object field "code" */
export const selectLandmarkArray = selectComponentArray(
  (state) => state.landmark
);

/** Redux Selector for returning a specified Map from state */
export const selectMap = (state: RootState, code: string) => state.map[code];

/** Redux Selector for returning the map list as an array, moving the object key to the object field "code" */
export const selectMapArray = selectComponentArray((state) => state.map);

/** Redux Selector for returning an array of enabled maps which have a landmark */
export const selectEnabledLandmarkMaps = (state: RootState) =>
  selectMapArray(state).filter(
    (value) => value.enabled && value.landmark != null
  );

/** Returns the object for the map selected in setup */
export const selectSetupMap = (state: RootState) =>
  state.setup.map != null
    ? { ...state.map[state.setup.map], code: state.setup.map }
    : null;

/** Returns the object for the deck selected in setup */
export const selectSetupDeck = (state: RootState) =>
  state.setup.deck != null
    ? { ...state.deck[state.setup.deck], code: state.setup.deck }
    : null;

/** Returns the object for the first landmark selected in setup */
export const selectSetupLandmark1 = (state: RootState) =>
  state.setup.landmark1 != null
    ? {
        ...state.landmark[state.setup.landmark1],
        code: state.setup.landmark1,
      }
    : null;

/** Returns the object for the second landmark selected in setup */
export const selectSetupLandmark2 = (state: RootState) =>
  state.setup.landmark2 != null
    ? {
        ...state.landmark[state.setup.landmark2],
        code: state.setup.landmark2,
      }
    : null;

/** Returns the object for the first hireling selected in setup */
export const selectSetupHireling1 = (state: RootState) =>
  state.setup.hireling1 != null
    ? {
        ...state.hireling[state.setup.hireling1.code],
        ...state.setup.hireling1,
      }
    : null;

/** Returns the object for the second hireling selected in setup */
export const selectSetupHireling2 = (state: RootState) =>
  state.setup.hireling2 != null
    ? {
        ...state.hireling[state.setup.hireling2.code],
        ...state.setup.hireling2,
      }
    : null;

/** Returns the object for the third hireling selected in setup */
export const selectSetupHireling3 = (state: RootState) =>
  state.setup.hireling3 != null
    ? {
        ...state.hireling[state.setup.hireling3.code],
        ...state.setup.hireling3,
      }
    : null;

/** Returns the setup parameters from redux state */
export const selectSetupParameters = (state: RootState) => state.setup;

/** Redux Selector for returning a specified Vagabond from state */
export const selectVagabond = (state: RootState, code: string) =>
  state.vagabond[code];

/** Redux Selector for returning the vagabond list as an array, moving the object key to the object field "code" */
export const selectVagabondArray = selectComponentArray(
  (state) => state.vagabond
);
