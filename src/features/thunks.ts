import { PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store";
import { SetupStep, Togglable, WithCode } from "../types";
import { toggleFaction, toggleHireling, toggleLandmark } from "./componentsSlice";
import {
  addToFactionPool,
  clearFactionPool,
  incrementStep,
  setCurrentFactionIndex,
  setCurrentPlayerIndex,
  setUseDraft,
  setVagabondPool,
  skipSteps,
} from "./flowSlice";
import {
  selectDeckArray,
  selectEnabledIndependentHirelings,
  selectEnabledInsurgentFactions,
  selectEnabledMilitantFactions,
  selectFactionArray,
  selectFactionCodes,
  selectFactionHirelings,
  selectHirelingArray,
  selectLandmarkArray,
  selectMapArray,
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
import { selectEnabled, takeRandom } from "./utils";

/**
 * Thunk action for mass updating the enable/disable state of multiple components, dispatching the minimum amount of actions to do so
 * @param selectComponentArray Selector for the list of components you wish to update
 * @param componentEnable Either a function returning the desired enable state for a given component, or a boolean which sets the enable state of all given components
 * @param toggleComponent Action creator for dispatching the toggle component action for the given components
 */
export const massComponentToggle =
  <T extends Togglable>(
    selectComponentArray: (state: RootState) => WithCode<T>[],
    componentEnable: boolean | ((component: WithCode<T>) => boolean),
    toggleComponent: (code: string, enabled?: boolean) => PayloadAction<any>
  ): AppThunk =>
  (dispatch, getState) => {
    selectComponentArray(getState()).forEach((component) => {
      // Calculate what the enable state of the component should be
      const shouldEnable =
        typeof componentEnable === "function" ? componentEnable(component) : componentEnable;
      // If the desired state does not match the actual state, fix it
      if (component.enabled !== shouldEnable) {
        dispatch(toggleComponent(component.code, shouldEnable));
      }
    });
  };

/** Advances to the next step in setup, performing all validation logic and state changes required for each step */
export const nextStep = (): AppThunk => (dispatch, getState) => {
  // Retrieve our setup state
  const { flow, setup } = getState();
  const { currentFactionIndex, currentStep, factionPool, skippedSteps, useDraft } = flow;
  let { errorMessage, excludedFactions, landmarkCount, fixedFirstPlayer, playerCount } = setup;
  let doIncrementStep = true;
  let validationError: string | null = null;

  // Handle any special logic that fires at the end of a step
  switch (currentStep) {
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
      if (playerCount < 2 && skippedSteps[SetupStep.setUpBots]) {
        dispatch(setPlayerCount(2));
      } else {
        const maxPlayerCount = selectFactionCodes(getState()).length - 1;
        if (playerCount > maxPlayerCount) {
          dispatch(setPlayerCount(maxPlayerCount));
        }
      }

      // Are there any landmarks that can be set up?
      dispatch(
        skipSteps(
          [SetupStep.chooseLandmarks, SetupStep.setUpLandmark1, SetupStep.setUpLandmark2],
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
        if (excludedFactions.length > 0) dispatch(clearExcludedFactions());
      } else {
        // By default we still skip the actual hireling setup, as per other optional components
        dispatch(skipSteps(SetupStep.chooseHirelings, false));
      }
      break;

    case SetupStep.seatPlayers:
      let firstPlayer: number;

      // Do we need to randomise the first player
      if (fixedFirstPlayer) {
        // First player is always "1" as the player number represents turn order
        firstPlayer = 1;
      } else {
        // Randomly pick a first player between 1 and playerCount, as the player number represents table seating order
        firstPlayer = Math.floor(Math.random() * playerCount) + 1;
      }
      dispatch(setFirstPlayer(firstPlayer));

      const includedFactions = selectFactionCodes(getState()).length;

      // Ensure that we include/exclude faction hirelings depending on if we can spare factions for hirelings at our player count
      dispatch(
        massComponentToggle(selectFactionHirelings, playerCount < includedFactions, toggleHireling)
      );

      // Don't allow draft setup if we can't spare an extra faction
      if (playerCount === includedFactions) dispatch(setUseDraft(false));
      break;

    case SetupStep.chooseMap:
      // Get our list of maps which are avaliable for selection
      let mapPool = selectEnabled(selectMapArray(getState()));

      // Check that there is even a map to be selected...
      if (mapPool.length > 0) {
        // Choose a random map
        const map = takeRandom(mapPool);
        dispatch(setMap(map));

        // Ensure that any landmarks not supported at this player count or used by map setup are disabled
        dispatch(
          massComponentToggle(
            selectLandmarkArray,
            (landmark) =>
              landmark.minPlayers <= playerCount &&
              (!map.useLandmark || !map.landmark || map.landmark.code !== landmark.code),
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
      if (landmarkPool.length >= landmarkCount) {
        // Select the first landmark
        if (landmarkCount >= 1) {
          // Choose a random landmark
          dispatch(setLandmark1(takeRandom(landmarkPool)));

          // Select the second landmark
          if (landmarkCount >= 2) {
            // Choose a random landmark
            dispatch(setLandmark2(takeRandom(landmarkPool)));
            // Ensure we don't skip the setup steps
            dispatch(skipSteps([SetupStep.setUpLandmark1, SetupStep.setUpLandmark2], false));
          } else {
            // Handle skipping just the second landmark setup
            dispatch(skipSteps(SetupStep.setUpLandmark1, false));
            dispatch(skipSteps(SetupStep.setUpLandmark2, true));
          }
        } else {
          // We're not setting up any landmarks, so skip both setup steps
          dispatch(skipSteps([SetupStep.setUpLandmark1, SetupStep.setUpLandmark2], true));
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
      if (excludedFactions.length > 0) dispatch(clearExcludedFactions());

      // Did we skip the hireling setup?
      if (!skippedSteps[SetupStep.setUpHireling1]) {
        // Get our lists of independent & faction hirelings which are avaliable for selection
        let hirelingPool = selectEnabledIndependentHirelings(getState());
        let factionHirelings = selectEnabled(selectFactionHirelings(getState()));

        // Calculate how many factions we can spare for hirelings (i.e. total factions minus setup faction count)
        const factionCodes = selectFactionCodes(getState());
        let spareFactionCount = factionCodes.length - (playerCount + 1);

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
                  hireling.factions.filter((factionCode) => factionCodes.includes(factionCode))
                    .length
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
            dispatch(setHireling(number, takeRandom(hirelingPool), playerCount + number > 5));
          }
        } else {
          // Invalid state, do not proceed
          doIncrementStep = false;
          validationError = "error.tooFewHireling";
        }
      }

      // Disable the factions that are mutually exclusive with the selected hirelings
      // Also disable insurgent factions if we're only playing with 2 people and no bots or hirelings
      excludedFactions = getState().setup.excludedFactions;
      dispatch(
        massComponentToggle(
          selectFactionArray,
          (faction) =>
            !excludedFactions.includes(faction.code) &&
            (playerCount > 2 ||
              faction.militant ||
              !skippedSteps[SetupStep.setUpHireling1] ||
              !skippedSteps[SetupStep.setUpBots]),
          toggleFaction
        )
      );
      break;

    case SetupStep.chooseFactions:
      // Clear the faction pool of any potential stale data from previous setups
      if (factionPool.length > 0) dispatch(clearFactionPool());

      // Get our list of militant and insurgent factions which are avaliable for selection
      let workingFactionPool = selectEnabledMilitantFactions(getState());
      const insurgentFactions = selectEnabledInsurgentFactions(getState());

      // Validate and set up the vagabond pool for draft setup
      if (useDraft) {
        let vagabondPool = selectEnabled(selectVagabondArray(getState()));
        // Get our vagabond faction count to validate our vagabondPool against
        const vagabondFactionCount = workingFactionPool
          .concat(insurgentFactions)
          .reduce((count, { isVagabond }) => (isVagabond ? count + 1 : count), 0);

        if (vagabondPool.length >= vagabondFactionCount) {
          dispatch(setVagabondPool(vagabondPool));
        } else {
          doIncrementStep = false;
          validationError = "error.tooFewVagabond";
          break;
        }
      }

      // Set the appropriate number of factions for setup
      const factionCount = useDraft ? playerCount + 1 : playerCount;

      // Check that there are enough factions avaliable for setup
      if (
        workingFactionPool.length > 0 &&
        workingFactionPool.length + insurgentFactions.length >= factionCount
      ) {
        // Start by adding a random militant faction
        dispatch(addToFactionPool(takeRandom(workingFactionPool)));
        // Add the insurgent factions to the mix
        workingFactionPool = workingFactionPool.concat(insurgentFactions);
        // Add enough factions to make the total pool equal factionCount
        for (let i = 1; i < factionCount; i++) {
          dispatch(addToFactionPool(takeRandom(workingFactionPool)));
        }
        // For draft setup, begin the setup at the bottom of player order
        if (useDraft) dispatch(setCurrentPlayerIndex(playerCount - 1));
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
      if (useDraft) {
        // Ensure the user has actually selected a faction
        if (currentFactionIndex == null) {
          doIncrementStep = false;
          validationError = "error.noFaction";
        }
      } else {
        // Clear any selected faction as it's not used for standard setup
        dispatch(setCurrentFactionIndex(null));
      }
      break;

    case SetupStep.setupEnd:
      // This is the final step, so don't try to increment
      doIncrementStep = false;
      break;
  }

  // Set the error message if it's changed
  if (errorMessage !== validationError) {
    dispatch(setErrorMessage(validationError));
  }

  // Increment the step if we're still flagged to do so
  if (doIncrementStep) {
    dispatch(incrementStep());
  }
};
