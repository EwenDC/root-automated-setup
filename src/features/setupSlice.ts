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
  Hireling,
  HirelingEntry,
  Landmark,
  MapComponent,
  SetupState,
  SetupStep,
  WithCode,
} from "../types";
import {
  addToFactionPool,
  clearFactionPool,
  incrementStep,
  selectFlowState,
  setCurrentPlayerIndex,
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

/** Returns the setup parameters from redux state */
export const selectSetupParameters = (state: RootState) => state.setup;

/** Returns the object for the map selected in setup */
export const selectSetupMap = (state: RootState) =>
  state.setup.map != null
    ? { ...state.map[state.setup.map], code: state.setup.map }
    : null;

/** Returns the object for the deck selected in setup */
export const selectSetupDeck = (state: RootState) =>
  state.setup.deck != null
    ? { ...state.deck[state.setup.deck], code: state.setup.deck }
    : null;

/** Returns the object for the first landmark selected in setup */
export const selectSetupLandmark1 = (state: RootState) =>
  state.setup.landmark1 != null
    ? {
        ...state.landmark[state.setup.landmark1],
        code: state.setup.landmark1,
      }
    : null;

/** Returns the object for the second landmark selected in setup */
export const selectSetupLandmark2 = (state: RootState) =>
  state.setup.landmark2 != null
    ? {
        ...state.landmark[state.setup.landmark2],
        code: state.setup.landmark2,
      }
    : null;

/** Returns the object for the first hireling selected in setup */
export const selectSetupHireling1 = (state: RootState) =>
  state.setup.hireling1 != null
    ? {
        ...state.hireling[state.setup.hireling1.code],
        ...state.setup.hireling1,
      }
    : null;

/** Returns the object for the second hireling selected in setup */
export const selectSetupHireling2 = (state: RootState) =>
  state.setup.hireling2 != null
    ? {
        ...state.hireling[state.setup.hireling2.code],
        ...state.setup.hireling2,
      }
    : null;

/** Returns the object for the third hireling selected in setup */
export const selectSetupHireling3 = (state: RootState) =>
  state.setup.hireling3 != null
    ? {
        ...state.hireling[state.setup.hireling3.code],
        ...state.setup.hireling3,
      }
    : null;

export const setupSlice = createSlice({
  name: "setup",
  initialState: initialState,
  reducers: {
    setPlayerCount: (state, action: PayloadAction<number>) => {
      // Make sure the player count is valid (i.e. above 0)
      if (action.payload >= 1) {
        state.playerCount = action.payload;
        state.errorMessage = null;
      } else {
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
      } else {
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
        } else {
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
        } else {
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
        flowState.skippedSteps[SetupStep.setUpBots]
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
      const map = selectSetupMap(getState());
      dispatch(
        massComponentToggle(
          selectLandmarkArray,
          (landmark) =>
            landmark.minPlayers <= setupParameters.playerCount &&
            (!setupParameters.useMapLandmark ||
              map?.landmark !== landmark.code),
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

      // Disable insurgent factions if we're only playing with 2 people and no bots or hirelings
      dispatch(
        massComponentToggle(
          selectFactionArray,
          (faction) =>
            setupParameters.playerCount > 2 ||
            faction.militant ||
            !flowState.skippedSteps[SetupStep.setUpHireling1] ||
            !flowState.skippedSteps[SetupStep.setUpBots],
          toggleFaction
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
      let excludedFactionsUpdated = false;

      // Clear the exclude faction pool of any potential stale data from previous hireling setups
      if (setupParameters.excludedFactions.length > 0) {
        dispatch(clearExcludedFactions());
        // Flag the update to the excluded factions so we can re-enable any disabled ones if we skip hireling setup
        excludedFactionsUpdated = true;
      }

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
                ? // Make sure we only count the factions that are actually in play
                  hireling.factions.filter((factionCode) =>
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
          // Flag the update to the excluded factions so we can disable them later
          excludedFactionsUpdated = true;

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
        } else {
          // Invalid state, do not proceed
          doIncrementStep = false;
          validationError = "error.tooFewHireling";
        }
      }

      if (excludedFactionsUpdated) {
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
      }
      break;

    case SetupStep.chooseFactions:
      // Clear the faction pool of any potential stale data from previous setups
      if (flowState.factionPool.length > 0) dispatch(clearFactionPool());

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
      // Ensure the user has actually selected a faction
      if (flowState.currentFactionIndex == null) {
        doIncrementStep = false;
        validationError = "error.noFaction";
      }
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
