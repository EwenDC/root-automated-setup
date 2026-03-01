import type { SetupStepDefinition } from '..'

import { getEnabled } from '../../functions/filtering'
import { takeRandom } from '../../functions/random'
import {
  addToHirelingPool,
  clearExcludedFactions,
  lockHireling,
  massComponentLock,
  pushExcludedFactions,
  resetHirelingPool,
  selectFactionCodes,
  selectHirelingArray,
  setCurrentIndex,
  setCurrentPlayerIndex,
  setErrorMessage,
} from '../../store'
import { SetupStep } from '../../types'
import ChooseHirelingsStep from '../components/chooseHirelingsStep'

export const chooseHirelings: SetupStepDefinition = {
  beforeStep(dispatch, getState) {
    const state = getState()

    // Are there any hirelings that can be set up?
    if (selectHirelingArray(state).length < 1) {
      // Clear state of any potential stale data
      if (state.setup.excludedFactions.length > 0) dispatch(clearExcludedFactions())
      if (state.flow.hirelingPool.length > 0) dispatch(resetHirelingPool())
      return SetupStep.drawCards
    }

    const factionCodes = selectFactionCodes(state)
    const noSpareFactions = state.setup.playerCount >= factionCodes.size

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

    return null
  },

  component: ChooseHirelingsStep,

  afterStep(dispatch, getState) {
    const state = getState()

    // Clear state of any stale data
    if (state.setup.excludedFactions.length > 0) dispatch(clearExcludedFactions())
    if (state.flow.hirelingPool.length > 0) dispatch(resetHirelingPool())

    // Bail out if no hirelings are to be included
    if (state.setup.hirelingCount < 1) return SetupStep.drawCards

    const factionCodes = selectFactionCodes(state)

    // Get our lists of independent & faction hirelings which are available for selection
    const { hirelingPool = [], factionHirelings = [] } = Object.groupBy(
      // Preprocess the list to drop references to factions that are not in play
      getEnabled(selectHirelingArray(state)).map(hireling => ({
        ...hireling,
        excludeFactions:
          hireling.excludeFactions?.filter(factionCode => factionCodes.has(factionCode)) ?? [],
      })),
      ({ excludeFactions }) => (excludeFactions.length > 0 ? 'factionHirelings' : 'hirelingPool'),
    )

    // Calculate how many factions we can spare for hirelings (i.e. total factions minus setup faction count)
    let spareFactionCount = factionCodes.size - state.setup.playerCount

    // If we can only spare as many factions as we have hirelings (or less) then limit the amount of faction hirelings
    if (spareFactionCount <= state.setup.hirelingCount) {
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
    if (hirelingPool.length >= state.setup.hirelingCount) {
      // Choose three random hirelings
      for (let index = 0; index < state.setup.hirelingCount; index++) {
        const hireling = takeRandom(hirelingPool)
        // 2 players - 0 demoted
        // 3 players - 1 demoted
        // 4 players - 2 demoted
        // 5+ players - 3 demoted
        dispatch(addToHirelingPool(hireling.code, state.setup.playerCount + index > 4))
        if (hireling.excludeFactions.length > 0) {
          dispatch(pushExcludedFactions(hireling.excludeFactions))
        }
      }
      dispatch(setCurrentPlayerIndex(null))
      dispatch(setCurrentIndex(null))
      return SetupStep.selectHireling
    }

    // Invalid state, do not proceed
    dispatch(setErrorMessage('error.tooFewHireling'))
    return null
  },
}
