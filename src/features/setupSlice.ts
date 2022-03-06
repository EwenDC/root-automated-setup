import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import undoable, { GroupByFunction } from "redux-undo";
import { AppThunk, RootState } from "../components/store";
import { Deck, selectDeckArray, selectEnabledDecks } from "./deckSlice";
import { Hireling, selectHirelingArray } from "./hirelingSlice";
import {
  enableLandmark,
  Landmark,
  selectEnabledLandmarks,
  selectLandmark,
  selectLandmarkArray,
} from "./landmarkSlice";
import { MapComponent, selectEnabledMaps } from "./mapSlice";
import { takeRandom, WithCode } from "./reduxUtils";

export enum SetupStep {
  chooseExpansions,
  chooseMap,
  setupMap,
  chooseDeck,
  setUpBots,
  seatPlayers,
  chooseLandmarks,
  setUpLandmark1,
  setUpLandmark2,
  chooseHirelings,
  setUpHireling1,
  setUpHireling2,
  setUpHireling3,
  drawCards,
  chooseFaction,
  setUpFaction,
  placeScoreMarkers,
  chooseHand,
}

export interface SkipStepsInput {
  steps: SetupStep[];
  skip: boolean;
}

export interface FactionPoolEntry {
  factionCode: string;
  lockedByFaction?: string;
}

export interface SetupState {
  currentStep: SetupStep;
  skippedSteps: Map<SetupStep, boolean>;
  playerCount: number;
  fixedFirstPlayer: boolean;
  // Map
  map: WithCode<MapComponent> | null;
  usePrintedSuits: boolean;
  useMapLandmark: boolean;
  // Deck
  deck: WithCode<Deck> | null;
  // Landmarks
  landmarkCount: 0 | 1 | 2;
  landmark1: WithCode<Landmark> | null;
  landmark2: WithCode<Landmark> | null;
  // Hirelings
  hireling1: WithCode<Hireling> | null;
  hireling2: WithCode<Hireling> | null;
  hireling3: WithCode<Hireling> | null;
  // Factions
  factionPool: FactionPoolEntry[];
  faction: string | null;
}

const initialState: SetupState = {
  currentStep: SetupStep.chooseExpansions,
  skippedSteps: new Map(),
  playerCount: 4,
  fixedFirstPlayer: false,
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
  factionPool: [],
  faction: null,
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
    usePrintedSuits: (state, action: PayloadAction<boolean>) => {
      state.usePrintedSuits = action.payload;
    },
    useMapLandmark: (state, action: PayloadAction<boolean>) => {
      state.useMapLandmark = action.payload;
    },
    setMap: (state, action: PayloadAction<WithCode<MapComponent>>) => {
      state.map = action.payload;
    },
    setDeck: (state, action: PayloadAction<WithCode<Deck>>) => {
      state.deck = action.payload;
    },
    setLandmarkCount: (state, action: PayloadAction<0 | 1 | 2>) => {
      state.landmarkCount = action.payload;
    },
    setLandmark1: (state, action: PayloadAction<WithCode<Landmark>>) => {
      state.landmark1 = action.payload;
    },
    setLandmark2: (state, action: PayloadAction<WithCode<Landmark>>) => {
      state.landmark2 = action.payload;
    },
  },
});

export const {
  setStep,
  incrementStep,
  skipSteps,
  usePrintedSuits,
  useMapLandmark,
  setMap,
  setDeck,
  setLandmarkCount,
  setLandmark1,
  setLandmark2,
} = setupSlice.actions;

export const nextStep = (): AppThunk => (dispatch, getState) => {
  // Retrieve our setup state
  const setupParameters = selectSetupParameters(getState());
  let doIncrementStep = true;

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
          ],
          skip: hirelings.length === 0,
        })
      );
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
          dispatch(enableLandmark(map.landmark));
        }
      } else {
        // Invalid state, do not proceed
        doIncrementStep = false;
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
      }
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
          dispatch(
            setLandmark1({ ...mapLandmark, code: setupParameters.map.landmark })
          );
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
      }
      break;

    case SetupStep.setUpLandmark1:
      break;

    case SetupStep.setUpLandmark2:
      break;

    case SetupStep.chooseHirelings:
      break;

    case SetupStep.setUpHireling1:
      break;

    case SetupStep.setUpHireling2:
      break;

    case SetupStep.setUpHireling3:
      break;

    case SetupStep.drawCards:
      break;

    case SetupStep.chooseFaction:
      break;

    case SetupStep.setUpFaction:
      break;

    case SetupStep.placeScoreMarkers:
      break;

    case SetupStep.chooseHand:
      break;

    default:
      console.error(
        `Invalid current step ${setupParameters.currentStep}! Resetting current step to ${SetupStep.chooseExpansions}...`
      );
      dispatch(setStep(SetupStep.chooseExpansions));
      doIncrementStep = false;
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
