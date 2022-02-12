import { createSlice } from "@reduxjs/toolkit";
import undoable from "redux-undo";

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
  setUpFactions,
  placeScoreMarkers,
  chooseHand,
}

export interface FactionPoolEntry {
  factionCode: string;
  lockedByFaction: string;
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
  // setUpFactions
  factionPool: FactionPoolEntry[];
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
};

export const setupSlice = createSlice({
  name: "setup",
  initialState: initialState,
  reducers: {},
});

//export const {} = setupSlice.actions;
export default undoable(setupSlice.reducer);
