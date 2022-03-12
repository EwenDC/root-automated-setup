import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import undoable, { GroupByFunction } from "redux-undo";
import { AppThunk, RootState } from "../components/store";
import { Deck, selectDeckArray, selectEnabledDecks } from "./deckSlice";
import {
  Faction,
  selectInsurgentFactions,
  selectMilitantFactions,
  toggleFaction,
} from "./factionSlice";
import {
  Hireling,
  HirelingDemoted,
  HirelingPromoted,
  selectEnabledHirelings,
  selectHirelingArray,
} from "./hirelingSlice";
import {
  Landmark,
  selectEnabledLandmarks,
  selectLandmark,
  selectLandmarkArray,
  toggleLandmark,
} from "./landmarkSlice";
import { MapComponent, selectEnabledMaps } from "./mapSlice";
import { takeRandom, WithCode } from "./reduxUtils";

export enum SetupStep {
  chooseExpansions,
  chooseMap,
  setupMap,
  setUpBots,
  seatPlayers,
  chooseLandmarks,
  setUpLandmark1,
  setUpLandmark2,
  chooseHirelings,
  setUpHireling1,
  setUpHireling2,
  setUpHireling3,
  postHirelingSetup,
  chooseDeck,
  drawCards,
  chooseFactions,
  selectFaction,
  setUpFaction,
  placeScoreMarkers,
  chooseHand,
  setupEnd,
}

export interface SkipStepsInput {
  steps: SetupStep[];
  skip: boolean;
}

export interface SetHirelingInput {
  number: number;
  hireling: Hireling;
  promoted: boolean;
}

export type HirelingEntry =
  | (HirelingPromoted & {
      promoted: true;
    })
  | (HirelingDemoted & {
      promoted: false;
    });

export interface SetupState {
  currentStep: SetupStep;
  skippedSteps: Map<SetupStep, boolean>;
  playerCount: number;
  fixedFirstPlayer: boolean;
  firstPlayer: number;
  errorMessage: string | null;
  // Map
  map: MapComponent | null;
  usePrintedSuits: boolean;
  useMapLandmark: boolean;
  // Deck
  deck: Deck | null;
  // Landmarks
  landmarkCount: 0 | 1 | 2;
  landmark1: Landmark | null;
  landmark2: Landmark | null;
  // Hirelings
  hireling1: HirelingEntry | null;
  hireling2: HirelingEntry | null;
  hireling3: HirelingEntry | null;
  // Factions
  excludedFactions: string[];
  factionPool: WithCode<Faction>[];
  lastFactionLocked: boolean;
  currentFaction: Faction | null;
  currentFactionPlayer: number | null;
}

const initialState: SetupState = {
  currentStep: SetupStep.chooseExpansions,
  skippedSteps: new Map(),
  playerCount: 4,
  fixedFirstPlayer: false,
  firstPlayer: 1,
  errorMessage: null,
  map: null,
  usePrintedSuits: false,
  useMapLandmark: false,
  deck: null,
  landmarkCount: 0,
  landmark1: null,
  landmark2: null,
  hireling1: null,
  hireling2: null,
  hireling3: null,
  excludedFactions: [],
  factionPool: [],
  lastFactionLocked: false,
  currentFaction: null,
  currentFactionPlayer: null,
};

export const selectSetupParameters = (state: RootState) => state.setup.present;

