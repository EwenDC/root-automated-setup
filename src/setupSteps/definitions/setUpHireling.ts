import type { SetupStepDefinition } from '..'

import { goBackInPlayerTurnOrder, setCurrentIndex } from '../../store'
import { SetupStep } from '../../types'
import SetUpHirelingStep from '../components/setUpHirelingStep'

export const setUpHireling: SetupStepDefinition = {
  beforeStep(dispatch, getState) {
    const { flow } = getState()
    // Move on to the next player and hireling
    dispatch(goBackInPlayerTurnOrder())
    dispatch(setCurrentIndex(flow.currentIndex == null ? 0 : flow.currentIndex + 1))
    return null
  },

  component: SetUpHirelingStep,

  afterStep(_dispatch, getState) {
    const state = getState()

    // Setup the next hireling, if there is one
    const nextIndex = (state.flow.currentIndex ?? 0) + 1
    return nextIndex < state.setup.hirelingCount
      ? SetupStep.setUpHireling
      : SetupStep.postHirelingSetup
  },
}
