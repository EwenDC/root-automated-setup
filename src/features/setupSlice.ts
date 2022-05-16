import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ExpansionComponent,
  Hireling,
  HirelingEntry,
  Landmark,
  MapComponent,
  SetupState,
  WithCode,
} from "../types";

const initialState: SetupState = {
  playerCount: 4,
  fixedFirstPlayer: false,
  playerOrder: [],
  errorMessage: null,
  // Map
  map: null,
  useMapLandmark: true,
  // Deck
  deck: null,
  // Landmarks
  landmarkCount: 0,
  landmark1: null,
  landmark2: null,
  // Hirelings
  hireling1: null,
  hireling2: null,
  hireling3: null,
  // Factions
  excludedFactions: [],
};

export const setupSlice = createSlice({
  name: "setup",
  initialState: initialState,
  reducers: {
    setPlayerCount: (state, action: PayloadAction<number>) => {
      // Make sure the player count is valid (i.e. above 0)
      if (action.payload >= 1) {
        state.playerCount = action.payload;
        state.errorMessage = null;
      } else if (process.env.NODE_ENV !== "production") {
        console.warn(
          "Invalid payload for setPlayerCount action: Payload must be a number above 0",
          action
        );
      }
    },
    fixFirstPlayer: (state, action: PayloadAction<boolean>) => {
      state.fixedFirstPlayer = action.payload;
      state.errorMessage = null;
    },
    setFirstPlayer: (state, action: PayloadAction<number>) => {
      // Make sure the player count is valid (i.e. between 1 and playerCount)
      if (action.payload >= 1 && action.payload <= state.playerCount) {
        state.playerOrder = [];
        // Generate the player order array
        for (let i = 0; i < state.playerCount; i++) {
          // Add each player to the array, starting with the first player
          let nextPlayer = action.payload + i;
          if (nextPlayer > state.playerCount) nextPlayer -= state.playerCount;
          state.playerOrder.push(nextPlayer);
        }
      } else if (process.env.NODE_ENV !== "production") {
        console.warn(
          `Invalid payload for setFirstPlayer action: Payload must be a number between 1 and playerCount (${state.playerCount})`,
          action
        );
      }
    },
    setErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload;
    },
    enableMapLandmark: (state, action: PayloadAction<boolean>) => {
      state.useMapLandmark = action.payload;
      state.errorMessage = null;
    },
    setMap: {
      prepare: (map: WithCode<MapComponent>) => ({ payload: map.code }),
      reducer: (state, action: PayloadAction<string>) => {
        state.map = action.payload;
      },
    },
    setDeck: {
      prepare: (deck: WithCode<ExpansionComponent>) => ({ payload: deck.code }),
      reducer: (state, action: PayloadAction<string>) => {
        state.deck = action.payload;
      },
    },
    setLandmarkCount: (state, action: PayloadAction<number>) => {
      // We use === instead of >= or <= to ensure typescript can infer the correct payload type
      if (
        action.payload === 0 ||
        action.payload === 1 ||
        action.payload === 2
      ) {
        state.landmarkCount = action.payload;
        state.errorMessage = null;
      } else if (process.env.NODE_ENV !== "production") {
        console.warn(
          "Invalid payload for setLandmarkCount action: Payload must be a number between 0 and 2",
          action
        );
      }
    },
    setLandmark1: {
      prepare: (landmark: WithCode<Landmark>) => ({ payload: landmark.code }),
      reducer: (state, action: PayloadAction<string>) => {
        if (state.landmarkCount >= 1) {
          state.landmark1 = action.payload;
        } else if (process.env.NODE_ENV !== "production") {
          console.warn(
            "Invalid setLandmark1 action: Cannot set landmark 1 when landmark count less than 1",
            action
          );
        }
      },
    },
    setLandmark2: {
      prepare: (landmark: WithCode<Landmark>) => ({ payload: landmark.code }),
      reducer: (state, action: PayloadAction<string>) => {
        if (state.landmarkCount >= 2) {
          state.landmark2 = action.payload;
        } else if (process.env.NODE_ENV !== "production") {
          console.warn(
            "Invalid setLandmark2 action: Cannot set landmark 2 when landmark count less than 2",
            action
          );
        }
      },
    },
    setHireling: {
      prepare: (
        number: number,
        hireling: WithCode<Hireling>,
        demoted: boolean
      ) => ({
        payload: {
          number,
          hireling: hireling.code,
          factions: hireling.factions,
          demoted,
        },
      }),
      reducer: (
        state,
        action: PayloadAction<{
          number: number;
          hireling: string;
          factions: string[];
          demoted: boolean;
        }>
      ) => {
        if (action.payload.number >= 1 && action.payload.number <= 3) {
          const hireling: HirelingEntry = {
            code: action.payload.hireling,
            demoted: action.payload.demoted,
          };

          if (action.payload.number === 1) state.hireling1 = hireling;
          if (action.payload.number === 2) state.hireling2 = hireling;
          if (action.payload.number === 3) state.hireling3 = hireling;

          state.excludedFactions.push(...action.payload.factions);
        } else if (process.env.NODE_ENV !== "production") {
          console.warn(
            'Invalid payload for setHireling action: Payload field "number" must be a number between 1 and 3',
            action
          );
        }
      },
    },
    clearExcludedFactions: (state) => {
      state.excludedFactions = [];
    },
  },
  extraReducers: (builder) => {
    // This allows us to always reset the displayed error if the user makes a seperate input
    builder.addDefaultCase((state) => {
      state.errorMessage = null;
    });
  },
});

export const {
  setPlayerCount,
  fixFirstPlayer,
  setFirstPlayer,
  setErrorMessage,
  enableMapLandmark,
  setMap,
  setDeck,
  setLandmarkCount,
  setLandmark1,
  setLandmark2,
  setHireling,
  clearExcludedFactions,
} = setupSlice.actions;
export default setupSlice.reducer;
