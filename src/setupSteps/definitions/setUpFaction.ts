import type { SetupStepDefinition } from '..'

import { removeCurrentFactionFromPool, setCurrentIndex } from '../../store'
import { SetupStep } from '../../types'
import SetUpFactionStep from '../components/setUpFactionStep'

export const setUpFaction: SetupStepDefinition = {
  beforeStep(dispatch, getState) {
    const { flow } = getState()
    if (!flow.useDraft) {
      // Clear the faction we just set up (if there was one)
      if (flow.currentIndex != null) dispatch(removeCurrentFactionFromPool())
      // Automatically set up the first faction in the list of remaining factions
      dispatch(setCurrentIndex(0))
    }
    return null
  },

  component: SetUpFactionStep,

  afterStep(_dispatch, getState) {
    const state = getState()
    const { currentPlayerIndex, useDraft, factionPool } = state.flow

    if (useDraft) {
      // Keep going if we have players who haven't set up their faction yet
      return currentPlayerIndex != null && currentPlayerIndex > 0
        ? SetupStep.selectFaction
        : SetupStep.placeScoreMarkers
    } else {
      // Move on to setting up the next faction if there are any after the current one
      return factionPool.length > 1 ? SetupStep.setUpFaction : SetupStep.placeScoreMarkers
    }
  },
}