export const setupSlice = createSlice({
  name: "setup",
  initialState: initialState,
  reducers: {
    setStep: (state, action: PayloadAction<SetupStep>) => {
      state.currentStep = action.payload;
    },
    incrementStep: (state) => {
      let skipStep = false;
      do {
        state.currentStep++;
        skipStep = state.skippedSteps.get(state.currentStep) ?? false;
      } while (skipStep);
    },
    skipSteps: (state, action: PayloadAction<SkipStepsInput>) => {
      action.payload.steps.forEach((step) => {
        state.skippedSteps.set(step, action.payload.skip);
      });
    },
    setPlayerCount: (state, action: PayloadAction<number>) => {
      state.playerCount = action.payload;
    },
    fixFirstPlayer: (state, action: PayloadAction<boolean>) => {
      state.fixedFirstPlayer = action.payload;
    },
    setFirstPlayer: (state, action: PayloadAction<number>) => {
      state.firstPlayer = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload;
    },
    usePrintedSuits: (state, action: PayloadAction<boolean>) => {
      state.usePrintedSuits = action.payload;
    },
    useMapLandmark: (state, action: PayloadAction<boolean>) => {
      state.useMapLandmark = action.payload;
    },
    setMap: (state, action: PayloadAction<MapComponent>) => {
      state.map = action.payload;
    },
    setDeck: (state, action: PayloadAction<Deck>) => {
      state.deck = action.payload;
    },
    setLandmarkCount: (state, action: PayloadAction<0 | 1 | 2>) => {
      state.landmarkCount = action.payload;
    },
    setLandmark1: (state, action: PayloadAction<Landmark>) => {
      state.landmark1 = action.payload;
    },
    setLandmark2: (state, action: PayloadAction<Landmark>) => {
      state.landmark2 = action.payload;
    },
    setHireling: (state, action: PayloadAction<SetHirelingInput>) => {
      const hireling: HirelingEntry = action.payload.promoted
        ? { ...action.payload.hireling.promoted, promoted: true }
        : { ...action.payload.hireling.demoted, promoted: false };

      if (action.payload.number === 1) state.hireling1 = hireling;
      if (action.payload.number === 2) state.hireling2 = hireling;
      if (action.payload.number === 3) state.hireling3 = hireling;

      state.excludedFactions.push(...action.payload.hireling.factions);
    },
    clearExcludedFactions: (state) => {
      state.excludedFactions = [];
    },
    clearFactionPool: (state) => {
      state.factionPool = [];
      state.lastFactionLocked = false;
      state.currentFaction = null;
      state.currentFactionPlayer = null;
    },
    addToFactionPool: (state, action: PayloadAction<WithCode<Faction>>) => {
      // Add to our pool, and set it to locked if insurgent
      state.factionPool.push(action.payload);
      state.lastFactionLocked = !action.payload.militant;
    },
    selectFaction: (state, action: PayloadAction<string>) => {
      // Check if the faction is in our pool, and at what index
      const i = state.factionPool.findIndex(
        (faction) => faction.code === action.payload
      );

      // Select the faction if it's in our pool and not locked
      if (
        i > -1 &&
        (i < state.factionPool.length - 1 || !state.lastFactionLocked)
      ) {
        state.currentFaction = state.factionPool[i];
        // Delete 1 element starting at chosen index
        state.factionPool.splice(i, 1);
        // Clear the lock if we're selecting a militant faction
        if (state.currentFaction.militant) state.lastFactionLocked = false;
      }
    },
  },
});

export const {
  setStep,
  incrementStep,
  skipSteps,
  setPlayerCount,
  fixFirstPlayer,
  setFirstPlayer,
  setErrorMessage,
  usePrintedSuits,
  useMapLandmark,
  setMap,
  setDeck,
  setLandmarkCount,
  setLandmark1,
  setLandmark2,
  setHireling,
  clearExcludedFactions,
  clearFactionPool,
  addToFactionPool,
  selectFaction,
} = setupSlice.actions;

