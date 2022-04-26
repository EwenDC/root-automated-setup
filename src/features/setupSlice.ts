import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../components/store";
import { selectDeckArray, selectEnabledDecks } from "./deckSlice";
import {
  selectFactionCodeArray,
  selectEnabledInsurgentFactions,
  selectEnabledMilitantFactions,
  selectEnabledVagabondFactions,
  toggleFaction,
  selectFactionArray,
} from "./factionSlice";
import {
  selectEnabledFactionHirelings,
  selectHirelingArray,
  selectEnabledIndependentHirelings,
  toggleHireling,
  selectFactionHirelingArray,
} from "./hirelingSlice";
import {
  selectEnabledLandmarks,
  selectLandmarkArray,
  toggleLandmark,
} from "./landmarkSlice";
import { selectEnabledMaps } from "./mapSlice";
import { massComponentToggle, takeRandom } from "./reduxUtils";
import {
  ExpansionComponent,
  Faction,
  FactionEntry,
  Hireling,
  HirelingEntry,
  Landmark,
  MapComponent,
  SetupState,
  SetupStep,
  Vagabond,
  WithCode,
} from "../types";
import {
  incrementStep,
  selectFlowState,
  setStep,
  skipSteps,
} from "./flowSlice";
import { selectEnabledVagabonds } from "./vagabondSlice";

const initialState: SetupState = {
  playerCount: 4,
  fixedFirstPlayer: false,
  playerOrder: [],
  errorMessage: null,
  // Map
  map: null,
  useMapLandmark: false,
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
  factionPool: [],
  lastFactionLocked: false,
  currentPlayerIndex: 0,
  currentFactionIndex: null,
  currentFaction: null,
};

/** Returns the setup parameters from redux state */
export const selectSetupParameters = (state: RootState) => state.setup;

