import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  Faction,
  FlowSlice,
  GameComponent,
  Hireling,
  Landmark,
  Map,
  MapInfo,
  Vagabond,
} from "../types";
import { generateArraySelector, typedEntries } from "./utils";

export const selectDeckArray = generateArraySelector<GameComponent>("decks");

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

export const selectFactionArray = generateArraySelector<Faction>("factions");

/** Redux Selector for returning an array of included faction codes */
export const selectFactionCodes = createSelector(
  (state: RootState) => state.components.factions,
  (factions) => Object.keys(factions)
);

/** Returns the current slice of flow state from redux state */
export const selectFlowSlice = createSelector(
  (state: RootState) => state.flow.currentStep,
  (state: RootState) => state.flow.factionPool,
  (state: RootState) => state.flow.lastFactionLocked,
  (state: RootState) => state.flow.vagabondSetUp,
  (state: RootState) => state.flow.currentPlayerIndex,
  (state: RootState) => state.flow.currentFactionIndex,
  (step, factionPool, lastFactionLocked, vagabondSetUp, playerIndex, factionIndex): FlowSlice => ({
    step,
    factionPool,
    lastFactionLocked,
    vagabondSetUp,
    playerIndex,
    factionIndex,
  })
);

export const selectHirelingArray = generateArraySelector<Hireling>("hirelings");

export const selectStepInvalid = (stepActive: boolean) => (state: RootState) =>
  stepActive && state.setup.errorMessage != null;

export const selectLandmarkArray = generateArraySelector<Landmark>("landmarks");

export const selectMapArray = generateArraySelector<Map, MapInfo>("maps");

/** Returns the object for the map selected in setup */
export const selectSetupMap = createSelector(
  (state: RootState) => state.setup.map,
  (state: RootState) => selectMapArray(state),
  (state: RootState) => selectLandmarkArray(state),
  (mapCode, mapArray, landmarkArray) => {
    const setupMap = mapArray.find(({ code }) => code === mapCode);
    // Inject the landmark data too
    return (
      setupMap && {
        ...setupMap,
        landmark: setupMap.landmark && {
          ...landmarkArray.find(({ code }) => code === setupMap.landmark!.code)!,
          ...setupMap.landmark,
        },
      }
    );
  }
);

/** Returns the object for the deck selected in setup */
export const selectSetupDeck = createSelector(
  (state: RootState) => state.setup.deck,
  (state: RootState) => selectDeckArray(state),
  (deckCode, deckArray) => deckArray.find(({ code }) => code === deckCode)
);

/** Returns the object for the first landmark selected in setup */
export const selectSetupLandmark1 = createSelector(
  (state: RootState) => state.setup.landmark1,
  (state: RootState) => selectLandmarkArray(state),
  (landmarkCode, landmarkArray) => landmarkArray.find(({ code }) => code === landmarkCode)
);

/** Returns the object for the second landmark selected in setup */
export const selectSetupLandmark2 = createSelector(
  (state: RootState) => state.setup.landmark2,
  (state: RootState) => selectLandmarkArray(state),
  (landmarkCode, landmarkArray) => landmarkArray.find(({ code }) => code === landmarkCode)
);

/** Returns the object for the first hireling selected in setup */
export const selectSetupHireling1 = createSelector(
  (state: RootState) => state.setup.hireling1,
  (state: RootState) => selectHirelingArray(state),
  (hirelingEntry, hirelingArray) =>
    hirelingEntry && {
      ...hirelingArray.find(({ code }) => code === hirelingEntry.code)!,
      ...hirelingEntry,
    }
);

/** Returns the object for the second hireling selected in setup */
export const selectSetupHireling2 = createSelector(
  (state: RootState) => state.setup.hireling2,
  (state: RootState) => selectHirelingArray(state),
  (hirelingEntry, hirelingArray) =>
    hirelingEntry && {
      ...hirelingArray.find(({ code }) => code === hirelingEntry.code)!,
      ...hirelingEntry,
    }
);

/** Returns the object for the third hireling selected in setup */
export const selectSetupHireling3 = createSelector(
  (state: RootState) => state.setup.hireling3,
  (state: RootState) => selectHirelingArray(state),
  (hirelingEntry, hirelingArray) =>
    hirelingEntry && {
      ...hirelingArray.find(({ code }) => code === hirelingEntry.code)!,
      ...hirelingEntry,
    }
);

export const selectVagabondArray = generateArraySelector<Vagabond>("vagabonds");
