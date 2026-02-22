import type { SetupStepDefinition } from '..'

import {
  goBackInPlayerTurnOrder,
  removeCurrentFactionFromPool,
  setCurrentIndex,
  setErrorMessage,
} from '../../store'
import { SetupStep } from '../../types'
import SelectFactionStep from '../components/selectFactionStep'

export const selectFaction: SetupStepDefinition = {
  beforeStep(dispatch, getState) {
    const { flow } = getState()

    if (flow.useDraft) {
      // Remove the faction we just set up from the pool
      if (flow.currentIndex != null) dispatch(removeCurrentFactionFromPool())
      // Move on to the next player
      dispatch(goBackInPlayerTurnOrder())
    }
    return null
  },

  component: SelectFactionStep,

  afterStep(dispatch, getState) {
    const state = getState()
    const { currentIndex, useDraft } = state.flow

    if (useDraft) {
      // Ensure the user has actually selected a faction
      if (currentIndex == null) {
        dispatch(setErrorMessage('error.noFaction'))
        return null
      }
    } else if (currentIndex != null) {
      // Clear any selected faction as it's not used for standard setup
      dispatch(setCurrentIndex(null))
    }

    return SetupStep.setUpFaction
  },
}
