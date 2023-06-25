import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ClearingSolveState,
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
    setPlayerCount(state, { payload: playerCount }: PayloadAction<number>) {
      // Make sure the player count is valid (i.e. above 0)
      if (playerCount >= 1) {
        state.playerCount = playerCount;
        state.errorMessage = null;
        savePersistedSetting("playerCount", playerCount);
      } else {
        console.warn(
          `Invalid payload for setPlayerCount action: ${playerCount} (Payload must be a number above 0)`
        );
      }
    },
    fixFirstPlayer(state, { payload: fixedFirstPlayer }: PayloadAction<boolean>) {
      state.fixedFirstPlayer = fixedFirstPlayer;
      state.errorMessage = null;
      savePersistedSetting("fixedFirstPlayer", fixedFirstPlayer);
    },
    setFirstPlayer(state, { payload: firstPlayer }: PayloadAction<number>) {
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
      } else {
        console.warn(
          `Invalid payload for setFirstPlayer action: ${firstPlayer} (Payload must be a number between 1 and playerCount [${state.playerCount}])`
        );
      }
    },
    setErrorMessage(state, { payload: errorMessage }: PayloadAction<string | null>) {
      state.errorMessage = errorMessage;
    },
    setMap(state, { payload }: PayloadAction<CodeObject & Map & MapInfo>) {
      const { code: mapCode, defaultSuits, clearings, paths, fixedSuits } = payload;
      state.map = mapCode;

      // Also assign the clearing suits
      if (fixedSuits && defaultSuits) {
        state.clearingSuits = defaultSuits;
      } else if (state.balancedSuits) {
        // Do this in a loop as there is a chance the solver fails
        do {
          // First, keep track of all clearings, the clearings they connect to, and a list of valid suits for each clearing
          let unassignedClearings: ClearingSolveState[] = clearings.map(({ no }) => ({
            no,
            links: paths.reduce((list: number[], [a, b]) => {
              if (a === no) list.push(b);
              if (b === no) list.push(a);
              return list;
            }, []),
            options: ["fox", "mouse", "rabbit"],
          }));
          let suitCounts: Record<ClearingSuit, number> = {
            fox: 0,
            mouse: 0,
            rabbit: 0,
          };

          // Assign each clearing one-by-one, favouring clearings with the least amount of valid options
          while (unassignedClearings.length > 0) {
            let lowestEntropy = Infinity;
            let candidates = unassignedClearings.reduce((list: number[], { options }, index) => {
              // If our entropy is higher don't include as candidate
              if (options.length > lowestEntropy) return list;
              // If our entropy is the same add as a candidate
              if (options.length === lowestEntropy) {
                list.push(index);
                return list;
              }
              // Our entropy is lower, throw out the current candidate list and start again with just us
              lowestEntropy = options.length;
              return [index];
            }, []);

            // If we've hit 0 entropy then the solver failed
            if (lowestEntropy === 0) {
              console.info(
                "Failed to solve for balanced suits. Fail state:",
                { ...state.clearingSuits },
                unassignedClearings
              );
              state.clearingSuits = {};
              break;
            }

            // Randomly pick a candidate and remove it from the remaining clearings
            const nextClearingIndex = takeRandom(candidates);
            let nextClearing = unassignedClearings[nextClearingIndex];
            unassignedClearings.splice(nextClearingIndex, 1);

            // Assign a suit based off the valid options for the chosen clearing, and keep track of how many of each we've assigned
            const nextSuit = takeRandom(nextClearing.options);
            state.clearingSuits[nextClearing.no] = nextSuit;
            suitCounts[nextSuit]++;

            // Remove the assigned suit from all neighboring clearings, or all clearings if we've hit the maximum amount for one suit
            unassignedClearings = unassignedClearings.map(({ no, links, options }) => ({
              no,
              links,
              options: options.filter(
                (suit) =>
                  suitCounts[suit] < 4 && (suit !== nextSuit || !links.includes(nextClearing.no))
              ),
            }));
          }
        } while (Object.keys(state.clearingSuits).length === 0);
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
    balanceMapSuits(state, { payload: balancedSuits }: PayloadAction<boolean>) {
      state.balancedSuits = balancedSuits;
      state.errorMessage = null;
      savePersistedSetting("balancedSuits", balancedSuits);
    },
    setDeck(state, { payload }: PayloadAction<CodeObject>) {
      const { code: deckCode } = payload;
      state.deck = deckCode;
    },
    setLandmarkCount(state, { payload: landmarkCount }: PayloadAction<number>) {
      // We use === instead of >= or <= to ensure typescript can infer the correct payload type
      if (landmarkCount === 0 || landmarkCount === 1 || landmarkCount === 2) {
        state.landmarkCount = landmarkCount;
        state.errorMessage = null;
        savePersistedSetting("landmarkCount", landmarkCount);
      } else {
        console.warn(
          `Invalid payload for setLandmarkCount action: ${landmarkCount} (Payload must be a number between 0 and 2)`
        );
      }
    },
    setLandmark1(state, { payload }: PayloadAction<CodeObject>) {
      const { code: landmarkCode } = payload;

      if (state.landmarkCount >= 1) {
        state.landmark1 = landmarkCode;
      } else {
        console.warn(
          "Invalid setLandmark1 action: Cannot set landmark 1 when landmark count less than 1"
        );
      }
    },
    setLandmark2(state, { payload }: PayloadAction<CodeObject>) {
      const { code: landmarkCode } = payload;

      if (state.landmarkCount >= 2) {
        state.landmark2 = landmarkCode;
      } else {
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
      reducer(state, { payload }: PayloadAction<SetHirelingPayload>) {
        const { number, hirelingEntry, factions } = payload;

        if (number >= 1 && number <= 3) {
          if (number === 1) state.hireling1 = hirelingEntry;
          if (number === 2) state.hireling2 = hirelingEntry;
          if (number === 3) state.hireling3 = hirelingEntry;
          state.excludedFactions.push(...factions);
        } else {
          console.warn(
            "Invalid payload for setHireling action:",
            payload,
            '("number" must be a number between 1 and 3)'
          );
        }
      },
    },
    clearExcludedFactions(state) {
      state.excludedFactions = [];
    },
  },
  extraReducers(builder) {
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
