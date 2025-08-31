import type { UnknownAction } from '@reduxjs/toolkit'

import type { AppThunk, RootState } from '../store'
import type { FactionCode, Togglable, WithCode } from '../types'

import { CAPTAIN_DEAL_COUNT, MAX_CORNER_SETUPS, MIN_PLAYERS_NO_FLOOD } from '../constants'
import { countMatches, getEnabled } from '../functions/filtering'
import { type SetupClearing, solveMapBalanced, solveMapRandom } from '../functions/mapSolvers'
import { takeRandom } from '../functions/random'
import { SetupStep } from '../types'
import {
  lockFaction,
  lockHireling,
  lockLandmark,
  lockMap,
  selectCaptainArray,
  selectDeckArray,
  selectFactionArray,
  selectFactionCodes,
  selectHirelingArray,
  selectLandmarkArray,
  selectMapArray,
  selectVagabondArray,
  toggleCaptain,
  toggleVagabond,
} from './slices/components'
import {
  addToFactionPool,
  clearFactionPool,
  incrementStep,
  setCaptainPool,
  setCurrentFactionIndex,
  setCurrentPlayerIndex,
  setUseDraft,
  setVagabondPool,
  skipSteps,
} from './slices/flow'
import {
  clearExcludedFactions,
  setClearings,
  setDeck,
  setErrorMessage,
  setFirstPlayer,
  setHireling,
  setLandmark1,
  setLandmark2,
  setLimitCaptains,
  setLimitVagabonds,
  setMap,
  setPlayerCount,
} from './slices/setup'

/**
 * Thunk action for toggling all unlocked components of a type, ensuring they match the desired
 * enable state.
 *
 * @param selectComponentArray Selector for the list of components you wish to toggle.
 * @param enabled What enable state you wish for all of the unlocked components in the array to
 *   have.
 * @param toggleComponent Action creator for dispatching the toggle component action for the given
 *   components.
 */
export const massComponentToggle =
  <T extends Togglable>(
    selectComponentArray: (state: RootState) => WithCode<T>[],
    enabled: boolean,
    toggleComponent: (code: string) => AppThunk | UnknownAction,
  ): AppThunk =>
  (dispatch, getState) => {
    selectComponentArray(getState()).forEach(component => {
      // If the component is not locked and does not match the desired enable state, then toggle it
      if (!component.locked && component.enabled !== enabled) {
        dispatch(toggleComponent(component.code))
      }
    })
  }

/**
 * Thunk action for (un)locking multiple components at a time, dispatching the minimum amount of
 * actions to do so.
 *
 * @param selectComponentArray Selector for the list of components you wish to update.
 * @param componentLock A function returning the lock state for a given component.
 * @param lockComponent Action creator for dispatching the lock component action for the given
 *   components.
 */
export const massComponentLock =
  <T extends Togglable>(
    selectComponentArray: (state: RootState) => WithCode<T>[],
    componentLock: (component: WithCode<T>) => false | string,
    lockComponent: (code: string, locked: false | string) => AppThunk | UnknownAction,
  ): AppThunk =>
  (dispatch, getState) => {
    selectComponentArray(getState()).forEach(component => {
      // Calculate what the locked state of the component should be
      const locked = componentLock(component)
      // If the desired state does not match the actual state, fix it
      if (component.locked !== locked) {
        dispatch(lockComponent(component.code, locked))
      }
    })
  }

/**
 * Advances to the next step in setup, performing all validation logic and state changes required
 * for each step.
 */
