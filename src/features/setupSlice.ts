import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ClearingSuit,
  CodeObject,
  Hireling,
  Map,
  MapInfo,
  SetHirelingPayload,
  SetupState,
  WithCode,
} from "../types";
import { toggleExpansion } from "./componentsSlice";
import { loadPersistedSetting, savePersistedSetting, takeRandom } from "./utils";

const initialState: SetupState = {
  playerCount: loadPersistedSetting("playerCount", 4),
  fixedFirstPlayer: loadPersistedSetting("fixedFirstPlayer", false),
  playerOrder: [],
  errorMessage: null,
  // Map
  map: null,
  balancedSuits: loadPersistedSetting("balancedSuits", false),
  clearingSuits: {},
  // Deck
  deck: null,
  // Landmarks
  landmarkCount: loadPersistedSetting("landmarkCount", 0),
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
        savePersistedSetting("playerCount", playerCount);
      } else if (process.env.NODE_ENV !== "production") {
        console.warn(
          `Invalid payload for setPlayerCount action: ${playerCount} (Payload must be a number above 0)`
        );
      }
    },
    fixFirstPlayer: (state, { payload: fixedFirstPlayer }: PayloadAction<boolean>) => {
      state.fixedFirstPlayer = fixedFirstPlayer;
      state.errorMessage = null;
      savePersistedSetting("fixedFirstPlayer", fixedFirstPlayer);
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
    setMap: (state, { payload }: PayloadAction<CodeObject & Map & MapInfo>) => {
      const { code: mapCode, defaultSuits, clearings, fixedSuits } = payload;
      state.map = mapCode;

      // Also assign the clearing suits
      if (fixedSuits && defaultSuits) {
        state.clearingSuits = defaultSuits;
      } else if (state.balancedSuits) {
        // TODO: ACTUALLY CHANGE THE IMPLEMENTATION
        const suitPool: ClearingSuit[] = [
          "fox",
          "fox",
          "fox",
          "fox",
          "mouse",
          "mouse",
          "mouse",
          "mouse",
          "rabbit",
          "rabbit",
          "rabbit",
          "rabbit",
        ];
        clearings.forEach(({ no }) => {
          state.clearingSuits[no] = takeRandom(suitPool);
        });
      } else {
        const suitPool: ClearingSuit[] = [
          "fox",
          "fox",
          "fox",
          "fox",
          "mouse",
          "mouse",
          "mouse",
          "mouse",
          "rabbit",
          "rabbit",
          "rabbit",
          "rabbit",
        ];
        clearings.forEach(({ no }) => {
          state.clearingSuits[no] = takeRandom(suitPool);
        });
      }
    },
    balanceMapSuits: (state, { payload: balancedSuits }: PayloadAction<boolean>) => {
      state.balancedSuits = balancedSuits;
      state.errorMessage = null;
      savePersistedSetting("balancedSuits", balancedSuits);
    },
    setDeck: (state, { payload }: PayloadAction<CodeObject>) => {
      const { code: deckCode } = payload;
      state.deck = deckCode;
    },
    setLandmarkCount: (state, { payload: landmarkCount }: PayloadAction<number>) => {
      // We use === instead of >= or <= to ensure typescript can infer the correct payload type
      if (landmarkCount === 0 || landmarkCount === 1 || landmarkCount === 2) {
        state.landmarkCount = landmarkCount;
        state.errorMessage = null;
        savePersistedSetting("landmarkCount", landmarkCount);
      } else if (process.env.NODE_ENV !== "production") {
        console.warn(
          `Invalid payload for setLandmarkCount action: ${landmarkCount} (Payload must be a number between 0 and 2)`
        );
      }
    },
    setLandmark1: (state, { payload }: PayloadAction<CodeObject>) => {
      const { code: landmarkCode } = payload;

      if (state.landmarkCount >= 1) {
        state.landmark1 = landmarkCode;
      } else if (process.env.NODE_ENV !== "production") {
        console.warn(
          "Invalid setLandmark1 action: Cannot set landmark 1 when landmark count less than 1"
        );
      }
    },
    setLandmark2: (state, { payload }: PayloadAction<CodeObject>) => {
      const { code: landmarkCode } = payload;

      if (state.landmarkCount >= 2) {
        state.landmark2 = landmarkCode;
      } else if (process.env.NODE_ENV !== "production") {
        console.warn(
          "Invalid setLandmark2 action: Cannot set landmark 2 when landmark count less than 2"
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
      reducer: (state, { payload }: PayloadAction<SetHirelingPayload>) => {
        const { number, hirelingEntry, factions } = payload;

        if (number >= 1 && number <= 3) {
          if (number === 1) state.hireling1 = hirelingEntry;
          if (number === 2) state.hireling2 = hirelingEntry;
          if (number === 3) state.hireling3 = hirelingEntry;
          state.excludedFactions.push(...factions);
        } else if (process.env.NODE_ENV !== "production") {
          console.warn(
            "Invalid payload for setHireling action:",
            payload,
            '("number" must be a number between 1 and 3)'
          );
        }
      },
    },
    clearExcludedFactions: (state) => {
      state.excludedFactions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Ensure we don't reference codes for components that may have been removed with the toggled expansion
      .addCase(toggleExpansion, (state) => {
        state.map = null;
        state.deck = null;
        state.landmark1 = null;
        state.landmark2 = null;
        state.hireling1 = null;
        state.hireling2 = null;
        state.hireling3 = null;
      })
      // This allows us to always reset the displayed error if the user makes a seperate input
      .addDefaultCase((state) => {
        state.errorMessage = null;
      });
  },
});

export const {
  setPlayerCount,
  fixFirstPlayer,
  setFirstPlayer,
  setErrorMessage,
  setMap,
  balanceMapSuits,
  setDeck,
  setLandmarkCount,
  setLandmark1,
  setLandmark2,
  setHireling,
  clearExcludedFactions,
} = setupSlice.actions;
export default setupSlice.reducer;
