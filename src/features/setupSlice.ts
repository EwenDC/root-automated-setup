import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CodeObject, Hireling, SetHirelingPayload, SetupState, WithCode } from "../types";

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
  initialState,
  reducers: {
    setPlayerCount: (state, { payload: playerCount }: PayloadAction<number>) => {
      // Make sure the player count is valid (i.e. above 0)
      if (playerCount >= 1) {
        state.playerCount = playerCount;
        state.errorMessage = null;
      } else if (process.env.NODE_ENV !== "production") {
        console.warn(
          `Invalid payload for setPlayerCount action: ${playerCount} (Payload must be a number above 0)`
        );
      }
    },
    fixFirstPlayer: (state, { payload: fixedFirstPlayer }: PayloadAction<boolean>) => {
      state.fixedFirstPlayer = fixedFirstPlayer;
      state.errorMessage = null;
    },
    setFirstPlayer: (state, { payload: firstPlayer }: PayloadAction<number>) => {
      // Make sure the player count is valid (i.e. between 1 and playerCount)
      if (firstPlayer >= 1 && firstPlayer <= state.playerCount) {
        state.playerOrder = [];
        // Generate the player order array
        for (let i = 0; i < state.playerCount; i++) {
          // Add each player to the array, starting with the first player
          let nextPlayer = firstPlayer + i;
          if (nextPlayer > state.playerCount) nextPlayer -= state.playerCount;
          state.playerOrder.push(nextPlayer);
        }
      } else if (process.env.NODE_ENV !== "production") {
        console.warn(
          `Invalid payload for setFirstPlayer action: ${firstPlayer} (Payload must be a number between 1 and playerCount [${state.playerCount}])`
        );
      }
    },
    setErrorMessage: (state, { payload: errorMessage }: PayloadAction<string | null>) => {
      state.errorMessage = errorMessage;
    },
    enableMapLandmark: (state, { payload: useMapLandmark }: PayloadAction<boolean>) => {
      state.useMapLandmark = useMapLandmark;
      state.errorMessage = null;
    },
    setMap: (state, { payload: { code: mapCode } }: PayloadAction<CodeObject>) => {
      state.map = mapCode;
    },
    setDeck: (state, { payload: { code: deckCode } }: PayloadAction<CodeObject>) => {
      state.deck = deckCode;
    },
    setLandmarkCount: (state, { payload: landmarkCount }: PayloadAction<number>) => {
      // We use === instead of >= or <= to ensure typescript can infer the correct payload type
      if (landmarkCount === 0 || landmarkCount === 1 || landmarkCount === 2) {
        state.landmarkCount = landmarkCount;
        state.errorMessage = null;
      } else if (process.env.NODE_ENV !== "production") {
        console.warn(
          `Invalid payload for setLandmarkCount action: ${landmarkCount} (Payload must be a number between 0 and 2)`
        );
      }
    },
    setLandmark1: (state, { payload: { code: landmarkCode } }: PayloadAction<CodeObject>) => {
      if (state.landmarkCount >= 1) {
        state.landmark1 = landmarkCode;
      } else if (process.env.NODE_ENV !== "production") {
        console.warn(
          "Invalid setLandmark1 action: Cannot set landmark 1 when landmark count less than 1"
        );
      }
    },
    setLandmark2: (state, { payload: { code: landmarkCode } }: PayloadAction<CodeObject>) => {
      if (state.landmarkCount >= 1) {
        state.landmark2 = landmarkCode;
      } else if (process.env.NODE_ENV !== "production") {
        console.warn(
          "Invalid setLandmark2 action: Cannot set landmark 1 when landmark count less than 1"
        );
      }
    },
    setHireling: {
      prepare: (number: number, hireling: WithCode<Hireling>, demoted: boolean) => ({
        payload: {
          number,
          hirelingEntry: {
            code: hireling.code,
            demoted,
          },
          factions: hireling.factions,
        },
      }),
      reducer: (
        state,
        { payload: { number, hirelingEntry, factions } }: PayloadAction<SetHirelingPayload>
      ) => {
        if (number >= 1 && number <= 3) {
          if (number === 1) state.hireling1 = hirelingEntry;
          if (number === 2) state.hireling2 = hirelingEntry;
          if (number === 3) state.hireling3 = hirelingEntry;

          state.excludedFactions.push(...factions);
        } else if (process.env.NODE_ENV !== "production") {
          console.warn(
            `Invalid payload.number for setHireling action: ${number} (Must be a number between 1 and 3)`
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