export const nextStep = (): AppThunk => (dispatch, getState) => {
  // Retrieve our setup state
  const state = getState()
  const { currentFactionIndex, currentStep, factionPool, skippedSteps, useDraft } = state.flow
  let { excludedFactions, landmarkCount, fixedFirstPlayer, playerCount } = state.setup
  let doIncrementStep = true
  let validationError: string | null = null

  // Handle any special logic that fires at the end of a step
  switch (currentStep) {
    ///////////////////////
    // CHOOSE EXPANSIONS //
    ///////////////////////
    case SetupStep.chooseExpansions: {
      // We need to validate if we have enough components for setup, since it's *technically*
      // possible to play without the base game (using the Homeland expansion)

      // Is there at least one faction?
      if (selectFactionArray(state).length < 1) {
        validationError = 'error.missingFaction'
        break
      }

      // Is there at least one map?
      if (selectMapArray(state).length < 1) {
        validationError = 'error.missingMap'
        break
      }

      // Do we need to choose a deck?
      const decks = selectDeckArray(state)
      if (decks.length < 1) {
        validationError = 'error.missingDeck'
        break
      } else if (decks.length === 1) {
        // Auto select the only deck
        dispatch(setDeck(decks[0]!))
        dispatch(skipSteps(SetupStep.chooseDeck, true))
      } else {
        // Make sure we do the choose deck step
        dispatch(skipSteps(SetupStep.chooseDeck, false))
      }

      // Correct our current player count if it is too low or high (this can occur with undo/redo)
      if (playerCount < 2 && skippedSteps[SetupStep.setUpBots]) {
        dispatch(setPlayerCount(2))
      } else {
        const maxPlayerCount = selectFactionArray(state).length
        if (playerCount > maxPlayerCount) {
          dispatch(setPlayerCount(maxPlayerCount))
        }
      }

      // Exclude maps that don't support bots (if we wish to do bot setup)
      dispatch(
        massComponentLock(
          selectMapArray,
          ({ botPriorities }) =>
            !skippedSteps[SetupStep.setUpBots] && !botPriorities && 'error.mapBotsUnsupported',
          lockMap,
        ),
      )

      // Are there any landmarks that can be set up?
      dispatch(
        skipSteps(
          [SetupStep.chooseLandmarks, SetupStep.setUpLandmark1, SetupStep.setUpLandmark2],
          selectLandmarkArray(state).length === 0,
        ),
      )

      // Are there any hirelings that can be set up?
      if (selectHirelingArray(state).length === 0) {
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
            true,
          ),
        )
        // Clear the exclude faction pool of any potential stale data from previous setups
        // We need to do this here since we're skipping the chooseHirelings step
        if (excludedFactions.length > 0) dispatch(clearExcludedFactions())
      } else {
        // By default we still skip the actual hireling setup, as per other optional components
        dispatch(skipSteps(SetupStep.chooseHirelings, false))
      }

      // Set limitVagabonds based on whether we previously limited the vagabond selection
      dispatch(setLimitVagabonds(selectVagabondArray(state).some(vagabond => !vagabond.enabled)))

      // Set limitCaptains based on whether we previously limited the captain selection
      dispatch(setLimitCaptains(selectCaptainArray(state).some(captain => !captain.enabled)))
      break
    }

    //////////////////
    // SEAT PLAYERS //
    //////////////////
    case SetupStep.seatPlayers: {
      let firstPlayer: number

      // Do we need to randomize the first player
      if (fixedFirstPlayer) {
        // First player is always "1" as the player number represents turn order
        firstPlayer = 1
      } else {
        // Randomly pick a first player between 1 and playerCount, as the player number represents table seating order
        firstPlayer = Math.floor(Math.random() * playerCount) + 1
      }
      dispatch(setFirstPlayer(firstPlayer))

      const factionCodes = selectFactionCodes(state)
      const noSpareFactions = playerCount >= factionCodes.size

      // Ensure that we include/exclude faction hirelings depending on if we can spare factions for hirelings at our player count
      dispatch(
        massComponentLock(
          selectHirelingArray,
          ({ excludeFactions }) =>
            // Are we at the max player count (i.e. there are no factions to spare for an equivalent hireling)?
            noSpareFactions &&
            // Is this hireling one of the faction equivalents?
            excludeFactions?.some(faction => factionCodes.has(faction))
              ? 'error.factionHirelingExcluded'
              : false,
          lockHireling,
        ),
      )

      // Don't allow draft setup if we can't spare an extra faction
      if (noSpareFactions) dispatch(setUseDraft(false))
      break
    }

    ////////////////
    // CHOOSE MAP //
    ////////////////
    case SetupStep.chooseMap: {
      // Get our list of maps which are available for selection
      const mapPool = getEnabled(selectMapArray(state))

      // Check that there is even a map to be selected...
      if (mapPool.length > 0) {
        // Choose a random map
        const map = takeRandom(mapPool)
        dispatch(setMap(map))

        // Assign the map suits based on player preferences
        const floodClearings = playerCount < MIN_PLAYERS_NO_FLOOD
        let clearings: SetupClearing[]
        if (map.fixedSuits && map.defaultSuits) {
          clearings = map.clearings.map((clearing, index) => ({
            ...clearing,
            suit: map.defaultSuits![index]!,
          }))
        } else if (state.setup.balancedSuits) {
          clearings = solveMapBalanced(map, floodClearings)
        } else {
          clearings = solveMapRandom(map, floodClearings)
        }
        dispatch(setClearings(clearings))

        // Ensure that any landmarks not supported at this player count or used by map setup are disabled
        dispatch(
          massComponentLock(
            selectLandmarkArray,
            ({ code, minPlayers }) => {
              // Lock this landmark if it requires more players to include
              if (minPlayers > playerCount) return 'error.landmarkNotEnoughPlayers'
              // Lock this landmark if it will be used in map setup
              if (
                (map.useLandmark && code === map.landmark?.code) ||
                (map.suitLandmarks &&
                  !floodClearings &&
                  Object.values(map.suitLandmarks).includes(code))
              ) {
                return 'error.mapLandmarkUsed'
              }
              return false
            },
            lockLandmark,
          ),
        )
      } else {
        // Invalid state, do not proceed
        validationError = 'error.noMap'
      }
      break
    }

    /////////////////
    // CHOOSE DECK //
    /////////////////
    case SetupStep.chooseDeck: {
      // Get our list of decks which are available for selection
      const deckPool = getEnabled(selectDeckArray(state))

      // Check that there is even a deck to be selected...
      if (deckPool.length > 0) {
        // Choose a random deck
        dispatch(setDeck(takeRandom(deckPool)))
      } else {
        // Invalid state, do not proceed
        validationError = 'error.noDeck'
      }
      break
    }

    //////////////////////
    // CHOOSE LANDMARKS //
    //////////////////////
    case SetupStep.chooseLandmarks: {
      // Get our list of landmarks which are available for selection
      const landmarkPool = getEnabled(selectLandmarkArray(state))

      // Check that there are enough enabled landmarks for how many we want to set up
      if (landmarkPool.length >= landmarkCount) {
        // Select the first landmark
        if (landmarkCount >= 1) {
          // Choose a random landmark
          dispatch(setLandmark1(takeRandom(landmarkPool)))

          // Select the second landmark
          if (landmarkCount >= 2) {
            // Choose a random landmark
            dispatch(setLandmark2(takeRandom(landmarkPool)))
            // Ensure we don't skip the setup steps
            dispatch(skipSteps([SetupStep.setUpLandmark1, SetupStep.setUpLandmark2], false))
          } else {
            // Handle skipping just the second landmark setup
            dispatch(skipSteps(SetupStep.setUpLandmark1, false))
            dispatch(skipSteps(SetupStep.setUpLandmark2, true))
          }
        } else {
          // We're not setting up any landmarks, so skip both setup steps
          dispatch(skipSteps([SetupStep.setUpLandmark1, SetupStep.setUpLandmark2], true))
        }
      } else {
        // Set the correct error message
        validationError = landmarkPool.length === 0 ? 'error.noLandmark' : 'error.tooFewLandmark'
      }
      break
    }

    //////////////////////
    // CHOOSE HIRELINGS //
    //////////////////////
    case SetupStep.chooseHirelings: {
      // Clear the exclude faction pool of any potential stale data from previous hireling setups
      if (excludedFactions.length > 0) dispatch(clearExcludedFactions())

      // Did we skip the hireling setup?
      if (!skippedSteps[SetupStep.setUpHireling1]) {
        const factionCodes = selectFactionCodes(state)

        // Get our lists of independent & faction hirelings which are available for selection
        const { hirelingPool = [], factionHirelings = [] } = Object.groupBy(
          // Preprocess the list to drop references to factions that are not in play
          selectHirelingArray(state).map(hireling => ({
            ...hireling,
            excludeFactions:
              hireling.excludeFactions?.filter(factionCode => factionCodes.has(factionCode)) ?? [],
          })),
          ({ excludeFactions }) =>
            excludeFactions.length > 0 ? 'factionHirelings' : 'hirelingPool',
        )

        // Calculate how many factions we can spare for hirelings (i.e. total factions minus setup faction count)
        let spareFactionCount = factionCodes.size - playerCount

        // If we can only spare 3 or less factions then limit the amount of faction hirelings
        if (spareFactionCount <= 3) {
          // Add a random sample of faction hirelings to our pool, ensuring that the random hireling draw will never exclude too many factions for setup
          while (spareFactionCount > 0 && factionHirelings.length > 0) {
            // Grab a random faction hireling
            const hireling = takeRandom(factionHirelings)
            const excludeCount = hireling.excludeFactions.length
            // Ensure that we don't exclude too many factions by adding this hireling (The Exile can cause this edge case)
            if (spareFactionCount - excludeCount >= 0) {
              hirelingPool.push(hireling)
              spareFactionCount -= excludeCount
            }
          }
        } else {
          // There are enough spare factions that we can throw all faction hirelings into the mix
          hirelingPool.push(...factionHirelings)
        }

        // Check that there are enough hirelings selected
        if (hirelingPool.length >= 3) {
          // Choose three random hirelings
          for (let number = 1; number <= 3; number++) {
            dispatch(setHireling(number, takeRandom(hirelingPool), playerCount + number > 5))
          }
        } else {
          // Invalid state, do not proceed
          validationError = 'error.tooFewHireling'
        }
      }

      // Disable the factions that are mutually exclusive with the selected hirelings
      // Also disable insurgent factions if we're only playing with 2 people and no bots or hirelings
      excludedFactions = getState().setup.excludedFactions
      dispatch(
        massComponentLock(
          selectFactionArray,
          ({ code, militant }) => {
            // Disable insurgent factions if we're only playing with 2 people and no bots or hirelings
            if (
              playerCount < 3 &&
              !militant &&
              skippedSteps[SetupStep.setUpHireling1] &&
              skippedSteps[SetupStep.setUpBots]
            )
              return 'error.tooFewPlayerInsurgent'
            // Disable a faction if it was replaced by an equivalent hireling
            if (excludedFactions.includes(code)) return 'error.hirelingSelected'
            return false
          },
          lockFaction,
        ),
      )
      break
    }

    /////////////////////
    // CHOOSE FACTIONS //
    /////////////////////
    case SetupStep.chooseFactions: {
      // Clear the faction pool of any potential stale data from previous setups
      if (factionPool.length > 0) dispatch(clearFactionPool())

      // Get our list of militant and insurgent factions which are available for selection
      const workingFactionPool = selectFactionArray(state).filter(
        ({ enabled, militant }) => enabled && militant,
      )
      const insurgentFactions = selectFactionArray(state).filter(
        ({ enabled, militant }) => enabled && !militant,
      )

      // Validate and set up the vagabond/captain pool for draft setup
      if (useDraft) {
        if (state.setup.limitVagabonds) {
          // To keep the previous steps clean, disable if no vagabonds were actually deselected
          if (selectVagabondArray(state).every(vagabond => vagabond.enabled)) {
            dispatch(setLimitVagabonds(false))
          }
        } else {
          // Make sure to enable all vagabonds if limitVagabonds is false to prevent confusion
          dispatch(massComponentToggle(selectVagabondArray, true, toggleVagabond))
        }
        const vagabondPool = getEnabled(selectVagabondArray(getState()))

        // Get our vagabond faction count to validate our vagabondPool against
        const vagabondFactionCount = countMatches(
          workingFactionPool.concat(insurgentFactions),
          ({ dealVagabond }) => dealVagabond ?? false,
        )

        if (vagabondPool.length >= vagabondFactionCount) {
          dispatch(setVagabondPool(vagabondPool))
        } else {
          validationError = 'error.tooFewVagabond'
          break
        }

        // Make sure to enable all captains if limitCaptains is false to prevent confusion
        if (state.setup.limitCaptains) {
          // To keep the previous steps clean, disable if no captains were actually deselected
          if (selectCaptainArray(state).every(captain => captain.enabled)) {
            dispatch(setLimitCaptains(false))
          }
        } else {
          // Make sure to enable all captains if limitCaptains is false to prevent confusion
          dispatch(massComponentToggle(selectCaptainArray, true, toggleCaptain))
        }
        const captainPool = getEnabled(selectCaptainArray(getState()))

        // Get our knave faction count to validate our captainPool against
        const captainFactionCount = countMatches(
          workingFactionPool.concat(insurgentFactions),
          ({ dealCaptains }) => dealCaptains ?? false,
        )

        if (captainPool.length >= captainFactionCount * CAPTAIN_DEAL_COUNT) {
          dispatch(setCaptainPool(captainPool))
        } else {
          validationError = 'error.tooFewCaptains'
          break
        }
      }

      // Set the appropriate number of factions for setup
      const factionCount = useDraft ? playerCount + 1 : playerCount

      // Check that there are enough factions available for setup
      if (
        workingFactionPool.length > 0 &&
        workingFactionPool.length + insurgentFactions.length >= factionCount
      ) {
        // Start by adding a random militant faction
        const firstFaction = takeRandom(workingFactionPool)
        dispatch(addToFactionPool(firstFaction))
        // Add the insurgent factions to the mix
        workingFactionPool.push(...insurgentFactions)

        let factionsSetUp = 1
        // Keep track of if we've already used a corner in standard setup
        let cornerSetupCount = !useDraft && firstFaction.standardSetup.cornerSetup ? 1 : 0
        const incompatibleFactions = new Set<FactionCode>()

        // Add enough factions to make the total pool equal factionCount
        while (factionsSetUp < factionCount && workingFactionPool.length > 0) {
          const candidateFaction = takeRandom(workingFactionPool)

          if (
            // Make sure we don't include more than 4 corner clearing factions in standard setup
            (useDraft ||
              !candidateFaction.standardSetup.cornerSetup ||
              cornerSetupCount < MAX_CORNER_SETUPS) &&
            // Don't include any factions that are incompatible with ones already chosen
            !incompatibleFactions.has(candidateFaction.code)
          ) {
            dispatch(addToFactionPool(candidateFaction))
            factionsSetUp++
            if (!useDraft && candidateFaction.standardSetup.cornerSetup) cornerSetupCount++
            if (candidateFaction.excludeFactions) {
              candidateFaction.excludeFactions.forEach(faction => incompatibleFactions.add(faction))
            }
          }
        }
        // Check if we were able to set up
        if (factionsSetUp < factionCount) {
          // Show appropriate error message
          validationError =
            cornerSetupCount >= MAX_CORNER_SETUPS
              ? 'error.tooManyCornerSetup'
              : 'error.tooFewFaction'
        } else if (useDraft) {
          // For draft setup, begin the setup at the bottom of player order
          dispatch(setCurrentPlayerIndex(playerCount - 1))
        }
      } else {
        // Set the correct error message
        validationError =
          workingFactionPool.length === 0 ? 'error.noMilitantFaction' : 'error.tooFewFaction'
      }
      break
    }

    ////////////////////
    // SELECT FACTION //
    ////////////////////
    case SetupStep.selectFaction: {
      if (useDraft) {
        // Ensure the user has actually selected a faction
        if (currentFactionIndex == null) {
          validationError = 'error.noFaction'
        }
      } else {
        // Clear any selected faction as it's not used for standard setup
        dispatch(setCurrentFactionIndex(null))
      }
      break
    }

    ///////////////
    // SETUP END //
    ///////////////
    case SetupStep.setupEnd: {
      // This is the final step, so don't try to increment
      doIncrementStep = false
      break
    }
  }

  // Set the error message if it's changed
  if (getState().setup.errorMessage !== validationError) {
    dispatch(setErrorMessage(validationError))
  }

  // Increment the step if we have no validation error and are still flagged to do so
  if (!validationError && doIncrementStep) {
    dispatch(incrementStep())
  }
}