export const setupSlice = createSlice({
  name: "setup",
  initialState: initialState,
  reducers: {
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
    fixFirstPlayer: (state, action: PayloadAction<boolean>) => {
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
    enableMapLandmark: (state, action: PayloadAction<boolean>) => {
      state.useMapLandmark = action.payload;
    },
    setMap: (state, action: PayloadAction<WithCode<MapComponent>>) => {
      state.map = action.payload;
    },
    setDeck: (state, action: PayloadAction<WithCode<ExpansionComponent>>) => {
      state.deck = action.payload;
    },
    setLandmarkCount: (state, action: PayloadAction<number>) => {
      // We use === instead of >= or <= to ensure typescript can infer the correct payload type
      if (
        action.payload === 0 ||
        action.payload === 1 ||
        action.payload === 2
      ) {
        state.landmarkCount = action.payload;
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
    setHireling: {
      prepare: (
        number: number,
        hireling: WithCode<Hireling>,
        demoted: boolean
      ) => ({
        payload: {
          number,
          hireling,
          demoted,
        },
      }),
      reducer: (
        state,
        action: PayloadAction<{
          number: number;
          hireling: WithCode<Hireling>;
          demoted: boolean;
        }>
      ) => {
        if (action.payload.number >= 1 && action.payload.number <= 3) {
          const hireling: HirelingEntry = {
            ...action.payload.hireling,
            demoted: action.payload.demoted,
          };

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
    addToFactionPool: {
      prepare: (
        faction: WithCode<Faction>,
        vagabondPool: WithCode<Vagabond>[]
      ) => ({
        payload: {
          ...faction,
          vagabond: faction.isVagabond ? takeRandom(vagabondPool) : undefined,
        },
      }),
      reducer: (state, action: PayloadAction<FactionEntry>) => {
        // Ensure that the passed-in faction isn't part of the exclude pool
        if (state.excludedFactions.includes(action.payload.code)) {
          console.warn(
            `Invalid payload for addToFactionPool action: Payload field "code" cannot be contained within excludedFactions ${state.excludedFactions}`,
            action
          );
        } else if (action.payload.isVagabond && !action.payload.vagabond) {
          console.warn(
            'Invalid payload for addToFactionPool action: Payload field "vagabond" cannot be omited if "isVagabond" is true',
            action
          );
        } else {
          // Add to our pool, and set it to locked if insurgent
          state.factionPool.push(action.payload);
          state.lastFactionLocked = !action.payload.militant;
        }
      },
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
  clearFactionPool,
  addToFactionPool,
  setCurrentPlayerIndex,
  setCurrentFactionIndex,
  applyCurrentFactionIndex,
} = setupSlice.actions;
export default setupSlice.reducer;

/** Advances to the next step in setup, performing all validation logic and state changes required for each step */
export const nextStep = (): AppThunk => (dispatch, getState) => {
  // Retrieve our setup state
  const setupParameters = selectSetupParameters(getState());
  const flowState = selectFlowState(getState());
  let doIncrementStep = true;
  let validationError: string | null = null;

  // Handle any special logic that fires at the end of a step
  switch (flowState.currentStep) {
    case SetupStep.chooseExpansions:
      // After locking in the Choosen expansions, we need to calculate which steps can be skipped
      // Do we need to choose a deck?
      const decks = selectDeckArray(getState());
      if (decks.length === 1) {
        // Auto select the only deck
        dispatch(setDeck(decks[0]));
        dispatch(skipSteps(SetupStep.chooseDeck, true));
      } else {
        // Make sure we do the choose deck step
        dispatch(skipSteps(SetupStep.chooseDeck, false));
      }

      // Correct our current playercount if it is too low or high (this can occur with undo/redo)
      if (
        setupParameters.playerCount < 2 &&
        (flowState.skippedSteps[SetupStep.setUpBots] ?? false)
      ) {
        dispatch(setPlayerCount(2));
      } else {
        const maxPlayerCount = selectFactionCodeArray(getState()).length - 1;
        if (setupParameters.playerCount > maxPlayerCount) {
          dispatch(setPlayerCount(maxPlayerCount));
        }
      }

      // Are there any landmarks that can be set up?
      dispatch(
        skipSteps(
          [
            SetupStep.chooseLandmarks,
            SetupStep.setUpLandmark1,
            SetupStep.setUpLandmark2,
          ],
          selectLandmarkArray(getState()).length === 0
        )
      );

      // Are there any hirelings that can be set up?
      if (selectHirelingArray(getState()).length === 0) {
        // We must ensure all hireling setup is skipped
        dispatch(
          skipSteps(
            [
              SetupStep.chooseHirelings,
              SetupStep.setUpHireling1,
              SetupStep.setUpHireling2,
              SetupStep.setUpHireling3,
              SetupStep.postHirelingSetup,
            ],
            true
          )
        );
        // Clear the exlcude faction pool of any potential stale data from previous setups
        // We need to do this here since we're skipping the chooseHirelings step
        if (setupParameters.excludedFactions.length > 0)
          dispatch(clearExcludedFactions());
      } else {
        // By default we still skip the actual hireling setup, as per other optional components
        dispatch(skipSteps(SetupStep.chooseHirelings, false));
      }
      break;

    case SetupStep.chooseMap:
      // Get our list of maps which are avaliable for selection (copying the result so we don't alter the memoized list)
      let mapPool = [...selectEnabledMaps(getState())];

      // Check that there is even a map to be selected...
      if (mapPool.length > 0) {
        // Choose a random map
        const map = takeRandom(mapPool);
        dispatch(setMap(map));

        // Do the map landmark setup if we have one
        dispatch(
          skipSteps(
            SetupStep.setUpMapLandmark,
            !setupParameters.useMapLandmark || !map.landmark
          )
        );
      } else {
        // Invalid state, do not proceed
        doIncrementStep = false;
        validationError = "error.noMap";
      }
      break;

    case SetupStep.chooseDeck:
      // Get our list of decks which are avaliable for selection (copying the result so we don't alter the memoized list)
      let deckPool = [...selectEnabledDecks(getState())];

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

      // Ensure that any landmarks not supported at this player count or used by map setup are disabled
      dispatch(
        massComponentToggle(
          selectLandmarkArray,
          (landmark) =>
            landmark.minPlayers <= setupParameters.playerCount &&
            (!setupParameters.useMapLandmark ||
              setupParameters.map?.landmark !== landmark.code),
          toggleLandmark
        )
      );

      // Ensure that we include/exclude faction hirelings depending on if we can spare factions for hirelings at our player count
      dispatch(
        massComponentToggle(
          selectFactionHirelingArray,
          setupParameters.playerCount <
            selectFactionCodeArray(getState()).length - 1,
          toggleHireling
        )
      );
      break;

    case SetupStep.chooseLandmarks:
      // Get our list of landmarks which are avaliable for selection (copying the result so we don't alter the memoized list)
      let landmarkPool = [...selectEnabledLandmarks(getState())];

      // Check that there are enough enabled landmarks for how many we want to set up
      if (landmarkPool.length >= setupParameters.landmarkCount) {
        // Select the first landmark
        if (setupParameters.landmarkCount >= 1) {
          // Choose a random landmark
          dispatch(setLandmark1(takeRandom(landmarkPool)));

          // Select the second landmark
          if (setupParameters.landmarkCount >= 2) {
            // Choose a random landmark
            dispatch(setLandmark2(takeRandom(landmarkPool)));
            // Ensure we don't skip the setup steps
            dispatch(
              skipSteps(
                [SetupStep.setUpLandmark1, SetupStep.setUpLandmark2],
                false
              )
            );
          } else {
            // Handle skipping just the second landmark setup
            dispatch(skipSteps(SetupStep.setUpLandmark1, false));
            dispatch(skipSteps(SetupStep.setUpLandmark2, true));
          }
        } else {
          // We're not setting up any landmarks, so skip both setup steps
          dispatch(
            skipSteps(
              [SetupStep.setUpLandmark1, SetupStep.setUpLandmark2],
              true
            )
          );
        }
      } else {
        // Invalid state, do not proceed
        doIncrementStep = false;

        // Set the correct error message
        if (landmarkPool.length === 0) {
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
      if (!flowState.skippedSteps[SetupStep.setUpHireling1]) {
        // Get our lists of independent & faction hirelings which are avaliable for selection (copying the results so we don't alter the memoized lists)
        let hirelingPool = [...selectEnabledIndependentHirelings(getState())];
        let factionHirelings = [...selectEnabledFactionHirelings(getState())];

        // Calculate how many factions we can spare for hirelings (i.e. total factions minus setup faction count)
        const factionCodes = selectFactionCodeArray(getState());
        let spareFactionCount =
          factionCodes.length - (setupParameters.playerCount + 1);

        // If we can only spare 3 or less factions then limit the amount of faction hirelings
        if (spareFactionCount <= 3) {
          // Add a random sample of faction hirelings to our pool, ensuring that the random hireling draw will never exclude too many factions for setup
          while (spareFactionCount > 0 && factionHirelings.length > 0) {
            // Grab a random faction hireling
            let hireling = takeRandom(factionHirelings);
            // Calculate how many factions we will exclude by including it (based on what factions are actually in play)
            let excludeCount =
              hireling.factions.length > 1
                ? hireling.factions.filter((factionCode) =>
                    factionCodes.includes(factionCode)
                  ).length
                : 1;
            // Ensure that we don't exclude too many factions by addding this hireling (The Exile can cause this edge case)
            if (spareFactionCount - excludeCount >= 0) {
              hirelingPool.push(hireling);
              spareFactionCount -= excludeCount;
            }
          }
        } else {
          // There are enough spare factions that we can throw all faction hirelings into the mix
          hirelingPool = hirelingPool.concat(factionHirelings);
        }

        // Check that there are enough hirelings selected
        if (hirelingPool.length >= 3) {
          // Choose three random hirelings
          for (let number = 1; number <= 3; number++) {
            dispatch(
              setHireling(
                number,
                takeRandom(hirelingPool),
                setupParameters.playerCount + number > 5
              )
            );
          }
          // Disable the factions that are mutually exclusive with the selected hirelings
          const excludedFactions = selectSetupParameters(
            getState()
          ).excludedFactions;
          dispatch(
            massComponentToggle(
              selectFactionArray,
              (faction) => !excludedFactions.includes(faction.code),
              toggleFaction
            )
          );
        } else {
          // Invalid state, do not proceed
          doIncrementStep = false;
          validationError = "error.tooFewHireling";
        }
      }
      break;

    case SetupStep.chooseFactions:
      // Clear the faction pool of any potential stale data from previous setups
      if (setupParameters.factionPool.length > 0) dispatch(clearFactionPool());

      // Get our list of militant factions and vagabonds which are avaliable for selection (copying the results so we don't alter the memoized lists)
      let workingFactionPool = [...selectEnabledMilitantFactions(getState())];
      let vagabondPool = [...selectEnabledVagabonds(getState())];

      // Get our list of insurgent factions to be added to the working faction pool during setup
      const insurgentFactions = selectEnabledInsurgentFactions(getState());
      // Get our vagabond faction count to validate our vagabondPool against
      const vagabondFactionCount = selectEnabledVagabondFactions(
        getState()
      ).length;

      // Check that there are enough factions avaliable for setup
      if (
        workingFactionPool.length > 0 &&
        vagabondPool.length >= vagabondFactionCount &&
        workingFactionPool.length + insurgentFactions.length >=
          setupParameters.playerCount + 1
      ) {
        // Start by adding a random militant faction
        dispatch(
          addToFactionPool(takeRandom(workingFactionPool), vagabondPool)
        );
        // Add the insurgent factions to the mix
        workingFactionPool = workingFactionPool.concat(insurgentFactions);
        // Add enough factions to make the total pool playerCount + 1
        for (let i = 0; i < setupParameters.playerCount; i++) {
          dispatch(
            addToFactionPool(takeRandom(workingFactionPool), vagabondPool)
          );
        }

        // Begin the setup at the bottom of player order
        dispatch(setCurrentPlayerIndex(setupParameters.playerCount - 1));
      } else {
        // Invalid state, do not proceed
        doIncrementStep = false;

        // Set the correct error message
        if (workingFactionPool.length === 0) {
          validationError = "error.noMilitantFaction";
        } else if (vagabondPool.length < vagabondFactionCount) {
          validationError = "error.tooFewVagabond";
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
      const nextPlayer = setupParameters.currentPlayerIndex - 1;
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
