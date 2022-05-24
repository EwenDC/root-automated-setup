import { PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../components/store";
import { GameComponent, SetupStep, WithCode } from "../types";
import { disableExpansion, enableExpansion } from "./expansionSlice";
import { toggleFaction } from "./factionSlice";
import {
  addToFactionPool,
  clearFactionPool,
  incrementStep,
  setCurrentPlayerIndex,
  skipSteps,
} from "./flowSlice";
import { toggleHireling } from "./hirelingSlice";
import { toggleLandmark } from "./landmarkSlice";
import {
  selectDeckArray,
  selectEnabled,
  selectEnabledIndependentHirelings,
  selectEnabledInsurgentFactions,
  selectEnabledMilitantFactions,
  selectEnabledVagabondFactions,
  selectExpansion,
  selectFactionArray,
  selectFactionCodeArray,
  selectFactionHirelingArray,
  selectFlowState,
  selectHirelingArray,
  selectLandmarkArray,
  selectMapArray,
  selectSetupParameters,
  selectVagabondArray,
} from "./selectors";
import {
  clearExcludedFactions,
  setDeck,
  setErrorMessage,
  setFirstPlayer,
  setHireling,
  setLandmark1,
  setLandmark2,
  setMap,
  setPlayerCount,
} from "./setupSlice";
import { takeRandom } from "./utils";

/** Thunk for toggling an expansion, dispatching either the enableExpansion or disableExpansion action */
export const toggleExpansion =
  (expansionCode: string): AppThunk =>
  (dispatch, getState) => {
    // Retreive the expansion (may return undefined if code does not exist)
    const expansion = selectExpansion(getState(), expansionCode);
    // Only update the expansion state if it exists and is not the base game
    if (expansion != null && !expansion.base) {
      // Dispatch action to invert current state. We need to do this so all slices can react to the expansion state change
      if (expansion.enabled) {
        dispatch(disableExpansion(expansionCode));
      } else {
        dispatch(enableExpansion(expansionCode));
      }
    }
  };

/**
 * Thunk action for mass updating the enable/disable state of multiple components, dispatching the minimum amount of actions to do so
 * @param selectComponentArray Selector for the list of components you wish to update
 * @param componentEnable Either a function returning the desired enable state for a given component, or a boolean which sets the enable state of all given components
 * @param toggleComponent Action creator for dispatching the toggle component action for the given components
 */
export const massComponentToggle =
  <T extends GameComponent>(
    selectComponentArray: (state: RootState) => WithCode<T>[],
    componentEnable: boolean | ((component: WithCode<T>) => boolean),
    toggleComponent: (
      code: string,
      enabled?: boolean
    ) => PayloadAction<{ code: string; enabled?: boolean }>
  ): AppThunk =>
  (dispatch, getState) => {
    selectComponentArray(getState()).forEach((component) => {
      // Calculate what the enable state of the component should be
      const shouldEnable =
        typeof componentEnable === "function"
          ? componentEnable(component)
          : componentEnable;
      // If the desired state does not match the actual state, fix it
      if (component.enabled !== shouldEnable) {
        dispatch(toggleComponent(component.code, shouldEnable));
      }
    });
  };

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

    case SetupStep.chooseMap:
      // Get our list of maps which are avaliable for selection
      let mapPool = selectEnabled(selectMapArray(getState()));

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

        // Ensure that any landmarks not supported at this player count or used by map setup are disabled
        dispatch(
          massComponentToggle(
            selectLandmarkArray,
            (landmark) =>
              landmark.minPlayers <= setupParameters.playerCount &&
              (!setupParameters.useMapLandmark ||
                map.landmark !== landmark.code),
            toggleLandmark
          )
        );
      } else {
        // Invalid state, do not proceed
        doIncrementStep = false;
        validationError = "error.noMap";
      }
      break;

    case SetupStep.chooseDeck:
      // Get our list of decks which are avaliable for selection
      let deckPool = selectEnabled(selectDeckArray(getState()));

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

    case SetupStep.chooseLandmarks:
      // Get our list of landmarks which are avaliable for selection
      let landmarkPool = selectEnabled(selectLandmarkArray(getState()));

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
        // Get our lists of independent & faction hirelings which are avaliable for selection
        let hirelingPool = selectEnabledIndependentHirelings(getState());
        let factionHirelings = selectEnabled(
          selectFactionHirelingArray(getState())
        );

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

      // Disable the factions that are mutually exclusive with the selected hirelings
      // Also disable insurgent factions if we're only playing with 2 people and no bots or hirelings
      const excludedFactions = selectSetupParameters(
        getState()
      ).excludedFactions;
      dispatch(
        massComponentToggle(
          selectFactionArray,
          (faction) =>
            !excludedFactions.includes(faction.code) &&
            (setupParameters.playerCount > 2 ||
              faction.militant ||
              !flowState.skippedSteps[SetupStep.setUpHireling1] ||
              !flowState.skippedSteps[SetupStep.setUpBots]),
          toggleFaction
        )
      );
      break;

    case SetupStep.chooseFactions:
      // Clear the faction pool of any potential stale data from previous setups
      if (flowState.factionPool.length > 0) dispatch(clearFactionPool());

      // Get our list of militant factions and vagabonds which are avaliable for selection
      let workingFactionPool = selectEnabledMilitantFactions(getState());
      let vagabondPool = selectEnabled(selectVagabondArray(getState()));

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
