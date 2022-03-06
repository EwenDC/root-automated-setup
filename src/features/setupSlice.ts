import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import undoable, { GroupByFunction } from "redux-undo";
import { AppThunk, RootState } from "../components/store";
import { selectDeckArray, selectEnabledDecks } from "./deckSlice";
import { selectEnabledMaps } from "./mapSlice";
import { getRandom } from "./reduxUtils";

export enum SetupStep {
  chooseExpansions,
  chooseMap,
  setupMap,
  chooseDeck,
  setUpBots,
  seatPlayers,
  chooseLandmarks,
  setUpLandmarks,
  chooseHirelings,
  setUpHirelings,
  drawCards,
  chooseFaction,
  setUpFaction,
  placeScoreMarkers,
  chooseHand,
}

export interface SkipStepInput {
  step: SetupStep;
  skip: boolean;
}

export interface FactionPoolEntry {
  factionCode: string;
  lockedByFaction?: string;
}

export interface SetupState {
  currentStep: SetupStep;
  skippedSteps: Map<SetupStep, boolean>;
  // chooseMap
  map: string | null;
  usePrintedSuits: boolean;
  useMapLandmark: boolean;
  // chooseDeck
  deck: string | null;
  // seatPlayers
  playerCount: number;
  fixedFirstPlayer: boolean;
  // chooseLandmarks
  landmarkCount: number;
  // chooseFaction
  factionPool: FactionPoolEntry[];
  // setUpFaction
  faction: string | null;
}

const initialState: SetupState = {
  currentStep: SetupStep.chooseExpansions,
  skippedSteps: new Map(),
  map: null,
  usePrintedSuits: false,
  useMapLandmark: false,
  deck: null,
  playerCount: 4,
  fixedFirstPlayer: false,
  landmarkCount: 0,
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
    skipStep: (state, action: PayloadAction<SkipStepInput>) => {
      state.skippedSteps.set(action.payload.step, action.payload.skip);
    },
    usePrintedSuits: (state, action: PayloadAction<boolean>) => {
      state.usePrintedSuits = action.payload;
    },
    useMapLandmark: (state, action: PayloadAction<boolean>) => {
      state.useMapLandmark = action.payload;
    },
    setMap: (state, action: PayloadAction<string>) => {
      state.map = action.payload;
    },
    setDeck: (state, action: PayloadAction<string>) => {
      state.deck = action.payload;
    },
  },
});

export const {
  setStep,
  incrementStep,
  skipStep,
  usePrintedSuits,
  useMapLandmark,
  setMap,
  setDeck,
} = setupSlice.actions;

export const nextStep = (): AppThunk => (dispatch, getState) => {
  // Retrieve our setup state
  const setupParameters = selectSetupParameters(getState());
  let doIncrementStep = true;

  // Handle any special logic that fires at the end of a step
  switch (setupParameters.currentStep) {
    case SetupStep.chooseExpansions:
      // After locking in the chosen expansions, we need to calculate which steps can be skipped

      // Do we need to choose a deck?
      const decks = selectDeckArray(getState());
      if (decks.length === 1) {
        // Auto select the only deck
        dispatch(setDeck(decks[0].code));
        dispatch(skipStep({ step: SetupStep.chooseDeck, skip: true }));
      } else {
        // Make sure we do the choose deck step
        dispatch(skipStep({ step: SetupStep.chooseDeck, skip: false }));
      }
      break;

    case SetupStep.chooseMap:
      // Get our list of maps which are avaliable for selection
      const mapPool = selectEnabledMaps(getState());

      // Check that there is even a map to be selected...
      if (mapPool.length > 0) {
        // Chose a random map and move on to next step
        dispatch(setMap(getRandom(mapPool).code));
        dispatch(incrementStep());
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
        // Chose a random map and move on to next step
        dispatch(setMap(getRandom(deckPool).code));
        dispatch(incrementStep());
      } else {
        // Invalid state, do not proceed
        doIncrementStep = false;
      }
      break;

    case SetupStep.seatPlayers:
      break;

    case SetupStep.chooseLandmarks:
      break;

    case SetupStep.setUpLandmarks:
      break;

    case SetupStep.chooseHirelings:
      break;

    case SetupStep.setUpHirelings:
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

  // Increment the step (unless we're in an invalid state)
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
