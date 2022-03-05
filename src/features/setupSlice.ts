import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import undoable, { GroupByFunction } from "redux-undo";
import { AppThunk, RootState } from "../components/store";
import { selectEnabledDecks } from "./deckSlice";
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

export interface FactionPoolEntry {
  factionCode: string;
  lockedByFaction?: string;
}

export interface SetupState {
  currentStep: SetupStep;
  // chooseMap
  map: string | null;
  usePrintedSuits: boolean;
  useMapLandmark: boolean;
  // chooseDeck
  chooseDeckSkipped: boolean;
  deck: string | null;
  // setUpBots
  doBotSetup: boolean;
  // seatPlayers
  playerCount: number;
  fixedFirstPlayer: boolean;
  // chooseLandmarks
  chooseLandmarksSkipped: boolean;
  landmarkCount: number;
  // chooseHirelings
  chooseHirelingsSkipped: boolean;
  // setUpHirelings
  doHirelingSetup: boolean;
  // chooseFaction
  factionPool: FactionPoolEntry[];
  // setUpFaction
  faction: string | null;
}

const initialState: SetupState = {
  currentStep: SetupStep.chooseExpansions,
  map: null,
  usePrintedSuits: false,
  useMapLandmark: false,
  chooseDeckSkipped: false,
  deck: null,
  doBotSetup: false,
  playerCount: 4,
  fixedFirstPlayer: false,
  chooseLandmarksSkipped: false,
  landmarkCount: 0,
  chooseHirelingsSkipped: false,
  doHirelingSetup: false,
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
      state.currentStep++;
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
  },
});

export const {
  setStep,
  incrementStep,
  usePrintedSuits,
  useMapLandmark,
  setMap,
} = setupSlice.actions;

export const nextStep = (): AppThunk => (dispatch, getState) => {
  // Retrieve our setup state
  const setupParameters = selectSetupParameters(getState());

  // Handle any special logic that fires at the end of each step, including logic for going to next step
  switch (setupParameters.currentStep) {
    case SetupStep.chooseExpansions:
      dispatch(incrementStep());
      break;

    case SetupStep.chooseMap:
      // Get our list of maps which are avaliable for selection
      const mapPool = selectEnabledMaps(getState());

      // Check that there is even a map to be selected...
      if (mapPool.length > 0) {
        // Chose a random map and move on to next step
        dispatch(setMap(getRandom(mapPool).code));
        dispatch(incrementStep());
      }
      break;

    case SetupStep.setupMap:
      // Check if we need to skip the chose deck step
      break;

    case SetupStep.chooseDeck:
      // Get our list of decks which are avaliable for selection
      const deckPool = selectEnabledDecks(getState());

      // Check that there is even a deck to be selected...
      if (deckPool.length > 0) {
        // Chose a random map and move on to next step
        dispatch(setMap(getRandom(deckPool).code));
        dispatch(incrementStep());
      }
      break;

    case SetupStep.setUpBots:
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
