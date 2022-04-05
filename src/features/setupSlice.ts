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
  selectLandmarkArray,
  toggleLandmark,
} from "./landmarkSlice";
import { MapComponent, selectEnabledMaps } from "./mapSlice";
import { takeRandom, WithCode } from "./reduxUtils";

export enum SetupStep {
  chooseExpansions,
  chooseMap,
  setUpMap,
  setUpMapLandmark,
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
  playerOrder: number[];
  errorMessage: string | null;
  // Map
  map: WithCode<MapComponent> | null;
  usePrintedSuits: boolean;
  useMapLandmark: boolean;
  // Deck
  deck: Deck | null;
  // Landmarks
  landmarkCount: 0 | 1 | 2;
  landmark1: WithCode<Landmark> | null;
  landmark2: WithCode<Landmark> | null;
  // Hirelings
  hireling1: HirelingEntry | null;
  hireling2: HirelingEntry | null;
  hireling3: HirelingEntry | null;
  // Factions
  excludedFactions: string[];
  factionPool: WithCode<Faction>[];
  lastFactionLocked: boolean;
  currentPlayerIndex: number;
  currentFactionIndex: number | null;
  currentFaction: Faction | null;
}

const initialState: SetupState = {
  currentStep: SetupStep.chooseExpansions,
  skippedSteps: new Map(),
  playerCount: 4,
  fixedFirstPlayer: false,
  playerOrder: [],
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
  currentPlayerIndex: 0,
  currentFactionIndex: null,
  currentFaction: null,
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
      // Make sure the player count is valid (i.e. above 0)
      if (action.payload >= 1) {
        state.playerCount = action.payload;
      } else {
        console.warn(
          "Invalid payload for setPlayerCount action: Payload must be a number above 0",
          action
        );
      }
    },
    fixedFirstPlayer: (state, action: PayloadAction<boolean>) => {
      state.fixedFirstPlayer = action.payload;
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
      } else {
        console.warn(
          `Invalid payload for setFirstPlayer action: Payload must be a number between 1 and playerCount (${state.playerCount})`,
          action
        );
      }
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
    setMap: (state, action: PayloadAction<WithCode<MapComponent>>) => {
      state.map = action.payload;
    },
    setDeck: (state, action: PayloadAction<Deck>) => {
      state.deck = action.payload;
    },
    setLandmarkCount: (state, action: PayloadAction<number>) => {
      // We use === instead of >= or <= to ensure typescript can infer the correct payload type
      if (
        action.payload === 0 ||
        action.payload === 1 ||
        action.payload === 2
      ) {
        if (
          action.payload === 2 &&
          state.useMapLandmark &&
          state.map?.landmark
        ) {
          console.warn(
            "Invalid payload for setLandmarkCount action: Payload cannot be 2 when useMapLandmark is true and there is a map landmark",
            action
          );
        } else {
          state.landmarkCount = action.payload;
        }
      } else {
        console.warn(
          "Invalid payload for setLandmarkCount action: Payload must be a number between 0 and 2",
          action
        );
      }
    },
    setLandmark1: (state, action: PayloadAction<WithCode<Landmark>>) => {
      if (state.landmarkCount < 1) {
        console.warn(
          "Invalid setLandmark1 action: Cannot set landmark 1 when landmark count less than 1",
          action
        );
      } else if (
        state.useMapLandmark &&
        state.map?.landmark === action.payload.code
      ) {
        console.warn(
          "Invalid payload for setLandmark1 action: Payload cannot be the map landmark when useMapLandmark is true",
          action
        );
      } else {
        state.landmark1 = action.payload;
      }
    },
    setLandmark2: (state, action: PayloadAction<WithCode<Landmark>>) => {
      if (state.landmarkCount < 2) {
        console.warn(
          "Invalid setLandmark2 action: Cannot set landmark 2 when landmark count less than 2",
          action
        );
      } else if (
        state.useMapLandmark &&
        state.map?.landmark === action.payload.code
      ) {
        console.warn(
          "Invalid payload for setLandmark2 action: Payload cannot be the map landmark when useMapLandmark is true",
          action
        );
      } else {
        state.landmark2 = action.payload;
      }
    },
    setHireling: (state, action: PayloadAction<SetHirelingInput>) => {
      if (action.payload.number >= 1 && action.payload.number <= 3) {
        const hireling: HirelingEntry = action.payload.promoted
          ? { ...action.payload.hireling.promoted, promoted: true }
          : { ...action.payload.hireling.demoted, promoted: false };

        if (action.payload.number === 1) state.hireling1 = hireling;
        if (action.payload.number === 2) state.hireling2 = hireling;
        if (action.payload.number === 3) state.hireling3 = hireling;

        state.excludedFactions.push(...action.payload.hireling.factions);
      } else {
        console.warn(
          'Invalid payload for setHireling action: Payload field "number" must be a number between 1 and 3',
          action
        );
      }
    },
    clearExcludedFactions: (state) => {
      state.excludedFactions = [];
    },
    clearFactionPool: (state) => {
      state.factionPool = [];
      state.lastFactionLocked = false;
      state.currentFactionIndex = null;
      state.currentFaction = null;
    },
    addToFactionPool: (state, action: PayloadAction<WithCode<Faction>>) => {
      // Ensure that the passed-in faction isn't part of the exclude pool
      if (state.excludedFactions.includes(action.payload.code)) {
        console.warn(
          `Invalid payload for addToFactionPool action: Payload field "code" cannot be contained within excludedFactions ${state.excludedFactions}`,
          action
        );
      } else {
        // Add to our pool, and set it to locked if insurgent
        state.factionPool.push(action.payload);
        state.lastFactionLocked = !action.payload.militant;
      }
    },
    setCurrentPlayerIndex: (state, action: PayloadAction<number>) => {
      if (action.payload >= 0 && action.payload < state.playerCount) {
        state.currentPlayerIndex = action.payload;
      } else {
        console.warn(
          `Invalid payload for setCurrentPlayerIndex action: Payload must be a number larger than or equal to 0 but smaller than the player count (${state.playerCount})`,
          action
        );
      }
    },
    setCurrentFactionIndex: (state, action: PayloadAction<number>) => {
      if (action.payload >= 0 && action.payload < state.factionPool.length) {
        state.currentFactionIndex = action.payload;
      } else {
        console.warn(
          `Invalid payload for setCurrentFactionIndex action: Payload must be a number larger than or equal to 0 but smaller than the faction pool length (${state.factionPool.length})`,
          action
        );
      }
    },
    applyCurrentFactionIndex: (state, action: PayloadAction) => {
      // Select the faction if it's in our pool and not locked
      if (state.currentFactionIndex == null) {
        console.warn(
          "Invalid applyCurrentFactionIndex action: currentFactionIndex is null",
          action
        );
      } else if (
        state.currentFactionIndex === state.factionPool.length - 1 &&
        state.lastFactionLocked
      ) {
        console.warn(
          `Invalid applyCurrentFactionIndex action: Cannot apply index ${state.currentFactionIndex} when lastFactionLocked is true`,
          action
        );
      } else {
        // Save the faction at currentFactionIndex
        state.currentFaction = state.factionPool[state.currentFactionIndex];
        // Clear the lock if we're selecting a militant faction
        if (state.currentFaction.militant) state.lastFactionLocked = false;
        // Delete 1 element starting at chosen index
        state.factionPool.splice(state.currentFactionIndex, 1);
        // Reset the index
        state.currentFactionIndex = null;
      }
    },
  },
});