export const nextStep = (): AppThunk => (dispatch, getState) => {
  // Retrieve our setup state
  const setupParameters = selectSetupParameters(getState());
  let doIncrementStep = true;
  let validationError: string | null = null;

  // Handle any special logic that fires at the end of a step
  switch (setupParameters.currentStep) {
    case SetupStep.chooseExpansions:
      // After locking in the Choosen expansions, we need to calculate which steps can be skipped
      // Do we need to choose a deck?
      const decks = selectDeckArray(getState());
      if (decks.length === 1) {
        // Auto select the only deck
        dispatch(setDeck(decks[0]));
        dispatch(skipSteps({ steps: [SetupStep.chooseDeck], skip: true }));
      } else {
        // Make sure we do the choose deck step
        dispatch(skipSteps({ steps: [SetupStep.chooseDeck], skip: false }));
      }

      // Are there any landmarks that can be set up?
      const landmarks = selectLandmarkArray(getState());
      dispatch(
        skipSteps({
          steps: [
            SetupStep.chooseLandmarks,
            SetupStep.setUpLandmark1,
            SetupStep.setUpLandmark2,
          ],
          skip: landmarks.length === 0,
        })
      );

      // Are there any hirelings that can be set up?
      const hirelings = selectHirelingArray(getState());
      dispatch(
        skipSteps({
          steps: [
            SetupStep.chooseHirelings,
            SetupStep.setUpHireling1,
            SetupStep.setUpHireling2,
            SetupStep.setUpHireling3,
            SetupStep.postHirelingSetup,
          ],
          skip: hirelings.length === 0,
        })
      );

      // Clear the exlcude faction pool of any potential stale data from previous setups
      // We need to do this here in case we skip the chooseHirelings step
      if (setupParameters.excludedFactions.length > 0)
        dispatch(clearExcludedFactions());
      break;

    case SetupStep.chooseMap:
      // Get our list of maps which are avaliable for selection
      const mapPool = selectEnabledMaps(getState());

      // Check that there is even a map to be selected...
      if (mapPool.length > 0) {
        // Choose a random map
        const map = takeRandom(mapPool);
        dispatch(setMap(map));

        // Set the landmark count in advance if we have one with the map
        if (setupParameters.useMapLandmark && map.landmark) {
          dispatch(setLandmarkCount(1));
          dispatch(toggleLandmark({ code: map.landmark, enabled: true }));
        }
      } else {
        // Invalid state, do not proceed
        doIncrementStep = false;
        validationError = "error.noMap";
      }
      break;

    case SetupStep.seatPlayers:
      let firstPlayer: number;

      if (setupParameters.fixedFirstPlayer) {
        firstPlayer = 1;
      } else {
        // Randomly pick a first player between 1 and playerCount
        firstPlayer =
          Math.floor(Math.random() * setupParameters.playerCount) + 1;
      }

      dispatch(setFirstPlayer(firstPlayer));
      break;

    case SetupStep.chooseLandmarks:
      // Get our list of landmarks which are avaliable for selection
      let LandmarkPool = selectEnabledLandmarks(getState());

      // Check that there are enough enabled landmarks for how many we want to set up
      if (LandmarkPool.length >= setupParameters.landmarkCount) {
        // Select the first landmark (either the map's landmark or a random one)
        if (setupParameters.useMapLandmark && setupParameters.map?.landmark) {
          // Retrieve the map's landmark and set it as landmark 1
          const mapLandmark = selectLandmark(
            getState(),
            setupParameters.map.landmark
          );
          // Choose the landmark of the map
          dispatch(setLandmark1(mapLandmark));
          // Make sure to filter said landmark from the pool in case we have to choose a second
          LandmarkPool = LandmarkPool.filter(
            (landmark) => landmark.code !== setupParameters.map?.landmark
          );
        } else if (setupParameters.landmarkCount > 0) {
          // Choose a random landmark
          dispatch(setLandmark1(takeRandom(LandmarkPool)));
        } else {
          // We're not setting up any landmarks, so skip both setup steps
          dispatch(
            skipSteps({
              steps: [SetupStep.setUpLandmark1, SetupStep.setUpLandmark2],
              skip: true,
            })
          );
        }

        // Select the second landmark
        if (setupParameters.landmarkCount > 1) {
          // Choose a random landmark
          dispatch(setLandmark2(takeRandom(LandmarkPool)));
        } else if (setupParameters.landmarkCount > 0) {
          // If we did setup the first landmark then handle skipping just the second landmark setup
          dispatch(
            skipSteps({ steps: [SetupStep.setUpLandmark2], skip: true })
          );
        }
      } else {
        // Invalid state, do not proceed
        doIncrementStep = false;

        // Set the correct error message
        if (LandmarkPool.length === 0) {
          validationError = "error.noLandmark";
        } else {
          validationError = "error.tooFewLandmark";
        }
      }
      break;

    case SetupStep.chooseHirelings:
      // Clear the exlcude faction pool of any potential stale data from previous hireling setups
      if (setupParameters.excludedFactions.length > 0)
        dispatch(clearExcludedFactions());

      // Did we skip the hireling setup?
      if (!setupParameters.skippedSteps.get(SetupStep.setUpHireling1)) {
        // Get our list of hirelings which are avaliable for selection
        const hirelingPool = selectEnabledHirelings(getState());

        // Check that there are enough hirelings selected
        if (hirelingPool.length >= 3) {
          // Choose three random hirelings
          for (let number = 1; number <= 3; number++) {
            dispatch(
              setHireling({
                number,
                hireling: takeRandom(hirelingPool),
                promoted: setupParameters.playerCount + number < 6,
              })
            );
          }
          // Disable the factions that are mutually exclusive with the selected hirelings
          selectSetupParameters(getState()).excludedFactions.forEach((code) => {
            dispatch(toggleFaction({ code, enabled: false }));
          });
        } else {
          // Invalid state, do not proceed
          doIncrementStep = false;
          validationError = "error.tooFewHireling";
        }
      }
      break;

    case SetupStep.chooseDeck:
      // Get our list of decks which are avaliable for selection
      const deckPool = selectEnabledDecks(getState());

      // Check that there is even a deck to be selected...
      if (deckPool.length > 0) {
        // Choose a random deck
        dispatch(setDeck(takeRandom(deckPool)));
      } else {
        // Invalid state, do not proceed
        doIncrementStep = false;
        validationError = "error.noDeck";
      }
      break;

    case SetupStep.chooseFactions:
      // Clear the faction pool of any potential stale data from previous setups
      if (setupParameters.factionPool.length > 0) dispatch(clearFactionPool());

      // Get our list of militant factions which are avaliable for selection
      const workingFactionPool = selectMilitantFactions(getState());
      const insurgentFactions = selectInsurgentFactions(getState());

      // Check that there are enough factions avaliable for setup
      if (
        workingFactionPool.length > 0 &&
        workingFactionPool.length + insurgentFactions.length >=
          setupParameters.playerCount + 1
      ) {
        // Start by adding a random militant faction
        dispatch(addToFactionPool(takeRandom(workingFactionPool)));
        // Add the insurgent factions to the mix
        workingFactionPool.concat(...insurgentFactions);
        // Add enough factions to make the total pool playerCount + 1
        for (let i = 0; i < setupParameters.playerCount; i++) {
          dispatch(addToFactionPool(takeRandom(workingFactionPool)));
        }
      } else {
        // Invalid state, do not proceed
        doIncrementStep = false;

        // Set the correct error message
        if (workingFactionPool.length === 0) {
          validationError = "error.noMilitantFaction";
        } else {
          validationError = "error.tooFewFaction";
        }
      }
      break;

    case SetupStep.selectFaction:
      break;

    case SetupStep.setUpFaction:
      break;

    case SetupStep.setupEnd:
      // This is the final step, so don't try to increment
      doIncrementStep = false;
      break;

    default:
      console.error(
        `Invalid current step ${setupParameters.currentStep}! Resetting current step to ${SetupStep.chooseExpansions}...`
      );
      dispatch(setStep(SetupStep.chooseExpansions));
      doIncrementStep = false;
  }

  // Set the error message if it's changed
  if (setupParameters.errorMessage !== validationError) {
    dispatch(setErrorMessage(validationError));
  }

  // Increment the step if we're still flagged to do so
  if (doIncrementStep) {
    dispatch(incrementStep());
  }
};

// Function to group steps together so that undo/redo will always jump between steps
const setupGroupBy: GroupByFunction<SetupState> = (
  action,
  currentState,
  previousHistory
) => currentState.currentStep;

//export const {} = setupSlice.actions;
export default undoable(setupSlice.reducer, { groupBy: setupGroupBy });
