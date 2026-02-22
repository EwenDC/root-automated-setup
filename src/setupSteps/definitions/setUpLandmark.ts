import type { SetupStepDefinition } from '..'

import { goBackInPlayerTurnOrder, setCurrentIndex } from '../../store'
import { SetupStep } from '../../types'
import SetUpLandmarkStep from '../components/setUpLandmarkStep'

export const setUpLandmark: SetupStepDefinition = {
  beforeStep(dispatch, getState) {
    const { flow } = getState()
    // Move on to the next player and landmark
    dispatch(goBackInPlayerTurnOrder())
    dispatch(setCurrentIndex(flow.currentIndex == null ? 0 : flow.currentIndex + 1))
    return null
  },

  component: SetUpLandmarkStep,

  afterStep(_dispatch, getState) {
    const state = getState()

    // Setup the next landmark, if there is one
    const nextIndex = (state.flow.currentIndex ?? 0) + 1
    return nextIndex < state.setup.landmarkCount
      ? SetupStep.setUpLandmark
      : SetupStep.chooseHirelings
  },
}
