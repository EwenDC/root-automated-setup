import type { SetupStepDefinition } from '..'

import { removeCurrentBotFromPool, setCurrentIndex } from '../../store'
import { SetupStep } from '../../types'
import SetUpBotStep from '../components/setUpBotStep'

export const setUpBots: SetupStepDefinition = {
  beforeStep(dispatch, getState) {
    const { flow } = getState()
    if (!flow.useDraft) {
      // Clear the Bot we just set up (if there was one)
      if (flow.currentIndex != null) dispatch(removeCurrentBotFromPool())
      // Automatically set up the first Bot in the list of remaining Bots
      dispatch(setCurrentIndex(0))
    }
    return null
  },

  component: SetUpBotStep,

  afterStep(_dispatch, getState) {
    const state = getState()
    const { currentPlayerIndex, useDraft, botPool } = state.flow

    if (useDraft) {
      // Keep going if we have players who haven't set up their Bot yet
      return currentPlayerIndex != null && currentPlayerIndex > 0
        ? SetupStep.selectBots
        : SetupStep.placeScoreMarkers
    } else {
      // Move on to setting up the next Bot if there are any after the current one
      return botPool.length > 1 ? SetupStep.setUpBots : SetupStep.placeScoreMarkers
    }
  },
}