export const {
  setStep,
  incrementStep,
  skipSteps,
  setPlayerCount,
  fixedFirstPlayer,
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
  setCurrentPlayerIndex,
  setCurrentFactionIndex,
  applyCurrentFactionIndex,
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

        // Do the map landmark setup if we have one
        if (setupParameters.useMapLandmark && map.landmark) {
          dispatch(
            skipSteps({ steps: [SetupStep.setUpMapLandmark], skip: false })
          );
          dispatch(toggleLandmark({ code: map.landmark, enabled: false }));
        } else {
          dispatch(
            skipSteps({ steps: [SetupStep.setUpMapLandmark], skip: true })
          );
        }
      } else {
        // Invalid state, do not proceed
        doIncrementStep = false;
        validationError = "error.noMap";
      }
      break;

    case SetupStep.seatPlayers:
      let firstPlayer: number;
      // Do we need to randomise the first player
      if (setupParameters.fixedFirstPlayer) {
        // First player is always "1" as the player number represents turn order
        firstPlayer = 1;
      } else {
        // Randomly pick a first player between 1 and playerCount, as the player number represents table seating order
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
        // Select the first landmark
        if (setupParameters.landmarkCount >= 1) {
          // Choose a random landmark
          dispatch(setLandmark1(takeRandom(LandmarkPool)));

          // Select the second landmark
          if (setupParameters.landmarkCount >= 2) {
            // Choose a random landmark
            dispatch(setLandmark2(takeRandom(LandmarkPool)));
          } else {
            // Handle skipping just the second landmark setup
            dispatch(
              skipSteps({ steps: [SetupStep.setUpLandmark2], skip: true })
            );
          }
        } else {
          // We're not setting up any landmarks, so skip both setup steps
          dispatch(
            skipSteps({
              steps: [SetupStep.setUpLandmark1, SetupStep.setUpLandmark2],
              skip: true,
            })
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
      // Clear the exclude faction pool of any potential stale data from previous hireling setups
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

        // Begin the setup at the bottom of player order
        dispatch(setCurrentPlayerIndex(setupParameters.playerCount - 1));
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
      // Ensure the user has actually selected a faction and that it isn't the locked final insurgent faction
      if (
        setupParameters.currentFactionIndex != null &&
        (setupParameters.currentFactionIndex <
          setupParameters.factionPool.length - 1 ||
          !setupParameters.lastFactionLocked)
      ) {
        dispatch(applyCurrentFactionIndex());
      } else {
        doIncrementStep = false;

        if (setupParameters.currentFactionIndex == null) {
          validationError = "error.noFaction";
        } else {
          validationError = "error.lockedFaction";
        }
      }
      break;

    case SetupStep.setUpFaction:
      // Now that we're done for setting up this player, move on to the next one
      let nextPlayer = setupParameters.currentPlayerIndex - 1;
      // Jump back to the selectFaction step if we haven't run out of players
      if (nextPlayer >= 0) {
        doIncrementStep = false;
        dispatch(setCurrentPlayerIndex(nextPlayer));
        dispatch(setStep(SetupStep.selectFaction));
      }
      // If we have run out of players, automatically proceed to next step
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

export default undoable(setupSlice.reducer, { groupBy: setupGroupBy });
