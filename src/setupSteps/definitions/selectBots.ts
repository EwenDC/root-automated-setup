import type { SetupStepDefinition } from '..'

import {
  goBackInPlayerTurnOrder,
  removeCurrentBotFromPool,
  setCurrentIndex,
  setErrorMessage,
} from '../../store'
import { SetupStep } from '../../types'
import SelectBotStep from '../components/selectBotStep'

export const selectBots: SetupStepDefinition = {
  beforeStep(dispatch, getState) {
    const { flow } = getState()

    if (flow.useDraft) {
      // Remove the Bot we just set up from the pool
      if (flow.currentIndex != null) dispatch(removeCurrentBotFromPool())
      // Move on to the next player
      dispatch(goBackInPlayerTurnOrder())
    }
    return null
  },

  component: SelectBotStep,

  afterStep(dispatch, getState) {
    const state = getState()
    const { currentIndex, useDraft } = state.flow

    if (useDraft) {
      // Ensure the user has actually selected a Bot
      if (currentIndex == null) {
        dispatch(setErrorMessage('error.noBot'))
        return null
      }
    } else if (currentIndex != null) {
      // Clear any selected Bot as it's not used for standard setup
      dispatch(setCurrentIndex(null))
    }

    return SetupStep.setUpBots
  },
}
