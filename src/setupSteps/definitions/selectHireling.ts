import type { SetupStepDefinition } from '..'

import {
  goBackInPlayerTurnOrder,
  removeCurrentHirelingFromPool,
  setCurrentIndex,
  setErrorMessage,
} from '../../store'
import { SetupStep } from '../../types'
import SelectHirelingStep from '../components/selectHirelingStep'

export const selectHireling: SetupStepDefinition = {
  beforeStep(dispatch, getState) {
    // Remove the hireling we just set up from the pool
    if (getState().flow.currentIndex != null) dispatch(removeCurrentHirelingFromPool())

    // Move on to the next player
    dispatch(goBackInPlayerTurnOrder())

    // Skip straight to setup if there is no choice to be made
    if (getState().flow.hirelingPool.length < 2) {
      dispatch(setCurrentIndex(0))
      return SetupStep.setUpHireling
    }
    return null
  },

  component: SelectHirelingStep,

  afterStep(dispatch, getState) {
    const { flow } = getState()

    // Ensure the user has actually selected a hireling
    if (flow.currentIndex == null) {
      dispatch(setErrorMessage('error.noHireling'))
      return null
    }

    return SetupStep.selectHireling
  },
}
