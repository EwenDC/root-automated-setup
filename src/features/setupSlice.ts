import { createSlice } from "@reduxjs/toolkit";
import undoable, { GroupByFunction } from "redux-undo";
import { RootState } from "../components/store";

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

export const selectCurrentStep = (state: RootState) =>
  state.setup.present.currentStep;

export const setupSlice = createSlice({
  name: "setup",
  initialState: initialState,
  reducers: {},
});

// Function to group steps together so that undo/redo will always jump between steps
const setupGroupBy: GroupByFunction<SetupState> = (
  action,
  currentState,
  previousHistory
) => currentState.currentStep;

//export const {} = setupSlice.actions;
export default undoable(setupSlice.reducer, { groupBy: setupGroupBy });
